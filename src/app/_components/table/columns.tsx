'use client'

import { rankItem } from '@tanstack/match-sorter-utils'
import { type ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

import { Badge } from '~/components/ui/badge'
import { type mockData } from '~/lib/mockData'

import { DataTableColumnHeader } from './column-header'
import { DataTableRowActions } from './row-actions'

type Box = (typeof mockData)['boxes'][number]

export const columns: ColumnDef<Box>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      <Link href={`/boxes/${row.getValue('id') as string}`}>
        <span className="underline">{row.getValue('name')}</span>
      </Link>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <p>{row.getValue('description')}</p>,
  },
  {
    accessorKey: 'labels',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Labels" />
    ),
    cell: ({ row, column }) => {
      const labels = row.original.labels
      const filteredValue = (column.getFilterValue() as string) ?? ''

      return (
        <div className="flex space-x-2">
          {labels
            ? labels.map(label => (
                <Badge
                  variant="outline"
                  key={label.value}
                  className={
                    filteredValue && label.label.includes(filteredValue)
                      ? 'bg-blue-800'
                      : 'bg-neutral-700'
                  }
                >
                  {label.label}
                </Badge>
              ))
            : null}
        </div>
      )
    },

    enableSorting: false,
    filterFn: (row, id, value: string, addMeta) => {
      const itemRank = rankItem(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (row.getValue('labels') as Box['labels']).map(label => label.label),
        value
      )
      addMeta({ itemRank })

      return itemRank.passed

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      // return (row.getValue('labels') as Box['labels']).some(
      //   label => label.label === value
      // )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
