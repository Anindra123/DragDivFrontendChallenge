interface TopBorderProps {
    parentSize: { width: number, height: number },
    parentPosition: { x: number, y: number },
    handleMouseResizeDown: (e: React.PointerEvent<HTMLDivElement>) => void,
}

export default function TopBorder({ parentPosition, parentSize, handleMouseResizeDown }
    : TopBorderProps) {
    return (
        <div className="wrapper-border" id='top'
            style={{
                width: `${parentSize.width - 50}px`,
                height: "1px",
                top: `${parentPosition.y - 1}px`,
                left: `${parentPosition.x + 25}px`,

            }} onPointerDown={handleMouseResizeDown}>
        </div>
    )
}