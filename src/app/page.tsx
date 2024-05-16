import { mockData } from '~/lib/mockData'

import { columns } from './_components/table/columns'
import { DataTable } from './_components/table/table'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="flex flex-wrap gap-4">
        <DataTable data={mockData.boxes} columns={columns} />
      </div>
    </main>
  )
}
