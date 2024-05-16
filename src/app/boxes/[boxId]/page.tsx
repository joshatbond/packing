import { mockData } from '~/lib/mockData'

export default function BoxPage({ params }: { params: { boxId: string } }) {
  const items = mockData.boxes.find(box => box.id === params.boxId)?.items

  if (!items) {
    return <div>Not found</div>
  }

  return <div>Box {params.boxId}</div>
}
