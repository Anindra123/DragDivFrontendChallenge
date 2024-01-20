
interface TopRightBorderProps {
    parentSize: { width: number, height: number },
    parentPosition: { x: number, y: number },
    handleMouseResizeDown: (e: React.PointerEvent<HTMLDivElement>) => void,
}
export default function TopRightBorder(
    { parentPosition, parentSize, handleMouseResizeDown }: TopRightBorderProps
) {

    return (
        <div className="wrapper-border" id='top-right'
            style={
                {
                    width: `50px`,
                    height: `50px`,
                    top: `${parentPosition.y - 1}px`,
                    left: `${parentSize.width + parentPosition.x - 51}px`,

                }} onPointerDown={handleMouseResizeDown}>

        </div>
    )
}