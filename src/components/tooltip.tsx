export default function Tooltip({ tooltipTitle
    , isVisible }: {
        tooltipTitle: string
        , isVisible: boolean
    }) {
    return (
        <div style={{
            width: "100px", height: "30px",
            borderRadius: ".5rem",
            backgroundColor: "black", visibility: `${isVisible ? "visible" : "hidden"}`,
            transition: "all 0.3s ease",
            opacity: `${isVisible ? "100%" : "0%"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"

        }}>
            <p style={{ color: 'white', fontSize: ".8rem", fontWeight: "bold", margin: 0 }}>
                {tooltipTitle}
            </p>
        </div>
    )
}