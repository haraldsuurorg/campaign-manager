<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'activityStatus' => 'required|boolean',
            'payoutEstonia' => 'nullable|numeric|min:0',
            'payoutSpain' => 'nullable|numeric|min:0',
            'payoutBulgaria' => 'nullable|numeric|min:0',
        ]);

        // Check if at least one payout is present
        if (is_null($validated['payoutEstonia']) &&
            is_null($validated['payoutSpain']) &&
            is_null($validated['payoutBulgaria'])) {

            return response()->json([
                'message' => 'At least one payout field must be filled'
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Campaign $campaign)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campaign $campaign)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        //
    }
}
