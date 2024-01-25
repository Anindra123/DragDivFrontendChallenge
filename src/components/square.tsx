import React, { useContext, useRef, useState } from "react";
import Tooltip from "./tooltip";
import { createPortal } from "react-dom";
import { SMALL_BOX_HEIGHT, SMALL_BOX_WIDTH } from "../constants/constants";
import { ContainerContext } from "../context/ContainerContext";



export default function Square() {

    const { divPosition, setDivPosition, parentSize } = useContext(ContainerContext)
    const toolTipRef = useRef<HTMLDivElement | null>(null);
    const squareRef = useRef<HTMLDivElement | null>(null);
    const squareRect = squareRef.current?.getBoundingClientRect();
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
        setToolTipVisible(false);
        const new_x_position = e.clientX - (startPosition.x === 0 ? e.clientX : startPosition.x);
        const new_y_position = e.clientY - (startPosition.y === 0 ? e.clientY : startPosition.y);

        const maximum_x_position = parentSize.width - SMALL_BOX_WIDTH;
        const maximum_y_position = parentSize.height - SMALL_BOX_HEIGHT;
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
                top: `${divPosition.y}px`,
                borderRadius: ".5rem"

            }}
            ref={squareRef}
            id="square"
            onMouseOver={handleMouseOver}
            onMouseLeave={() => setToolTipVisible(false)}
        >


            {createPortal(<Tooltip

                squareRect={squareRect}
                toolTipRef={toolTipRef}
                tooltipTitle="Tooltip"
                isVisible={isTooltipVisible}

            />, document.body)}


        </div >
    )
}