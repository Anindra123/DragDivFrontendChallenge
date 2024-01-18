import React, { useRef, useState } from 'react'
import './App.css'
import Square from './components/square';

const intial_positon = {
  x: 250, y: 250
}

const inital_parent_position = {
  x: 450,
  y: 100
}

function App() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRect = wrapperRef.current?.getBoundingClientRect();
  const [divPosition, setDivPosition] = useState(intial_positon);
  const [parentPostion, setParentPosition] = useState(inital_parent_position)
  const [currentPosition, setCurrentPosition] = useState("top");
  const topBarRef = useRef<HTMLDivElement | null>(null)

  let parentStartPosition = { x: 0, y: 0 }
  function handleMouseDown(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {

    parentStartPosition = { x: e.clientX - parentPostion.x, y: e.clientY - parentPostion.y }


    document.documentElement.addEventListener("mousemove", handleMouseMove)
    document.documentElement.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    const new_X = e.clientX - (parentStartPosition.x === 0 ? e.clientX : parentStartPosition.x);
    const new_Y = e.clientY - (parentStartPosition.x === 0 ? e.clientY : parentStartPosition.y);
    const body_X = document.documentElement.clientWidth -
      (wrapperRect?.width ? wrapperRect.width : 0);
    const body_Y = document.documentElement.clientHeight -
      (wrapperRect?.height ? wrapperRect.height : 0);

    const bounded_X = Math.min(Math.max(new_X, 0), body_X ? body_X : 0)
    const bounded_Y = Math.min(Math.max(new_Y, 0), body_Y ? body_Y : 0)

    setParentPosition({ x: bounded_X, y: bounded_Y })
  }

  function handleMouseUp() {
    document.documentElement.removeEventListener("mousemove", handleMouseMove)
    document.documentElement.removeEventListener("mouseup", handleMouseUp);
  }


  return (
    <>


      {/* <div style={{ position: "absolute", left: `${parentPostion.x}px`, top: `${parentPostion.y}px`, width: "max-content" }}> */}

      <div className='wrapper' style={{
        left: `${parentPostion.x}px`
        , top: `${parentPostion.y}px`
      }} ref={wrapperRef} >

        <Square
          currentPosition={currentPosition}
          setDivPosition={setDivPosition}
          divPosition={divPosition}
          wrapperRef={wrapperRef}
          topBarRef={topBarRef} />

        <div className='top-bar-container' ref={topBarRef} >
          <div className='select-group'>

            <p className='select-input-label'>Tootip Position:</p>
            <select onChange={(e) => setCurrentPosition(e.currentTarget.value)}>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          <a className='move-handler' onMouseDown={handleMouseDown}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "black" }}><path d="M7 10h4v4H7zm0-6h4v4H7zm0 12h4v4H7zm6-6h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z"></path></svg>
          </a>
        </div>
      </div >
      {/* </div> */}



    </>
  )
}

export default App
