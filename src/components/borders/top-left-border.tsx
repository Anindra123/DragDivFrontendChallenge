interface TopLeftBorderProps {
    parentPosition: { x: number, y: number },
    handleMouseResizeDown: (e: React.PointerEvent<HTMLDivElement>) => void,
}

export default function TopLeftBorder(
    { parentPosition, handleMouseResizeDown }: TopLeftBorderProps
) {
    return (
        <div className="wrapper-border" id='top-left'
            style={
                {
                    width: `50px`,
                    height: `50px`,
                    top: `${parentPosition.y - 1}px`,
                    left: `${parentPosition.x - 1}px`,

                }} onPointerDown={handleMouseResizeDown}>

        </div>
    )
}