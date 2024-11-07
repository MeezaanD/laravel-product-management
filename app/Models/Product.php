<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // You can define your fillable fields here
    protected $fillable = ['name', 'price', 'description', 'stock_quantity'];
}
