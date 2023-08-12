import React, { useMemo } from 'react'
import { GenericData } from './generateData'
import { LazyLoadingList } from './LazyLoadingList'
import { EnrichedData, useEnrichedData } from './fetchEnrichedData'
import { SkeletonLoading } from './SkeletonLoading'
import { VirtualizedList } from './VirtualizedList'

const handleItemClick = (itemId: number) => {
  console.log(`Item ${itemId} clicked.`)
}

const Row: React.FC<EnrichedData> = (item) => {
  return (
    <li key={item.id}>
      <span>{item.name}</span>: <span>{item.value}</span>
      <button onClick={() => handleItemClick(item.id)}>Click me</button>
    </li>
  )
}

const calculateSum = (data: GenericData[]): number => {
  console.log('Calculating sum...')
  return data.reduce((prevValue, currValue) => prevValue + currValue.value, 0)
}

const ChallengingApp: React.FC = () => {
  const fetchData = useEnrichedData()
  const sumTotal = useMemo(
    () => (fetchData.status === 'SUCCESS' ? calculateSum(fetchData.data) : 0),
    [fetchData],
  )
  return (
    <div>
      <h1>Challenging Data Visualization Dashboard</h1>
      {fetchData.status === 'PENDING' && <SkeletonLoading />}
      {fetchData.status === 'ERROR' && <div>Some error happened</div>}
      {fetchData.status === 'SUCCESS' && (
        <>
          <div>Total Sum: {sumTotal}</div>
          <LazyLoadingList
            items={fetchData.data.map((item, index) => (
              <Row key={`row-element-lazy-loading-list-${index}`} {...item} />
            ))}
          />
          <VirtualizedList
            containerHeight={500}
            itemsCount={10}
            items={fetchData.data.map((item, index) => (
              <Row key={`row-element-virtualized-list-${index}`} {...item} />
            ))}
          />
        </>
      )}
    </div>
  )
}

export { ChallengingApp }
