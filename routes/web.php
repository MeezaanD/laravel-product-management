<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuditLogController;

// Public routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

// Protected routes (only accessible to authenticated users IF LOGGED IN)
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
			'auditLogsUrl' => route('audit.logs'),
		]);
    })->name('dashboard');

    // Product resource routes
    Route::resource('products', ProductController::class);

    // Audit log route
    Route::get('/audit-logs', [AuditLogController::class, 'index'])->name('audit.logs');

    // Logout route
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

// Redirect the root URL to the login page if not authenticated, otherwise to the dashboard
Route::get('/', function () {
    return redirect()->route('login');
});
