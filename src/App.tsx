import React, { useRef, useState } from 'react'
import './App.css'
import Square from './components/square';
import {
  INITIAL_BOX_POSITION, INITIAL_PARENT_POSITION,
  INITIAL_PARENT_SIZE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  WRAPPER_CONTAINER_HEIGHT, WRAPPER_CONTAINER_WIDTH
} from './constants/constants';
import BorderGroup from './components/border-group';




function App() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [divPosition, setDivPosition] = useState(INITIAL_BOX_POSITION);
  const [parentPostion, setParentPosition] = useState(INITIAL_PARENT_POSITION)
  const [parentSize, setParentSize] = useState(INITIAL_PARENT_SIZE)
  const [currentPosition, setCurrentPosition] = useState("top");
  // const [resizePostion, setResizePosition] = useState("right");
  const topBarRef = useRef<HTMLDivElement | null>(null)
  let resizePostion = "right";


  let parentStartPosition = { x: 0, y: 0 }
  let containerSize = { width: 0, height: 0 };

  function handleMouseDown(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {

    parentStartPosition = { x: e.clientX - parentPostion.x, y: e.clientY - parentPostion.y }


    document.documentElement.addEventListener("mousemove", handleMouseMove)
    document.documentElement.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    const new_X = e.clientX - (parentStartPosition.x === 0 ? e.clientX : parentStartPosition.x);
    const new_Y = e.clientY - (parentStartPosition.x === 0 ? e.clientY : parentStartPosition.y);
    const body_X = document.documentElement.clientWidth - WRAPPER_CONTAINER_WIDTH;
    const body_Y = document.documentElement.clientHeight - WRAPPER_CONTAINER_HEIGHT;

    const bounded_X = Math.min(Math.max(new_X, 0), body_X)
    const bounded_Y = Math.min(Math.max(new_Y, 0), body_Y)

    setParentPosition({ x: bounded_X, y: bounded_Y })
  }

  function handleMouseUp() {
    document.documentElement.removeEventListener("mousemove", handleMouseMove)
    document.documentElement.removeEventListener("mouseup", handleMouseUp);
  }

  function handleMouseResizeDown(e: React.PointerEvent<HTMLDivElement>) {
    containerSize = {
      width: parentSize.width,
      height: parentSize.height
    }
    resizePostion = e.currentTarget.id;

    document.documentElement.addEventListener("pointermove", handleMouseResizeMove);
    document.documentElement.addEventListener("pointerup", handleMouseResizeUp);
  }

  function handleMouseResizeMove(e: PointerEvent) {
    const temp_size = { ...containerSize }
    const temp_parent_position = { ...parentPostion }
    if (resizePostion === "right") {
      const newWidth = containerSize.width
        + (e.clientX - (parentPostion.x + parentSize.width));

      temp_size.width = Math.min(Math.max(newWidth, WRAPPER_CONTAINER_WIDTH), WINDOW_WIDTH);
    }

    if (resizePostion === "bottom") {
      const newHeight = containerSize.height +
        (e.clientY - (parentPostion.y + parentSize.height));

      temp_size.height = Math.min(Math.max(newHeight, WRAPPER_CONTAINER_HEIGHT), WINDOW_HEIGHT);
    }

    if (resizePostion === "top") {
      temp_parent_position.y = Math.max(Math.min(e.clientY, parentPostion.y), 0);

      const newHeight = containerSize.height +
        (parentPostion.y - temp_parent_position.y);
      temp_size.height = Math.max(newHeight, parentSize.height);
    }

    if (resizePostion === "bottom-right") {
      const newWidth = containerSize.width
        + (e.clientX - (parentPostion.x + parentSize.width));

      temp_size.width = Math.min(Math.max(newWidth, WRAPPER_CONTAINER_WIDTH), WINDOW_WIDTH);
      const newHeight = containerSize.height +
        (e.clientY - (parentPostion.y + parentSize.height));

      temp_size.height = Math.min(Math.max(newHeight, WRAPPER_CONTAINER_HEIGHT), WINDOW_HEIGHT);
    }


    setParentSize(temp_size)
    setParentPosition(temp_parent_position);
  }

  function handleMouseResizeUp() {
    document.documentElement.removeEventListener("pointermove", handleMouseResizeMove);
    document.documentElement.removeEventListener("pointerup", handleMouseResizeUp);
  }


  return (
    <>
      <BorderGroup parentPosition={parentPostion}
        parentSize={parentSize} handleMouseResizeDown={handleMouseResizeDown}
      />

      <div className='wrapper' style={{
        left: `${parentPostion.x}px`
        , top: `${parentPostion.y}px`,
        height: `${parentSize.height}px`,
        width: `${parentSize.width}px`
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





    </>
  )
}

export default App
