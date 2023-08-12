import { useState, useEffect } from 'react'

const ChallengingApp = () => {
  const generateData = () => {
    const data = []
    for (let i = 0; i < 10000; i++) {
      data.push({
        id: i,
        name: `Item ${i}`,
        value: Math.random() * 100,
      })
    }
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateSum = (data: any[]) => {
    console.log('Calculating sum...')
    let sum = 0
    data.forEach((item: { value: number }) => {
      sum += item.value
    })
    return sum
  }

  const [data, setData] = useState(generateData())

  useEffect(() => {
    setData(generateData())
  }, [])

  const handleItemClick = (itemId: number) => {
    console.log(`Item ${itemId} clicked.`)
  }

  const fetchEnrichedData = async () => {
    try {
      const response = await fetch('https://example.com/api/data')
      const apiData = await response.json()

      const enrichedData = data.map((item, index) => ({
        ...item,
        additionalInfo: apiData[index].additionalInfo,
      }))

      setData(enrichedData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchEnrichedData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Challenging Data Visualization Dashboard</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>: <span>{item.value}</span>
            <button onClick={() => handleItemClick(item.id)}>Click me</button>
          </li>
        ))}
      </ul>
      <div>Total Sum: {calculateSum(data)}</div>
    </div>
  )
}

export default ChallengingApp
