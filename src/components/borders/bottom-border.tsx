interface BottomBorderProps {
    parentSize: { width: number, height: number },
    parentPosition: { x: number, y: number },
    handleMouseResizeDown: (e: React.PointerEvent<HTMLDivElement>) => void,
}
export default function BottomBorder({ parentSize, parentPosition, handleMouseResizeDown }: BottomBorderProps) {


    return (
        <div className='wrapper-border' id='bottom'

            style={{
                width: `${parentSize.width - 50}px`,
                top: `${parentSize.height + parentPosition.y}px`,
                left: `${parentPosition.x + 25}px`,
                height: "1px",
            }}
            onPointerDown={handleMouseResizeDown}
        >
        </div>
    )
}