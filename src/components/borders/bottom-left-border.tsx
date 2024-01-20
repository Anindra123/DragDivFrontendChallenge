interface BottomLeftBorderProps {
    parentSize: { width: number, height: number },
    parentPosition: { x: number, y: number },
    handleMouseResizeDown: (e: React.PointerEvent<HTMLDivElement>) => void,
}

export default function BottomLeftBorder(
    { parentSize, parentPosition, handleMouseResizeDown }: BottomLeftBorderProps
) {
    return (
        <div className="wrapper-border" id='bottom-left'
            style={
                {
                    width: `50px`,
                    height: `50px`,
                    top: `${parentSize.height + parentPosition.y - 51}px`,
                    left: `${parentPosition.x - 1}px`,

                }} onPointerDown={handleMouseResizeDown}>

        </div>
    )
}