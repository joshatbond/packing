const mockUrls = [
  'https://utfs.io/f/4033f3b2-0fc9-4a6e-95be-37009f50e078-7qajqq.png',
  'https://utfs.io/f/93fe9634-fea2-4314-956b-7ae7f700ae5b-qa0vsq.png',
  'https://utfs.io/f/4709ed08-e620-4c42-9d65-94af53585014-lf3twj.png',
  'https://utfs.io/f/c494ae05-dd1a-459a-b09d-bbe37a140853-qikpqu.1.png',
].map((url, index) => ({ id: index + 1, url }))

export const mockData = {
  images: mockUrls,
}