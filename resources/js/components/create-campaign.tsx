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
import { CampaignCreationForm } from './create-campaign-form';
import { X } from 'lucide-react';

export function CreateCampaign() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Create a campaign</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogCancel className='border-none w-fit absolute right-3 top-4.5 shadow-none'>
                    <X className='!h-6 !w-6'/>
                </AlertDialogCancel>
                <AlertDialogHeader>
                    <AlertDialogTitle className='pb-2'>Create a new campaign</AlertDialogTitle>
                    <AlertDialogDescription className='font-medium'>Please add a title for Your campaign. Activating the campaign is optional at this stage, You can do it later as well. Please also include at least one payout for Your desired Country. If a payout field for a country is left empty, the campaign will not be published in that country.</AlertDialogDescription>
                </AlertDialogHeader>
                <CampaignCreationForm />
            </AlertDialogContent>
        </AlertDialog>
    );
}