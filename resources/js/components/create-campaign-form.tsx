import { boolean, number, z } from 'zod';
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

export function CampaignCreationForm() {
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
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
                                <Input {...field} />
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
                <Button
                    type='submit'
                    className='flex justify-self-end'
                >
                    Create
                </Button>
            </form>
        </Form>
    )
}