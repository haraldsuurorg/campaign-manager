import { ColumnDef } from '@tanstack/react-table';
import { Switch } from '../ui/switch';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Ellipsis, Trash2 } from 'lucide-react';
import { emitter } from '@/lib/utils';

export type Campaign = {
    id: number
    title: string
    activity_status: boolean
    payout_estonia: number | null
    payout_spain: number | null
    payout_bulgaria: number | null
}

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends unknown, TValue> {
        alignment?: string;
    }
}

export const columns: ColumnDef<Campaign>[] = [
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: 'activity_status',
        header: 'Activity status',
        meta: {
            alignment: 'text-center'
        },
        cell: ({ row }) => {
            const [isActive, setIsActive] = useState(row.original.activity_status);

            const handleStatusChange = (checked: boolean) => {
                setIsActive(checked);
                updateActivityStatus(row.original.id, checked)
                // console.log('checked:', checked);
            }

            return (
                <div onClick={(e) => e.stopPropagation()}>
                    <Switch
                        checked={isActive}
                        onCheckedChange={handleStatusChange}
                    />
                </div>
            )
        },
        filterFn: (row, id, filterValue) => {
            if (filterValue === undefined) return true;
            return row.getValue(id) === filterValue;
        }
    },
    {
        accessorKey: 'payoutEstonia',
        header: 'Payout for Estonia',
        meta: {
            alignment: 'text-center'
        },
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
        meta: {
            alignment: 'text-center'
        },
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
        meta: {
            alignment: 'text-center'
        },
        cell: ({ row }) => {
            const payoutValue = row.original.payout_bulgaria;

            if (payoutValue && payoutValue !== null) {
                return <span>{payoutValue}€</span>;
            } else {
                return <span>-</span>
            }
        }
    },
    {
        id: 'actions',
        meta: {
            alignment: 'text-center'
        },
        cell: ({ row }) => {
            const campaign = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'}>
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() =>deleteCampaign(row.original.id)}
                            // className='justify-center'
                        >
                            Delete <Trash2 />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
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

async function deleteCampaign(campaignId: number) {
    try {
        const response = await fetch(`/api/campaigns/${campaignId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // console.log(campaignId);

        if (!response.ok) {
            updateNotifications('error', 'Error')
            console.error(response);
        } else {
            emitter.emit('campaigns-updated');
            updateNotifications('update', 'Campaign deleted');
        }
    } catch(err) {
        console.error('Error deleting the campaign', err);
        updateNotifications('error', 'Error');
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
    }, 2000);
}