interface BottomRightBorderProps {
    parentSize: { width: number, height: number },
    parentPosition: { x: number, y: number },
    handleMouseResizeDown: (e: React.PointerEvent<HTMLDivElement>) => void,
}


export default function BottomRightBorder(
    { parentSize, parentPosition, handleMouseResizeDown }: BottomRightBorderProps
) {
    return (
        <div className="wrapper-border" id='bottom-right'
            style={
                {
                    width: `50px`,
                    height: `50px`,
                    top: `${parentSize.height + parentPosition.y - 51}px`,
                    left: `${parentSize.width + parentPosition.x - 51}px`,

                }} onPointerDown={handleMouseResizeDown}>

        </div>
    )
}