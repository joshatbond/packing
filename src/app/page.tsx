import { mockData } from '~/lib/mockData'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="flex flex-wrap gap-4">
        {mockData.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index + 1}`}
            className="w-48"
          />
        ))}
      </div>
    </main>
  )
}
