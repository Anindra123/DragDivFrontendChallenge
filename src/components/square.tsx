import React, { useRef, useState } from "react";
import Tooltip from "./tooltip";
import { createPortal } from "react-dom";

interface SquareProps {
    wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
    divPosition: { x: number, y: number };
    setDivPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
}



export default function Square({ wrapperRef
    , divPosition
    , setDivPosition }: SquareProps) {

    const [isTooltipVisible, setToolTipVisible] = useState(false);
    const [currentPosition, setCurrentPosition] = useState("top");
    const toolTipRef = useRef<HTMLDivElement | null>(null);
    const tootTipRect = toolTipRef?.current?.getBoundingClientRect();
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
            && parent_container_rect.width - 104;
        const maximum_y_position = parent_container_rect?.height
            && parent_container_rect.height - 104;

        const boundingX = Math.min(Math.max(new_x_position, 0)
            , maximum_x_position ? maximum_x_position : 0)
        const boundingY = Math.min(Math.max(new_y_position, 0)
            , maximum_y_position ? maximum_y_position : 0)

        setDivPosition({ x: boundingX, y: boundingY });
    }

    function handleMouseUp() {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

    }
    function handleMouseOver() {
        if (currentPosition === "right" || currentPosition === "left") {
            if (offset_x < 0) {
                setCurrentPosition("right")
            }
            if (offset_x >= 350) {
                setCurrentPosition("left")
            }
        }
        if (currentPosition === "top" || currentPosition === "bottom") {
            if (offset_y < 0) {
                setCurrentPosition("bottom");
            }
            if (offset_y >= 350) {
                setCurrentPosition("top");
            }
        }

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
                currentPosition={currentPosition}
                toolTipRef={toolTipRef}
                tooltipTitle="Tooltip"
                isVisible={isTooltipVisible}
                squareRef={squareRef}
            />, document.body)}


        </div >
    )
}