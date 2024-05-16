const mockUrls = [
  'https://utfs.io/f/4033f3b2-0fc9-4a6e-95be-37009f50e078-7qajqq.png',
  'https://utfs.io/f/93fe9634-fea2-4314-956b-7ae7f700ae5b-qa0vsq.png',
  'https://utfs.io/f/4709ed08-e620-4c42-9d65-94af53585014-lf3twj.png',
  'https://utfs.io/f/c494ae05-dd1a-459a-b09d-bbe37a140853-qikpqu.1.png',
].map((url, index) => ({ id: index + 1, url }))

const labels = [
  'kitchen',
  'bedroom',
  'bathroom',
  'living room',
  'critical role',
]

const boxes = new Array(100)
  .fill(0)
  .map((_, index) => generateBox(index))
  .map(box => ({
    ...box,
    labels: box.items.reduce(
      (acc, item) => {
        for (const label of item.labels) {
          if (acc.every(l => l.value !== label.value)) acc.push(label)
        }
        return acc
      },
      [] as ReturnType<typeof getLabels>
    ),
  }))

export const mockData = {
  images: mockUrls,
  boxes,
}

function getImageId() {
  const randomId = Math.floor(Math.random() * mockUrls.length)
  if (mockUrls[randomId]) {
    return mockUrls[randomId]!.id
  }
  return ''
}
function mockDate() {
  const currentDate = new Date()
  const lastWeek = new Date(currentDate)
  lastWeek.setDate(currentDate.getDate() - 7)

  const randomTimestamp =
    lastWeek.getTime() +
    Math.random() * (currentDate.getTime() - lastWeek.getTime())

  return new Date(randomTimestamp).valueOf()
}
function generateDescription() {
  const loremText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const loremWords = loremText.split(' ')
  const minLength = 5
  const maxLength = 30

  let randomText = ''

  // Generate random text between minLength and maxLength characters
  while (randomText.length < minLength || randomText.length > maxLength) {
    randomText = ''
    const randomLength =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength

    while (randomText.length < randomLength) {
      const randomIndex = Math.floor(Math.random() * loremWords.length)
      const word = loremWords[randomIndex]
      if (word && randomText.length + word.length <= randomLength) {
        randomText += word + ' '
      } else {
        break
      }
    }

    // Remove trailing space
    randomText = randomText.trim()
  }

  return randomText
}
function getLabels() {
  const subsetLength = Math.floor(Math.random() * labels.length) + 1
  const subset: string[] = []
  const remainingItems = [...labels]

  for (let i = 0; i < subsetLength; i++) {
    const randomIndex = Math.floor(Math.random() * remainingItems.length)
    subset.push(remainingItems[randomIndex]!)
    remainingItems.splice(randomIndex, 1)
  }

  return subset.map((label, index) => ({ value: index.toString(), label }))
}
function generateItem(id: number) {
  return {
    id: (id + 1).toString(),
    name: `Item ${id + 1}`,
    description: generateDescription(),
    image: getImageId(),
    createdAt: mockDate(),
    updatedAt: mockDate(),
    labels: getLabels(),
  }
}
function generateBox(id: number) {
  return {
    id: (id + 1).toString(),
    name: `Box ${id + 1}`,
    description: generateDescription(),
    createdAt: mockDate(),
    updatedAt: mockDate(),
    items: new Array(Math.floor(Math.random() * 10) + 1)
      .fill(0)
      .map((_, index) => generateItem(index)),
    labels: [],
  }
}
