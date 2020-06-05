import React, { useState, Component, useEffect, useRef, useCallback } from 'react'

function useCounter(count) {
  return <h1>{count}</h1>
}
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount)
  const it = useRef()
  useEffect(() => {
    it.current = setInterval(() => {
      setCount((count) => count + 1)
    })
  }, [])
  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  })
  return [count, setCount]
}
function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [onResize])
  return size
}

function App() {
  const [count, setCount] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {Counter} {size.width}
      {size.height}
    </div>
  )
}

export default App
