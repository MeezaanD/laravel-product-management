<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'stock_quantity' => 'required|integer|min:0',
        ]);

        $product = Product::create($validated);

        // Log product creation
        $this->logChange('create', $product);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'description' => 'nullable|string',
        ]);

        // Capture before values for logging
        $beforeValues = $product->toArray();

        // Update the product
        $product->update($validatedData);

        // Log the update with before and after values
        $this->logChange('update', $product, $beforeValues, $product->toArray());

        return response()->json($product, 200);
    }

    public function destroy(Product $product)
    {
        // Capture current product data before deletion
        $beforeValues = $product->toArray();

        // Log the deletion with the 'before' state of the product and a message in 'after'
        $this->logChange('delete', $product, $beforeValues, 'Product deleted');

        // Proceed with the product deletion
        $product->delete();

        return response()->json(null, 204); 
    }

    private function logChange($action, $product, $before = null, $after = null)
    {
        AuditLog::create([
            'user_id' => Auth::id(),
            'product_id' => $product->id,
            'action' => $action,
            'before' => $before ? json_encode($before) : null,
            'after' => $after ? json_encode($after) : null,
            'timestamp' => now(),
        ]);
    }
}
