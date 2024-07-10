<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Safeip;
use App\Models\Setting;
use App\Mail\SafeIPMail;
use Illuminate\Support\Str;
use Illuminate\Queue\Listener;
use App\Events\SafeipRequested;
use App\Models\SafeipAudit;
use Illuminate\Support\Facades\Mail;
use Database\Seeders\SettingTableSeeder;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CheckIPTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_redirect_to_login_page_if_ip_not_valid(): void
    {
        $response = $this->get("/");

        $response->assertStatus(302);
        $response->assertRedirect('/login');
    }

    public function test_redirect_to_restricted_page_if_ip_not_valid(): void
    {
        $fakeIP = fake()->ipv4();
        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);

        $response = $this->get("/login");
        $response->assertStatus(302);
        $response->assertRedirect('/restricted');
    }

    public function test_show_login_page_if_ip_is_approved(): void
    {
        $this->withMiddleware(['checkip']);
        $fakeIP = fake()->ipv4();
        Safeip::factory()->create([
            'SafeIP' => $fakeIP,
            'Status' => 1
        ]);

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);
        $response = $this->get("/login");

        $this->assertDatabaseHas('SafeIP', ['SafeIP' => $fakeIP, 'Status' => 1]);
        $response->assertStatus(200);
    }

    public function test_approve_safe_ip_show_error_if_key_not_exist()
    {
        $response = $this->get('/add-safe-ip');
        $response->assertContent('Invalid request');
    }

    public function test_send_email_for_ip_whitelist(): void
    {
        $this->seed(SettingTableSeeder::class);
        $fakeIP = fake()->ipv4();
        $name = fake()->name();

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);

        $response = $this->post("/restricted-ip-mail", ['name' => $name]);
        $response->assertStatus(302);
        $response->assertRedirect('/restricted');
        $response->assertSessionHas('message', 'Your request has been submitted, please wait for approval');
        $this->assertDatabaseHas('SafeIP', ['SafeIP' => $fakeIP, 'Status' => 0]);
        $this->assertDatabaseHas('safeip_audits', ['request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'pending']);
    }

    public function test_do_not_send_email_if_approval_pending()
    {
        $this->seed(SettingTableSeeder::class);
        $fakeIP = fake()->ipv4();
        $name = fake()->name();

        $token = Str::random(32);
        event(new SafeipRequested([
            'name' => $name,
            'ip_address' => $fakeIP,
            'token' => $token,
        ]));

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);

        $response = $this->post("/restricted-ip-mail", ['name' => $name]);

        $response->assertStatus(302);
        $response->assertRedirect('/restricted');
        $response->assertSessionHas('message', 'Your request has already been submitted, please wait for approval');
        $this->assertDatabaseHas('SafeIP', ['SafeIP' => $fakeIP, 'Status' => 0]);
        $this->assertDatabaseHas('safeip_audits', ['request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'pending']);
    }

    public function test_do_not_send_email_if_ip_approved()
    {
        $this->seed(SettingTableSeeder::class);
        $fakeIP = fake()->ipv4();
        $name = fake()->name();

        $token = Str::random(32);
        event(new SafeipRequested([
            'name' => $name,
            'ip_address' => $fakeIP,
            'token' => $token,
        ]));

        $safeipAudit = SafeipAudit::where(['ip_address' => $fakeIP, 'status' => 'pending'])->first();
        $safeipAudit->update(['status' => 'approved']);
        $safeIp = Safeip::where('SafeIP', $fakeIP)->first();
        $safeIp->update(['Status' => 1]);

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);

        $response = $this->post("/restricted-ip-mail", ['name' => $name]);
        $response->assertStatus(302);
        $response->assertRedirect('/restricted');
        $response->assertSessionHas('message', 'Your request has already been submitted, please wait for approval');
        $this->assertDatabaseHas('safeip_audits', ['request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'approved']);
        $this->assertDatabaseHas('SafeIP', ['SafeIP' => $fakeIP, 'Status' => 1]);
    }

    public function test_send_safe_ip_email_after_first_rejection()
    {
        $this->seed(SettingTableSeeder::class);
        $fakeIP = fake()->ipv4();
        $name = fake()->name();

        $token = Str::random(32);
        event(new SafeipRequested([
            'name' => $name,
            'ip_address' => $fakeIP,
            'token' => $token,
        ]));
        $safeipAudit = SafeipAudit::where(['ip_address' => $fakeIP, 'status' => 'pending'])->first();
        $safeipAudit->update(['status' => 'rejected']);

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);

        $response = $this->post("/restricted-ip-mail", ['name' => $name]);

        $response->assertStatus(302);
        $response->assertRedirect('/restricted');
        $response->assertSessionHas('message', 'Your request has been submitted, please wait for approval');
        $this->assertDatabaseHas('SafeIP', ['SafeIP' => $fakeIP, 'Status' => 0]);
        $this->assertDatabaseHas('safeip_audits', [
            'request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'pending'
        ]);
        $this->assertDatabaseHas('safeip_audits', [
            'request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'rejected'
        ]);
    }

    public function test_safe_ip_for_rejected_and_pending_approval()
    {
        $this->seed(SettingTableSeeder::class);
        $fakeIP = fake()->ipv4();
        $name = fake()->name();

        event(new SafeipRequested([
            'name' => $name,
            'ip_address' => $fakeIP,
            'token' => Str::random(32),
        ]));
        $safeipAudit = SafeipAudit::where(['ip_address' => $fakeIP, 'status' => 'pending'])->first();
        $safeipAudit->update(['status' => 'rejected']);

        event(new SafeipRequested([
            'name' => $name,
            'ip_address' => $fakeIP,
            'token' => Str::random(32),
        ]));

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);

        $response = $this->post("/restricted-ip-mail", ['name' => $name]);

        $response->assertStatus(302);
        $response->assertRedirect('/restricted');
        $response->assertSessionHas('message', 'Your request has already been submitted, please wait for approval');
        $this->assertDatabaseHas('SafeIP', ['SafeIP' => $fakeIP, 'Status' => 0]);
        $this->assertDatabaseHas('safeip_audits', [
            'request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'rejected'
        ]);
        $this->assertDatabaseHas('safeip_audits', [
            'request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'pending'
        ]);
    }

    public function test_safe_ip_check_for_rejected_and_approved()
    {
        $this->seed(SettingTableSeeder::class);
        $fakeIP = fake()->ipv4();
        $name = fake()->name();

        event(new SafeipRequested([
            'name' => $name,
            'ip_address' => $fakeIP,
            'token' => Str::random(32),
        ]));
        $safeipAudit = SafeipAudit::where(['ip_address' => $fakeIP, 'status' => 'pending'])->first();
        $safeipAudit->update(['status' => 'rejected']);

        event(new SafeipRequested([
            'name' => $name,
            'ip_address' => $fakeIP,
            'token' => Str::random(32),
        ]));
        $safeipAudit = SafeipAudit::where(['ip_address' => $fakeIP, 'status' => 'pending'])->first();
        $safeipAudit->update(['status' => 'approved']);

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);

        $response = $this->post("/restricted-ip-mail", ['name' => $name]);

        $response->assertStatus(302);
        $response->assertRedirect('/restricted');
        $response->assertSessionHas('message', 'Your request has already been submitted, please wait for approval');
        $this->assertDatabaseHas('safeip_audits', [
            'request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'rejected'
        ]);
        $this->assertDatabaseHas('safeip_audits', [
            'request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'approved'
        ]);
    }

    public function test_safe_ip_check_for_rejected_and_rejected()
    {
        $this->seed(SettingTableSeeder::class);
        $fakeIP = fake()->ipv4();
        $name = fake()->name();

        event(new SafeipRequested([
            'name' => $name,
            'ip_address' => $fakeIP,
            'token' => Str::random(32),
        ]));
        $safeipAudit = SafeipAudit::where(['ip_address' => $fakeIP, 'status' => 'pending'])->first();
        $safeipAudit->update(['status' => 'rejected']);

        event(new SafeipRequested([
            'name' => $name,
            'ip_address' => $fakeIP,
            'token' => Str::random(32),
        ]));
        $safeipAudit = SafeipAudit::where(['ip_address' => $fakeIP, 'status' => 'pending'])->first();
        $safeipAudit->update(['status' => 'rejected']);

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);

        $response = $this->post("/restricted-ip-mail", ['name' => $name]);

        $response->assertStatus(302);
        $response->assertRedirect('/restricted');
        $response->assertSessionHas('message', 'Your request has already been submitted, please wait for approval');
        $this->assertDatabaseHas('safeip_audits', [
            'request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'rejected'
        ]);
        $this->assertDatabaseHas('safeip_audits', [
            'request_from' => $name, 'ip_address' => $fakeIP, 'status' => 'rejected'
        ]);
    }
}
