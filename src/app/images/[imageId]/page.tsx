import { Image } from '~/app/_components/Image'
import { mockData } from '~/lib/mockData'

export default function BoxPage({ params }: { params: { imageId: string } }) {
  const image = mockData.images.find(image => image.id === params.imageId)

  if (!image) {
    return <div>Not found</div>
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <Image src={image.url} alt={image.id} className="max-h-full" />
    </main>
  )
}
