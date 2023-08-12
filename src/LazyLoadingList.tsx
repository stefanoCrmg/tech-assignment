import React, { useState, useRef, useEffect } from 'react'

type SomeOtherListProps = {
  readonly items: React.ReactNode[]
}

const WINDOW_SPAN = 10
const ITEM_COUNT = 100
const LazyLoadingList: React.FC<SomeOtherListProps> = ({ items }) => {
  const rootRef = useRef<HTMLUListElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [windowDimension, setWindowDimension] = useState(ITEM_COUNT)
  const visibleItems = items.slice(0, windowDimension)

  useEffect(() => {
    if (sentinelRef.current) {
      const localSentinelRef = sentinelRef.current
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry) {
              if (entry.isIntersecting) {
                setWindowDimension((curr) => curr + WINDOW_SPAN)
              }
            }
          })
        },
        { root: rootRef.current },
      )

      observer.observe(localSentinelRef)

      return () => observer.unobserve(localSentinelRef)
    }
    return () => {}
  }, [])

  return (
    <ul ref={rootRef} style={{ height: '500px', overflowY: 'auto' }}>
      {visibleItems}
      <div style={{ height: '1px' }} ref={sentinelRef} />
    </ul>
  )
}

export { LazyLoadingList }
