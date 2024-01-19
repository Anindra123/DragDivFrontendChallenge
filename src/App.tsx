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
    console.log(resizePostion);
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
      const newHeight = containerSize.height +
        (e.clientY - (parentPostion.y + parentSize.height));

      temp_size.height = Math.min(Math.max(newHeight, WRAPPER_CONTAINER_HEIGHT), WINDOW_HEIGHT);

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
  }

  function handleMouseResizeUp() {
    document.documentElement.removeEventListener("pointermove", handleMouseResizeMove);
    document.documentElement.removeEventListener("pointerup", handleMouseResizeUp);
  }


  return (
    <>


      <div className="wrapper-border" id='right'
        style={{
          width: "1px",
          left: `${parentSize.width + parentPostion.x}px`
          , top: `${parentPostion.y + 25}px`,
          height: `${parentSize.height - 50}px`
        }} onPointerDown={handleMouseResizeDown}>

      </div>
      <div className='wrapper-border' id='bottom'

        style={{
          width: `${parentSize.width - 50}px`,
          top: `${parentSize.height + parentPostion.y}px`,
          left: `${parentPostion.x + 25}px`,
          height: "1px",
        }}
        onPointerDown={handleMouseResizeDown}
      >
      </div>
      <div className="wrapper-border" id='bottom-right'
        style={
          {
            width: `50px`,
            height: `50px`,
            top: `${parentSize.height + parentPostion.y - 51}px`,
            left: `${parentSize.width + parentPostion.x - 51}px`,

          }} onPointerDown={handleMouseResizeDown}>

      </div>
      <div className="wrapper-border" id='top-right'
        style={
          {
            width: `50px`,
            height: `50px`,
            top: `${parentPostion.y - 1}px`,
            left: `${parentSize.width + parentPostion.x - 51}px`,

          }} onPointerDown={handleMouseResizeDown}>

      </div>
      <div className="wrapper-border" id='top-left'
        style={
          {
            width: `50px`,
            height: `50px`,
            top: `${parentPostion.y - 1}px`,
            left: `${parentPostion.x - 1}px`,

          }} onPointerDown={handleMouseResizeDown}>

      </div>
      <div className="wrapper-border" id='bottom-left'
        style={
          {
            width: `50px`,
            height: `50px`,
            top: `${parentSize.height + parentPostion.y - 51}px`,
            left: `${parentPostion.x - 1}px`,

          }} onPointerDown={handleMouseResizeDown}>

      </div>
      <div className="wrapper-border" id='top'
        style={{
          width: `${parentSize.width - 50}px`,
          height: "1px",
          top: `${parentPostion.y - 1}px`,
          left: `${parentPostion.x + 25}px`,

        }} onPointerDown={handleMouseResizeDown}>
      </div>
      <div className="wrapper-border" id='left'
        style={{
          width: `1px`,
          height: `${parentSize.height - 50}px`,
          top: `${parentPostion.y + 25}px`,
          left: `${parentPostion.x - 2}px`
        }} onPointerDown={handleMouseResizeDown}>

      </div>

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
