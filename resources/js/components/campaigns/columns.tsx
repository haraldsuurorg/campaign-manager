import { ColumnDef } from '@tanstack/react-table';
import { Switch } from '../ui/switch';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Ellipsis, Trash2 } from 'lucide-react';
import { emitter } from '@/lib/utils';
import { Campaign } from '@/types';
import { updateNotifications } from '../notifications';
import { Row } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
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
        cell: ({ row }) => <ActivityStatusCell row={row} />,
        filterFn: (row, id, filterValue) => {
            if (filterValue === undefined) return true;
            return Boolean(row.getValue(id)) === Boolean(filterValue);
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
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'}>
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-0'>
                        <DropdownMenuItem
                            onClick={() =>deleteCampaign(row.original.id)}
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
            updateNotifications('error', `Error (${response.status}) updating activity status.`);
            console.error(response);
        }

        emitter.emit('campaigns-updated');
        updateNotifications('update', 'Activity status updated');
    } catch(err) {
        console.error('Error updating the activity status', err);
        updateNotifications('error', 'Error');
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

        if (!response.ok) {
            updateNotifications('error', `Error (${response.status}) deleting the campaign`);
            console.error(response);
        }

        emitter.emit('campaigns-updated');
        updateNotifications('update', 'Campaign deleted');
    } catch(err) {
        console.error('Error deleting the campaign', err);
        updateNotifications('error', 'Error');
    }
}

function ActivityStatusCell({ row }: { row: Row<Campaign> }) {
    const [isActive, setIsActive] = useState(Boolean(row.original.activity_status));

    const handleStatusChange = (checked: boolean) => {
        setIsActive(checked);
        row.original.activity_status = checked ? 1 : 0;
        updateActivityStatus(row.original.id, checked);
    }

    return (
        <div>
            <Switch
                checked={Boolean(isActive)}
                onCheckedChange={handleStatusChange}
            />
        </div>
    );
}