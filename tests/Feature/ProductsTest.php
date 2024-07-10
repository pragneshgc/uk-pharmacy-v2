<?php

namespace Tests\Feature;

use App\Models\Productcode;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductsTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;
    /**
     * A basic feature test example.
     */
    public function test_show_validation_error_if_product_fields_are_empty(): void
    {
        $this->userLogin();

        $response = $this->postJson('/inventory/products', []);

        $response->assertStatus(422);
        $errors = $response['errors'];
        $this->assertEquals($errors['Code'][0], "The code field is required.");
        $this->assertEquals($errors['Name'][0], "The name field is required.");
        $this->assertEquals($errors['Quantity'][0], "The quantity field is required.");
    }

    public function test_can_add_a_product()
    {
        $this->userLogin();

        $product = Productcode::factory()->make();
        $productData = $product->toArray();
        $productData['Price'] = $this->faker()->randomDigit();

        $response = $this->postJson('/inventory/products', $productData);

        $response->assertOk();
        $response->assertJsonStructure([
            'success',
            'data',
            'message'
        ], $response->json());
        $this->assertDatabaseHas('Pricing', [
            'Code' => $productData['Code'],
            'Price' => $productData['Price'],
            'Quantity' => $productData['Quantity']
        ]);

        $this->assertDatabaseHas('ProductCode', [
            'Code' => $productData['Code'],
            'Name' => $productData['Name'],
            'Quantity' => $productData['Quantity']
        ]);
    }
}