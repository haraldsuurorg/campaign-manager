<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CampaignController;
use Illuminate\Http\Request;

Route::post('/campaigns', [CampaignController::class, 'store']);
Route::get('/campaigns', [CampaignController::class, 'index']);
Route::patch('campaigns/{campaign}', [CampaignController::class, 'update']);