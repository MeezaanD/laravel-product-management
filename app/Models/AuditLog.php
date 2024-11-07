<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;

    protected $table = 'product_audit_logs';

    protected $fillable = [
        'user_id',
        'product_id',
        'action',
        'before',
        'after',
    ];

    // Cast 'before' and 'after' fields to JSON
    protected $casts = [
        'before' => 'json',
        'after' => 'json',
    ];

    /**
     * Get the user who made the change.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product associated with this audit log entry.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
