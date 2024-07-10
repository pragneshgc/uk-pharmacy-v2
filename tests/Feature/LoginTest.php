<?php

namespace Tests\Feature;

use App\Models\Pharmacyuser;
use Tests\TestCase;
use App\Models\Safeip;
use Database\Seeders\PharmacyuserTableSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    use RefreshDatabase;
    public function test_login_using_email_password_show_error_for_blank_email_password(): void
    {
        $this->addSafeIP();

        $response = $this->post('/login', ['email' => '', 'password' => '']);
        $response->assertSessionHasErrors([
            'email' => "The email field is required.",
            'password' => 'The password field is required.'
        ]);
    }

    public function test_login_using_email_password_show_error_for_invalid_email_or_password(): void
    {
        $this->addSafeIP();

        $response = $this->post('/login', ['email' => 'some@email.com', 'password' => '123456']);
        $response->assertStatus(302);
        $response->assertRedirect('/');
    }

    public function test_login_using_email_password_success(): void
    {
        $this->addSafeIP();
        $response = $this->post('/login', ['email' => 'admin@treated.com', 'password' => 'password']);
        $response->assertStatus(302);
        $response->assertRedirect('/');
    }

    public function test_login_with_code_validation_error_for_code()
    {
        $this->addSafeIP();

        $response = $this->post('/login/code', ['code' => '']);
        $response->assertSessionHasErrors([
            'code' => "The code field is required."
        ]);
    }

    public function test_login_with_code_redirect_to_login_for_invalid_code()
    {
        $this->addSafeIP();
        $this->seed(PharmacyuserTableSeeder::class);
        $response = $this->post('/login/code', ['code' => 'some-invalid-code']);
        $response->assertStatus(302);
        $response->assertRedirect('/login');
    }

    public function test_login_with_code_success()
    {
        $this->addSafeIP();
        $this->seed(PharmacyuserTableSeeder::class);
        $response = $this->post('/login/code', ['code' => 'POwsoW3o6rOddF']);
        $response->assertStatus(302);
        $response->assertRedirect('/');
    }
}
