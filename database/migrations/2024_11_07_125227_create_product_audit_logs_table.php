<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductAuditLogsTable extends Migration
{
    public function up()
    {
        Schema::create('product_audit_logs', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('user_id'); // ID of the user who made the change
			$table->unsignedBigInteger('product_id'); // ID of the product being changed
			$table->string('action'); // Action type: 'created', 'updated', or 'deleted'
			$table->json('before')->nullable(); // JSON to store "before" values
			$table->json('after')->nullable(); // JSON to store "after" values
			$table->timestamps();

			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
    });
    }

    public function down()
    {
        Schema::dropIfExists('product_audit_logs');
    }
}
