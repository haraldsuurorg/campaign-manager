import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogCancel } from './ui/alert-dialog';
import { Button } from './ui/button';
import { NavButton } from '@/types';
import { SidebarMenuButton } from './ui/sidebar';
import { CampaignCreationForm } from './create-campaign-form';
import { X, Plus } from 'lucide-react';
// {/* <Button>Create a campaign</Button> */}

export function CreateCampaign() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <SidebarMenuButton
                    tooltip={'Create a campaign'}
                >
                    <Plus className='ml-2'/>
                    <span>Create a campaign</span>
                </SidebarMenuButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogCancel className='border-none w-fit absolute right-3 top-4.5 shadow-none'>
                    <X className='!h-6 !w-6'/>
                </AlertDialogCancel>
                <AlertDialogHeader>
                    <AlertDialogTitle className='pb-2'>Create a new campaign</AlertDialogTitle>
                    <AlertDialogDescription className='font-medium'>Please add a title for Your campaign. Activating the campaign is optional at this stage, You can do it later as well. Please also include at least one payout for Your desired country. If a payout field for a country is left empty, the campaign will not be published in that country.</AlertDialogDescription>
                </AlertDialogHeader>
                <CampaignCreationForm />
            </AlertDialogContent>
        </AlertDialog>
    );
}