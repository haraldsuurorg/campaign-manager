<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CampaignController;
use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;

Route::post('/campaigns', [CampaignController::class, 'store']);