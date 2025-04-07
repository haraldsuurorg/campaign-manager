import { ColumnDef } from '@tanstack/react-table';
import { Switch } from '../ui/switch';
import { useState } from 'react';

export type Campaign = {
    id: number
    title: string
    activity_status: boolean
    payout_estonia: number | null
    payout_spain: number | null
    payout_bulgaria: number | null
}

export const columns: ColumnDef<Campaign>[] = [
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: 'activity_status',
        header: 'Activity status',
        cell: ({ row }) => {
            const [isActive, setIsActive] = useState(row.original.activity_status);
            console.log('row data', row.original);

            const handleStatusChange = (checked: boolean) => {
                setIsActive(checked);
                updateActivityStatus(row.original.id, checked)
            }

            return (
                <div onClick={(e) => e.stopPropagation()}>
                    <Switch
                        checked={isActive}
                        onCheckedChange={handleStatusChange}
                    />
                </div>
            )
        }
    },
    {
        accessorKey: 'payoutEstonia',
        header: 'Payout for Estonia',
        cell: ({ row }) => {
            const payoutValue = row.original.payout_estonia;

            if (payoutValue && payoutValue !== null) {
                return <span>{payoutValue}€</span>;
            } else {
                return <span>-</span>
            }
        }
    },
    {
        accessorKey: 'payoutSpain',
        header: 'Payout for Spain',
        cell: ({ row }) => {
            const payoutValue = row.original.payout_spain;

            if (payoutValue && payoutValue !== null) {
                return <span>{payoutValue}€</span>;
            } else {
                return <span>-</span>
            }
        }
    },
    {
        accessorKey: 'payoutBulgaria',
        header: 'Payout for Bulgaria',
        cell: ({ row }) => {
            const payoutValue = row.original.payout_bulgaria;

            if (payoutValue && payoutValue !== null) {
                return <span>{payoutValue}€</span>;
            } else {
                return <span>-</span>
            }
        }
    },
]

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
            updateNotifications('error', 'Error')
            console.error(response);
        } else {
            updateNotifications('update', 'Activity status updated');
        }
    } catch(err) {
        console.error('Error updating the activity status', err);
        updateNotifications('error', 'Error')
    }
}

function updateNotifications(type:string, text:string) {
    const notifications = document.getElementById('notification-messages');

    if (!notifications) return;

    if (type === 'update') {
        notifications.innerHTML = `<p class='text-sm text-[#23C552]'>${text}</p>`;
    } else if (type === 'error') {
        notifications.innerHTML = `<p class='text-sm text-[#F84F31]'>${text}</p>`;
    }

    setTimeout(() => {
        if (notifications) {
            notifications.innerHTML = '';
        }
    }, 5000);
}