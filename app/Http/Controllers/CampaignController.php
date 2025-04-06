<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\User;
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
            'user_id' => 'required|numeric',
            'title' => 'required|string',
            'activity_status' => 'required|boolean',
            'payout_estonia' => 'nullable|numeric|min:0',
            'payout_spain' => 'nullable|numeric|min:0',
            'payout_bulgaria' => 'nullable|numeric|min:0',
        ]);

        // Check if at least one payout is present
        if (is_null($validated['payout_estonia']) &&
            is_null($validated['payout_spain']) &&
            is_null($validated['payout_bulgaria'])) {

            return response()->json([
                'message' => 'At least one payout field must be filled'
            ], 422);
        }

        // Get the user using ID
        $user = User::findOrFail($validated['user_id']);

        $campaign = $user->campaigns()->create($validated);

        return response()->json($campaign, 201);
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
