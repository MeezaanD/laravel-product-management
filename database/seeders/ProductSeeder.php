<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'name' => 'Product 1',
            'price' => 19.99,
            'description' => 'Description for product 1.',
            'stock_quantity' => 100, 
        ]);
    }
}
