import { useToolTip } from "../hooks/useTooltip";
import { ContainerPosition, ContainerSize } from "../types/ContainerTypes";


interface TooltipProps {
    tooltipTitle: string,
    isVisible: boolean,
    toolTipRef: React.RefObject<HTMLDivElement>
    currentPosition: string,
    divPosition: ContainerPosition
    containerSize: ContainerSize,
    squareRect: DOMRect | undefined
}

export default function Tooltip({ tooltipTitle
    , isVisible,
    currentPosition,
    toolTipRef, containerSize, squareRect, divPosition
}: TooltipProps) {
    const toolTipRect = toolTipRef.current?.getBoundingClientRect();
    const [offsetX, offsetY, tooltip_position,
        setTop, setBottom, setLeft, setRight] = useToolTip({
            squareRect: squareRect,
            divPosition: divPosition, toolTipRect: toolTipRect
        })
    if (currentPosition === "top") {

        setTop();
        if (offsetY < 0) {
            setBottom();
        }
    }
    if (currentPosition === "bottom") {

        setBottom();
        if (offsetY > containerSize.height - 170) {
            setTop();
        }

    }
    if (currentPosition === "right") {
        setRight();
        if (offsetX > containerSize.width - 300) {
            setLeft();
        }
    }

    if (currentPosition === "left") {
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