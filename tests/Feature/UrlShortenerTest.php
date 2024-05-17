<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Url;

class UrlShortenerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a URL can be shortened.
     * 
     * This test sends a POST request to the URL shortening endpoint with a valid URL.
     * It asserts that the response has a status of 201 (Created) and that the JSON structure
     * of the response contains the expected fields. It also checks that the URL was
     * correctly inserted into the database.
     */
    public function test_shorten_url()
    {
        $response = $this->postJson('/api/v1/urls', [
            'original_url' => 'https://example.com'
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id', 'original_url', 'shortened_url', 'created_at', 'updated_at'
            ]);

        $this->assertDatabaseHas('urls', [
            'original_url' => 'https://example.com'
        ]);
    }

    /**
     * Test that a shortened URL redirects to the original URL.
     * 
     * This test creates a shortened URL in the database, then sends a GET request to the
     * shortened URL. It asserts that the response has a status of 302 (Found) and that
     * the response redirects to the original URL.
     */
    public function test_redirect_url()
    {
        $url = Url::create([
            'original_url' => 'https://example.com',
            'shortened_url' => 'abc123',
        ]);

        $response = $this->get('/abc123');

        $response->assertStatus(302)
            ->assertRedirect($url->original_url);
    }

    /**
     * Test that a shortened URL can be deleted.
     * 
     * This test creates a shortened URL in the database, then sends a DELETE request to the
     * URL deletion endpoint. It asserts that the response has a status of 204 (No Content)
     * and that the URL was correctly removed from the database.
     */
    public function test_delete_url()
    {
        $url = Url::create([
            'original_url' => 'https://example.com',
            'shortened_url' => 'abc123',
        ]);

        $response = $this->deleteJson("/api/v1/urls/{$url->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('urls', [
            'id' => $url->id
        ]);
    }
}
