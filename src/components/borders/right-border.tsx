interface RightBorderProps {
    parentSize: { width: number, height: number },
    parentPosition: { x: number, y: number },
    handleMouseResizeDown: (e: React.PointerEvent<HTMLDivElement>) => void,
}
export default function RightBorder({ parentSize, parentPosition, handleMouseResizeDown }: RightBorderProps) {
    return (
        <div className="wrapper-border" id='right'
            style={{
                width: "1px",
                left: `${parentSize.width + parentPosition.x}px`
                , top: `${parentPosition.y + 25}px`,
                height: `${parentSize.height - 50}px`
            }} onPointerDown={handleMouseResizeDown}>

        </div>
    )
}