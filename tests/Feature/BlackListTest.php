<?php

namespace Tests\Feature;

use App\Models\Blacklist;
use App\Models\Prescription;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BlackListTest extends TestCase
{
    use RefreshDatabase;

    public function test_add_users_to_blacklist(): void
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $id = $this->newOrder();
        $this->userLogin();
        $prescription = Prescription::find($id);
        $response = $this->postJson('/blacklist', ['ids' => [$id]]);

        $this->assertDatabaseHas('BlackList', [
            'Name' => $prescription->Name,
            'Surname' => $prescription->Surname,
            'DOB' => $prescription->DOB,
            'Sex' => $prescription->Sex,
            'DAddress1' => $prescription->DAddress1,
            'DAddress2' => $prescription->DAddress2,
            'DAddress3' => $prescription->DAddress3,
            'DAddress4' => $prescription->DAddress4,
            'DPostcode' => $prescription->DPostcode,
            'DCountryCode' => $prescription->DCountryCode
        ]);

        $response->assertStatus(200);
    }

    public function test_remove_user_from_blacklist()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $id = $this->newOrder();
        $this->userLogin();

        $prescription = Prescription::find($id);
        $this->postJson('/blacklist', ['ids' => [$id]]);

        $this->assertDatabaseHas('BlackList', [
            'Name' => $prescription->Name,
            'Surname' => $prescription->Surname,
            'DOB' => $prescription->DOB,
            'Sex' => $prescription->Sex,
            'DAddress1' => $prescription->DAddress1,
            'DAddress2' => $prescription->DAddress2,
            'DAddress3' => $prescription->DAddress3,
            'DAddress4' => $prescription->DAddress4,
            'DPostcode' => $prescription->DPostcode,
            'DCountryCode' => $prescription->DCountryCode
        ]);

        $blacklist = Blacklist::first();
        $this->postJson('/blacklist/delete', ['ids' => [$blacklist->BlackListID]]);
        $this->assertDatabaseHas('BlackList', [
            'BlackListID' => $blacklist->BlackListID,
            'Status' => 0
        ]);
    }
}
