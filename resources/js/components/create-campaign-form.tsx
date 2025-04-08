import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { emitter } from '@/lib/utils';

const formSchema = z.object({
    title: z.string({
        message: 'Please enter a title'
    }).min(1, {
        message: 'Please enter a title'
    }).max(50, {
        message: 'Title must be less than 50 characters'
    }),
    activityStatus: z.boolean(),
    payoutEstonia: z.number().positive().optional().nullable().refine((data) => {
        if (!data) return true;
        const decimalPart = data.toString().split('.')[1];
        return !decimalPart || decimalPart.length <= 2;
    }, {
        message: 'Max precision is 2 decimal places'
    }),
    payoutSpain: z.number().positive().optional().nullable(),
    payoutBulgaria: z.number().positive().optional().nullable(),
}).refine((data) => {
    return data.payoutEstonia !== null && data.payoutEstonia !== undefined ||
           data.payoutSpain !== null && data.payoutSpain !== undefined ||
           data.payoutBulgaria !== null && data.payoutBulgaria !== undefined;
}, {
    message: 'At least one Payout field must be filled',
    path: ['payoutEstonia']
})

type FormStatus = 'idle' | 'submitting' | 'submitted' | 'error';

export function CampaignCreationForm() {
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const userId = usePage<SharedData>().props.auth.user.id;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            activityStatus: false,
            payoutEstonia: null,
            payoutBulgaria: null,
            payoutSpain: null,
        }
    })

    const handleResetForm = () => {
        form.reset();
        setFormStatus('idle');
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setFormStatus('submitting');

            const campaignData = {
                user_id: userId,
                title: values.title,
                activity_status: values.activityStatus,
                payout_estonia: values.payoutEstonia,
                payout_spain: values.payoutSpain,
                payout_bulgaria: values.payoutBulgaria,
            }

            const response = await fetch('/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campaignData)
            });

            if (response.ok) {
                setFormStatus('submitted');

                emitter.emit('campaigns-updated');
            } else {
                console.error('Server responded with error:', response.status);
                setFormStatus('error');
                return;
            }
        } catch (err) {
            console.error('Error creating campaign:', err);
            setFormStatus('error');
        }
    }

    if (formStatus === 'submitted') {
        return (
            <div>
                <h3>Success!</h3>
                <p className='mb-4'>Your campaign has been created successfully.</p>
                <Button
                    onClick={() => handleResetForm() }
                    className='flex justify-self-end'
                >
                    Create another one?
                </Button>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                    control = {form.control}
                    name = 'title'
                    render = {({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='My campaign'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='activityStatus'
                    render = {({ field }) => (
                        <FormItem>
                            <FormLabel>Activity status</FormLabel>
                            <FormControl>
                                <Switch
                                    id='activity-status'
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='payoutEstonia'
                    render = {({ field }) => (
                        <FormItem>
                            <FormLabel>Payout for Estonia 🇪🇪</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    placeholder='2.50'
                                    value={field.value ?? ''}
                                    onChange={e => {
                                        const value = e.target.value;
                                        field.onChange(value === '' ? null : Number(value));
                                    }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='payoutSpain'
                    render = {({ field }) => (
                        <FormItem>
                            <FormLabel>Payout for Spain 🇪🇸</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    placeholder='2.50'
                                    value={field.value ?? ''}
                                    onChange={e => {
                                        const value = e.target.value;
                                        field.onChange(value === '' ? null : Number(value));
                                    }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='payoutBulgaria'
                    render = {({ field }) => (
                        <FormItem>
                            <FormLabel>Payout for Bulgaria 🇧🇬</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    placeholder='2.50'
                                    value={field.value ?? ''}
                                    onChange={e => {
                                        const value = e.target.value;
                                        field.onChange(value === '' ? null : Number(value));
                                    }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {formStatus === 'error' && (
                    <div className='flex-col gap-2'>
                        <p>There was an error creating your campaign.</p>
                        <p>Please try again. If the error persists, we kindly ask you to contact our customer support.</p>
                    </div>
                )}

                <Button
                    type='submit'
                    className='flex justify-self-end'
                    disabled={formStatus === 'submitting'}
                >
                    {formStatus === 'submitting' ? (
                        <>
                            <span>Creating</span>
                            <span className='animate-pulse'>...</span>
                        </>
                    ) : 'Create'}
                </Button>
            </form>
        </Form>
    )
}