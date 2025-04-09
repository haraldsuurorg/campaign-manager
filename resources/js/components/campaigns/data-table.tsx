import { useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { CreateCampaign } from "../create-campaign";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFiltrs] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFiltrs,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters
        }
    })

    return (
        <>
        <div className='flex justify-between mb-4 py-0.5'>
            <div className="flex justify-start">
                <CreateCampaign/>
            </div>
            <div className='flex gap-4'>
                <Input
                    placeholder='Search...'
                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                    className='min-w-sm'
                />
                <ToggleGroup
                    type='single'
                    onValueChange={(value) => {
                        if (value === '1') {
                            table.getColumn('activity_status')?.setFilterValue(1);
                        } else if (value === '0') {
                            table.getColumn('activity_status')?.setFilterValue(0);
                        } else {
                            table.getColumn('activity_status')?.setFilterValue(undefined);
                        }
                    }}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <ToggleGroupItem
                                        value='1'
                                    >
                                        Active
                                    </ToggleGroupItem>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span>Show only active campaigns</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <ToggleGroupItem
                                        value='0'
                                    >
                                        Inactive
                                    </ToggleGroupItem>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span>Show only inactive campaigns</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </ToggleGroup>

            </div>
        </div>
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return  (
                                    <TableHead
                                        key={header.id}
                                        className={header.column.columnDef.meta?.alignment || ''}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,header.getContext()
                                            )
                                        }
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={cell.column.columnDef.meta?.alignment || ''}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className='h-24 text-center'>
                                No campaigns found.
                            </TableCell>
                        </TableRow>
                    )
                }
                </TableBody>
            </Table>
        </div>
        <div className="flex w-full justify-end gap-2 mt-4">
            <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
        </>
    )
}