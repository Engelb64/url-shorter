<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UrlsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('urls')->insert([
            [
                'original_url' => 'https://example.com/1',
                'shortened_url' => Str::random(8),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'original_url' => 'https://example.com/2',
                'shortened_url' => Str::random(8),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'original_url' => 'https://example.com/3',
                'shortened_url' => Str::random(8),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
