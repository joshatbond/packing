import { CaretLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { DataTable } from '~/app/_components/table/table'
import { mockData } from '~/lib/mockData'

import { columns } from './_components/columns'

export default function BoxPage({ params }: { params: { boxId: string } }) {
  const box = mockData.boxes.find(box => box.id === params.boxId)

  if (!box) {
    return <div>Not found</div>
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="mb-4 flex items-center gap-4">
        <Link href={`/boxes`}>
          <div className="rounded bg-neutral-300 p-1 text-neutral-900 focus-within:bg-neutral-100 hover:bg-neutral-100">
            <CaretLeftIcon className="h-4 w-4" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold">{box.name}</h1>
      </div>

      <div className="flex flex-wrap gap-4">
        <DataTable data={box.items} columns={columns} />
      </div>
    </main>
  )
}
