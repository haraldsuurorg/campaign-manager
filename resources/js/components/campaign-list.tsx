import { HTMLAttributes, useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { SharedData, Campaign } from "@/types";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function CampaignList(props: HTMLAttributes<HTMLDivElement>) {
    const userId = usePage<SharedData>().props.auth.user.id;
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    // export interface Campaign {
    //     id: number;
    //     title: string;
    //     activityStatus: boolean;
    //     payoutEstonia: number | null;
    //     payoutSpain: number | null;
    //     payoutBulgaria: number | null;
    // }

    async function fetchCampaigns() {
        try {
            const response = await fetch(`/api/campaigns?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const data = await response.json();
            setCampaigns(data);
        } catch (err) {
            console.log('Error fetching campaigns: ', err);
        }
    }

    async function updateActivityStatus(campaignId: number, checked: boolean) {
        const activityStatusData = {
            campaign_id: campaignId,
            activity_status: checked
        }

        try {
            const response = await fetch(`/api/campaigns/${campaignId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activityStatusData)
            })

            if (!response.ok) {
                console.error(response);
                alert('Error updating the activity status');
            }
        } catch(err) {
            console.error('Error updating the activity status', err);
            alert('Error updating the activity status');
        }
    }

    useEffect(() => {
        fetchCampaigns();
    }, [])

    return (
        <div {...props}>
            {campaigns.length === 0 && (
                <p>There are no campaigns.</p>
            )}

            <div className='grid grid-cols-3 gap-4'>
                {campaigns.map(campaign => (
                    <div
                        key={campaign.id}
                        className='flex-col rounded-xl p-4 bg-secondary'
                    >
                        <div className='flex justify-between'>
                            <h3 className='text-lg font-semibold mb-2'>{campaign.title}</h3>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <Switch
                                                defaultChecked={campaign.activity_status}
                                                onCheckedChange={(checked) => updateActivityStatus(campaign.id, checked)}
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span>Activity status</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div>
                            {campaign.payout_estonia && (
                                <p>Payout for Estonia: {campaign.payout_estonia}€</p>
                            )}
                            {campaign.payout_spain && (
                                <p>Payout for Spain: {campaign.payout_spain}€</p>
                            )}
                            {campaign.payout_bulgaria && (
                                <p>Payout for Bulgaria: {campaign.payout_bulgaria}€</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}