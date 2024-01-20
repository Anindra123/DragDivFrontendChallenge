interface LeftBorderProps {
    parentSize: { width: number, height: number },
    parentPosition: { x: number, y: number },
    handleMouseResizeDown: (e: React.PointerEvent<HTMLDivElement>) => void,
}

export default function LeftBorder({
    parentPosition, parentSize, handleMouseResizeDown
}: LeftBorderProps) {
    return (
        <div className="wrapper-border" id='left'
            style={{
                width: `1px`,
                height: `${parentSize.height - 50}px`,
                top: `${parentPosition.y + 25}px`,
                left: `${parentPosition.x - 2}px`
            }} onPointerDown={handleMouseResizeDown}>

        </div>
    )
}