

interface TooltipProps {
    tooltipTitle: string,
    isVisible: boolean,
    squareRef: React.RefObject<HTMLDivElement | null>
    toolTipRef: React.RefObject<HTMLDivElement>
    currentPosition: string,
    offsetX: number,
    offsetY: number
}

export default function Tooltip({ tooltipTitle
    , isVisible,
    currentPosition,
    squareRef,
    toolTipRef, offsetX, offsetY }: TooltipProps) {


    const squareRect = squareRef.current?.getBoundingClientRect();

    const tooltip_position = {
        x: squareRect && squareRect.left,
        y: squareRect && squareRect.top
    }

    function setTop() {
        tooltip_position.y = squareRect?.top;
        if (tooltip_position.y) tooltip_position.y -= 35;
        if (tooltip_position.x) tooltip_position.x = squareRect?.left;
    }
    function setBottom() {
        tooltip_position.y = squareRect?.top;
        if (tooltip_position.y) tooltip_position.y += squareRect ? (squareRect.height + 10) : 0
        if (tooltip_position.x) tooltip_position.x = squareRect?.left
    }
    function setLeft() {
        tooltip_position.x = squareRect?.left;
        if (tooltip_position.x) tooltip_position.x -= squareRect ? (squareRect.width + 10) : 0
        if (tooltip_position.y) tooltip_position.y = squareRect?.top && squareRect?.top + 30;

    }
    function setRight() {
        tooltip_position.x = squareRect?.left;
        if (tooltip_position.x) tooltip_position.x += squareRect ? (squareRect.width + 10) : 0
        if (tooltip_position.y) tooltip_position.y = squareRect?.top && squareRect?.top + 30;

    }



    if (currentPosition === "top") {

        setTop();
        if (offsetY < 100) {
            setBottom();
        }
    }
    if (currentPosition === "bottom") {

        setBottom();
        if (offsetY > 390) {
            setTop();
        }

    }
    if (currentPosition === "right") {
        setRight();
        if (offsetX > 350) {
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