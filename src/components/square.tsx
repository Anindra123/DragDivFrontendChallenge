import React, { useRef, useState } from "react";
import Tooltip from "./tooltip";
import { createPortal } from "react-dom";
import { SMALL_BOX_HEIGHT, SMALL_BOX_WIDTH } from "../constants/constants";

interface SquareProps {
    wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
    divPosition: { x: number, y: number };
    setDivPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>,
    currentPosition: string,
    topBarRef: React.MutableRefObject<HTMLDivElement | null>;

}



export default function Square({
    wrapperRef
    , topBarRef
    , divPosition
    , setDivPosition,
    currentPosition }: SquareProps) {

    const [isTooltipVisible, setToolTipVisible] = useState(false);
    const toolTipRef = useRef<HTMLDivElement | null>(null);
    const tootTipRect = toolTipRef.current?.getBoundingClientRect();
    const topBarRect = topBarRef.current?.getBoundingClientRect();
    const offset_x = divPosition.x - (tootTipRect ? tootTipRect.width : 0)
    const offset_y = divPosition.y - (tootTipRect ? tootTipRect.height : 0)
    const squareRef = useRef<HTMLDivElement | null>(null);
    let startPosition = { x: 0, y: 0 };

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {

        startPosition = {
            x: e.clientX - divPosition.x,
            y: e.clientY - divPosition.y,
        }
        setToolTipVisible(false);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(e: MouseEvent) {
        setToolTipVisible(false);
        const new_x_position = e.clientX - (startPosition.x === 0 ? e.clientX : startPosition.x);
        const new_y_position = e.clientY - (startPosition.y === 0 ? e.clientY : startPosition.y);

        const parent_container_rect = wrapperRef.current?.getBoundingClientRect();

        const maximum_x_position = parent_container_rect?.width
            && parent_container_rect.width - SMALL_BOX_WIDTH;
        const maximum_y_position = parent_container_rect?.height && topBarRect?.height
            && parent_container_rect.height - SMALL_BOX_HEIGHT;

        const boundingX = Math.min(Math.max(new_x_position, 0)
            , maximum_x_position ? maximum_x_position : 0)
        const boundingY = Math.min(Math.max(new_y_position, topBarRect?.height ? topBarRect.height : 0)
            , maximum_y_position ? maximum_y_position : 0)

        setDivPosition({ x: boundingX, y: boundingY });
    }

    function handleMouseUp() {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

    }
    function handleMouseOver() {


        setToolTipVisible(true)
    }

    return (
        <div className='square'
            onMouseDown={(e) => handleMouseDown(e)}


            style={{
                width: "100px",
                height: "100px",
                position: "absolute",
                cursor: "grab",
                left: `${divPosition.x}px`,
                top: `${divPosition.y}px`

            }}
            ref={squareRef}
            onMouseOver={handleMouseOver}
            onMouseLeave={() => setToolTipVisible(false)}
        >


            {createPortal(<Tooltip
                offsetX={offset_x}
                offsetY={offset_y}
                currentPosition={currentPosition}
                toolTipRef={toolTipRef}
                tooltipTitle="Tooltip"
                isVisible={isTooltipVisible}
                squareRef={squareRef}
            />, document.body)}


        </div >
    )
}