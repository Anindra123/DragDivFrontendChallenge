import { useContext } from "react";
import { useToolTip } from "../hooks/useTooltip";
// import { ContainerPosition, ContainerSize } from "../types/ContainerTypes";
import { ContainerContext } from "../context/ContainerContext";


interface TooltipProps {
    tooltipTitle: string,
    isVisible: boolean,
    toolTipRef: React.RefObject<HTMLDivElement>

    squareRect: DOMRect | undefined
}

export default function Tooltip({ tooltipTitle
    , isVisible,

    toolTipRef, squareRect,
}: TooltipProps) {
    const toolTipRect = toolTipRef.current?.getBoundingClientRect();
    const { divPosition, currentToolTipPosition, parentSize } = useContext(ContainerContext)
    const [offsetX, offsetY, tooltip_position,
        setTop, setBottom, setLeft, setRight] = useToolTip({
            squareRect: squareRect,
            divPosition: divPosition, toolTipRect: toolTipRect
        })
    if (currentToolTipPosition === "top") {

        setTop();
        if (offsetY < 0) {
            setBottom();
        }
    }
    if (currentToolTipPosition === "bottom") {

        setBottom();
        if (offsetY > parentSize.height - 170) {
            setTop();
        }

    }
    if (currentToolTipPosition === "right") {
        setRight();
        if (offsetX > parentSize.width - 300) {
            setLeft();
        }
    }

    if (currentToolTipPosition === "left") {
        setLeft();
        if (offsetX < 0) {
            setRight();
        }

    }




    return (
        <div style={{
            width: "100px", height: "30px",
            borderRadius: ".5rem",
            backgroundColor: "black", visibility: `${isVisible ? "visible" : "hidden"}`,
            transition: "opacity 0.5s ease",
            opacity: `${isVisible ? "100%" : "0%"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            left: `${tooltip_position.x}px`, top: `${tooltip_position.y}px`

        }} ref={toolTipRef}>
            <p style={{ color: 'white', fontSize: ".8rem", fontWeight: "bold", margin: 0 }}>
                {tooltipTitle}
            </p>
        </div>
    )
}