<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Generate 20 sample products
        foreach (range(1, 20) as $index) {
            Product::create([
                'name' => 'Product ' . $index,
                'price' => rand(10, 100),  // Random price between 10 and 100
                'description' => 'Description for product ' . $index . '.',
                'stock_quantity' => rand(10, 200),
            ]);
        }
    }
}

// RUN THIS COMMAND TO GENERATE SAMPLE PRODUCTS 
// php artisan db:seed --class=ProductSeeder
