import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Square from './components/square';
import {
  INITIAL_BOX_POSITION, INITIAL_PARENT_POSITION,
  INITIAL_PARENT_SIZE,
  SIDE_BAR_WIDTH,
  SMALL_BOX_HEIGHT,
  SMALL_BOX_WIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from './constants/constants';
import BorderGroup from './components/border-group';
import { handleResize } from './helper/HandleResizeFunction';
import { throttle } from './helper/Throttle';
import { ContainerContext } from './context/ContainerContext';





function App() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [divPosition, setDivPosition] = useState(INITIAL_BOX_POSITION);
  const [parentPostion, setParentPosition] = useState(INITIAL_PARENT_POSITION)
  const [parentSize, setParentSize] = useState(INITIAL_PARENT_SIZE)
  const [currentPosition, setCurrentPosition] = useState("top");

  let resizePostion = "right";


  let parentStartPosition = { x: 100, y: 100 }
  let containerSize = { width: 0, height: 0 };
  const containerPosition = { x: 0, y: 0 }
  const div_initial_position = useRef<{ x: number, y: number }>({ x: 0, y: 0 });



  let maxWidth = 0;

  const handleMouseMove = throttle((e: MouseEvent) => {
    const new_X = e.clientX - (parentStartPosition.x === 0 ?
      e.clientX : parentStartPosition.x);
    const new_Y = e.clientY - (parentStartPosition.x === 0 ?
      e.clientY : parentStartPosition.y);
    const body_X = (WINDOW_WIDTH - parentSize.width) - SIDE_BAR_WIDTH;
    const body_Y = WINDOW_HEIGHT - parentSize.height;
    const bounded_X = Math.min(Math.max(new_X, 0), body_X)
    const bounded_Y = Math.min(Math.max(new_Y, 0), body_Y)
    setParentPosition({ x: bounded_X, y: bounded_Y })
  }, 10)

  useEffect(() => {
    const wrapper_right_position = wrapperRef.current?.getBoundingClientRect().right;
    const wrapper_bottom_position = wrapperRef.current?.getBoundingClientRect().bottom;
    const child_left_position = document
      .getElementById("square")
      ?.getBoundingClientRect().left;
    const child_top_position = document.getElementById("square")?.getBoundingClientRect().top;
    div_initial_position.current.x = child_left_position ? child_left_position : 0;
    div_initial_position.current.y = child_top_position ? child_top_position : 0;
    containerPosition.x = wrapper_right_position ?
      wrapper_right_position - SMALL_BOX_WIDTH : 0
    containerPosition.y = wrapper_bottom_position ?
      wrapper_bottom_position - SMALL_BOX_HEIGHT : 0
  }, [wrapperRef, containerPosition.x, containerPosition.y])

  function handleMouseDown(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {

    parentStartPosition = { x: e.clientX - parentPostion.x, y: e.clientY - parentPostion.y }

    document.documentElement.addEventListener("mousemove", handleMouseMove)
    document.documentElement.addEventListener("mouseup", handleMouseUp);
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
    const wrapper_right_position = wrapperRef.current?.getBoundingClientRect().right;
    const wrapper_bottom_position = wrapperRef.current?.getBoundingClientRect().bottom;

    const child_left_position = document
      .getElementById("square")
      ?.getBoundingClientRect().left;

    const child_top_position = document.getElementById("square")?.getBoundingClientRect().top;

    div_initial_position.current.x = child_left_position ? child_left_position : 0;
    div_initial_position.current.y = child_top_position ? child_top_position : 0;


    containerPosition.x = wrapper_right_position ?
      (wrapper_right_position - SMALL_BOX_WIDTH) : 0
    containerPosition.y = wrapper_bottom_position ?
      (wrapper_bottom_position - SMALL_BOX_HEIGHT) : 0

    const sidebar_left_position = document
      .getElementById("right-side-bar")
      ?.getBoundingClientRect().left;

    const distance_from_sidebar = sidebar_left_position ?
      sidebar_left_position - e.clientX : 0
    maxWidth = parentSize.width + distance_from_sidebar;
    document.documentElement.addEventListener("pointermove", handleMouseResizeMove);
    document.documentElement.addEventListener("pointerup", handleMouseResizeUp);
  }

  function handleMouseResizeMove(event: PointerEvent) {

    handleResize({
      event: event,
      containerSize: containerSize,
      setParentPosition: setParentPosition,
      setParentSize: setParentSize,
      parentSize: parentSize,
      parentPosition: parentPostion,
      resizePosition: resizePostion,
      divPosition: divPosition,
      setDivPosition: setDivPosition,
      containerPosition: containerPosition,
      maxWidth: maxWidth,
      divInitialPosition: div_initial_position
    })

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
      }} ref={wrapperRef} id='wrapper'>

        <ContainerContext.Provider value={{
          setDivPosition: setDivPosition
          , divPosition: divPosition, parentSize: parentSize
          , currentToolTipPosition: currentPosition
        }}>
          <Square />
        </ContainerContext.Provider>


        <a className='move-handler' onMouseDown={handleMouseDown}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "black" }}><path d="M7 10h4v4H7zm0-6h4v4H7zm0 12h4v4H7zm6-6h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z"></path></svg>
        </a>
      </div >

      <div className='right-side-bar' id='right-side-bar'>
        <div className='select-group'>

          <p className='select-input-label'>Tootip Position:</p>
          <select onChange={(e) => setCurrentPosition(e.currentTarget.value)}>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>

      </div>





    </>
  )
}

export default App
