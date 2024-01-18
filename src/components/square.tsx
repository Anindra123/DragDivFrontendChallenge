import React, { useState } from "react";
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
        const new_x_position = e.clientX - (startPosition.x === 0 ? e.clientX : startPosition.x);
        const new_y_position = e.clientY - (startPosition.y === 0 ? e.clientY : startPosition.y);

        const parent_container_rect = wrapperRef.current?.getBoundingClientRect();

        const maximum_x_position = parent_container_rect?.width
            && parent_container_rect.width - 100;
        const maximum_y_position = parent_container_rect?.height
            && parent_container_rect.height - 100;

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
            onMouseOver={() => setToolTipVisible(true)}
            onMouseLeave={() => setToolTipVisible(false)}
        >

            {createPortal(<Tooltip tooltipTitle="Tooltip" isVisible={isTooltipVisible} />, document.body)}


        </div >
    )
}