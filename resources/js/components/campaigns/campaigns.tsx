import { columns } from "./columns";
import { Campaign } from "@/types";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types"
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { emitter } from "@/lib/utils";
import { updateNotifications } from "../notifications";

async function fetchCampaigns(userId: number): Promise<Campaign[]> {
    try {
        const response = await fetch(`/api/campaigns?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            updateNotifications('error', `Error (${response.status}) fetching campaigns`);
            console.error(response);
            return [];
        }

        const data = await response.json();
        return data;
    } catch (err) {
        updateNotifications('error', `Error fetching campaigns`);
        console.error('Error fetching campaigns: ', err);
        return [];
    }
}

export function CampaignTable() {
    const userId = usePage<SharedData>().props.auth.user.id;
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    useEffect(() => {
        fetchCampaigns(userId).then(setCampaigns);

        const loadCampaigns = () => {
            fetchCampaigns(userId).then(setCampaigns);
        }

        loadCampaigns();

        emitter.on('campaigns-updated', loadCampaigns);

        return () => {
            emitter.off('campaigns-updated', loadCampaigns);
        }
    }, [userId]);

    return (
        <div>
            <DataTable columns={columns} data={campaigns}/>
        </div>
    )
}