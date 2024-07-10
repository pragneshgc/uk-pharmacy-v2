<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\WithFaker;
use Database\Seeders\PharmacyuserTableSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UsersTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;
    /**
     * A basic feature test example.
     */
    public function test_it_should_return_validation_error_if_users_fields_empty(): void
    {
        $this->userLogin();

        $response = $this->postJson('/users', []);

        $response->assertStatus(422);
        $errors = $response['errors'];
        $this->assertEquals($errors['name'][0], "The name field is required.");
        $this->assertEquals($errors['surname'][0], "The surname field is required.");
        $this->assertEquals($errors['email'][0], "The email field is required.");
        $this->assertEquals($errors['password'][0], "The password field is required.");
        $this->assertEquals($errors['passwordRepeat'][0], "The password repeat field is required.");
    }

    public function test_can_create_a_user()
    {
        $this->userLogin();

        $user = User::factory()->make();
        $userData = $user->toArray();
        $userData['password'] = 'password';
        $userData["passwordRepeat"] = 'password';
        $response = $this->postJson('/users', $userData);

        $response->assertOk();
        $this->assertDatabaseCount('PharmacyUser', 3);
        $this->assertDatabaseCount('password_securities', 1);
        $userCount = DB::table('User')->count();
        $this->assertSame(1, $userCount);
    }
}