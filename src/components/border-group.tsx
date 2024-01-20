import BottomBorder from "./borders/bottom-border";
import BottomLeftBorder from "./borders/bottom-left-border";
import BottomRightBorder from "./borders/bottom-right-border";
import LeftBorder from "./borders/left-border";
import RightBorder from "./borders/right-border";
import TopBorder from "./borders/top-border";
import TopLeftBorder from "./borders/top-left-border";
import TopRightBorder from "./borders/top-right-border";

interface BorderGroupProps {
    parentSize: { width: number, height: number },
    parentPosition: { x: number, y: number },
    handleMouseResizeDown: (e: React.PointerEvent<HTMLDivElement>) => void,
}


export default function BorderGroup(
    { parentPosition, parentSize, handleMouseResizeDown }: BorderGroupProps
) {
    return (
        <>
            <RightBorder
                parentPosition={parentPosition}
                parentSize={parentSize}
                handleMouseResizeDown={handleMouseResizeDown}
            />

            <BottomBorder
                parentPosition={parentPosition}
                parentSize={parentSize}
                handleMouseResizeDown={handleMouseResizeDown} />

            <BottomRightBorder
                parentPosition={parentPosition}
                parentSize={parentSize}
                handleMouseResizeDown={handleMouseResizeDown}
            />

            <TopRightBorder
                parentPosition={parentPosition}
                parentSize={parentSize}
                handleMouseResizeDown={handleMouseResizeDown}
            />
            <TopLeftBorder
                parentPosition={parentPosition}

                handleMouseResizeDown={handleMouseResizeDown}

            />
            <BottomLeftBorder
                parentSize={parentSize}
                parentPosition={parentPosition}
                handleMouseResizeDown={handleMouseResizeDown} />
            <TopBorder
                parentSize={parentSize}
                parentPosition={parentPosition}
                handleMouseResizeDown={handleMouseResizeDown}
            />
            <LeftBorder
                parentSize={parentSize}
                parentPosition={parentPosition}
                handleMouseResizeDown={handleMouseResizeDown}
            />

        </>
    )
}