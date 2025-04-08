import { Campaign, columns } from "./columns";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types"
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { emitter } from "@/lib/utils";

async function fetchCampaigns(userId: number): Promise<Campaign[]> {
    try {
        const response = await fetch(`/api/campaigns?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            console.error(response);
            return [];
        }

        const data = await response.json();
        return data;

    } catch (err) {
        console.error('Error fetching campaigns: ', err);
        return [];
    }
}

export function CampaignTable() {
    const userId = usePage<SharedData>().props.auth.user.id;
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    useEffect(() => {
        fetchCampaigns(userId).then(setCampaigns);

        const campaignsUpdated = () => {
            console.log('campaigns updated');
            fetchCampaigns(userId).then(setCampaigns);
        }

        emitter.on('campaigns-updated', campaignsUpdated);

        return () => {
            emitter.off('campaigns-updated', campaignsUpdated);
        }

    }, [userId]);
    // const data = await fetchCampaigns;

    return (
        <div>
            <DataTable columns={columns} data={campaigns}/>
        </div>
    )
}