import { useState, useEffect } from 'react'
import { GenericData, someData } from './generateData'

export type EnrichedData = GenericData & { readonly additionalInfo: unknown }

const fetchEnrichedData = async (
  data: GenericData[],
): Promise<EnrichedData[] | undefined> => {
  try {
    const response = await fetch('https://example.com/api/data')
    const apiData = await response.json()

    return data.map((item, index) => ({
      ...item,
      additionalInfo: apiData[index].additionalInfo,
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
    return
  }
}

export type FetchingState<A> =
  | { readonly status: 'PENDING' }
  | { readonly status: 'ERROR' }
  | { readonly status: 'SUCCESS'; readonly data: A }

export const useEnrichedData = (): FetchingState<EnrichedData[]> => {
  const [localState, setLocalState] = useState<FetchingState<EnrichedData[]>>({
    status: 'PENDING',
  })

  useEffect(() => {
    fetchEnrichedData(someData)
      .then((dataFromAPI) => {
        if (dataFromAPI) {
          setLocalState({ status: 'SUCCESS', data: dataFromAPI })
        } else {
          setLocalState({
            status: 'SUCCESS',
            data: someData.map((base) => ({
              ...base,
              additionalInfo: undefined,
            })),
          })
        }
      })
      .catch(() => setLocalState({ status: 'ERROR' }))
  }, [])

  return localState
}
