export type GenericData = {
  readonly id: number
  readonly name: string
  readonly value: number
}

const generateData = (): GenericData[] => {
  const data: GenericData[] = []
  for (let i = 0; i < 10000; i++) {
    data.push({
      id: i,
      name: `Item ${i}`,
      value: Math.random() * 100,
    })
  }
  return data
}

export const someData = generateData()
