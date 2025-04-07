import { Campaign, columns } from "./columns";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types"
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

async function fetchCampaigns(userId: number): Promise<Campaign[]> {
    try {
        const response = await fetch(`/api/campaigns?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            // updateNotifications('error', 'Error');
            console.error(response);
            return [];
        }

        const data = await response.json();
        return data;

    } catch (err) {
        // updateNotifications('error', 'Error');
        console.error('Error fetching campaigns: ', err);
        return [];
    }
}

export function CampaignTable() {
    const userId = usePage<SharedData>().props.auth.user.id;
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    useEffect(() => {
        fetchCampaigns(userId).then(setCampaigns);
    }, [userId]);
    // const data = await fetchCampaigns;

    return (
        <div>
            <DataTable columns={columns} data={campaigns}/>
        </div>
    )
}