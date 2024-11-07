<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditLogController extends Controller
{
    /**
     * Display a listing of audit logs.
     *
     * @return \Illuminate\Http\JsonResponse
     */
public function index()
{
    // Fetch the audit logs
    $logs = AuditLog::all();  

    return Inertia::render('AuditLogs', [
        'logs' => $logs,  // Pass the logs to the frontend component as a prop
    ]);
}

}
