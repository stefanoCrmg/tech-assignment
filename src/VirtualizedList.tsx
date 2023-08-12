import { useState } from 'react'

type VirtualizedListProps<A = React.ReactNode> = {
  readonly items: ReadonlyArray<A>
  readonly containerHeight: number
  readonly itemsCount: number
}

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  itemsCount,
  containerHeight,
}) => {
  const itemHeight = containerHeight / itemsCount
  const [scrollTop, setScrollTop] = useState(0)
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length,
  )
  const visibleItems = items.slice(startIndex, endIndex)

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setScrollTop(event.currentTarget.scrollTop)
  }
  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: 'scroll' }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${items.length * itemHeight}px` }}>
        <div
          style={{
            position: 'relative',
            height: `${visibleItems.length * itemHeight}px`,
            top: `${startIndex * itemHeight}px`,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={`virtualized-list-key-item-${index}`}
              style={{ height: `${itemHeight}px` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
