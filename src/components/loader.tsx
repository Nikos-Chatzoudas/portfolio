import React from "react";
import "98.css";

export default function Loader({ progress }: { progress: number }) {
    const messages = [
        "Asking your toaster nicely to run this site",
        "Enabling potato hyperdrive",
        "Setting fans to jet engine mode",
        "Convincing the internet hamsters to run faster",
        "Negotiating with the Wi-Fi goblins",
        "Brewing extra RAM in the background",
        "Teaching electrons how to sprint",
        "Polishing the pixels for maximum shine",
        "Whispering encouragement to the progress bar",
        "Untangling the fiber-optic spaghetti",
        "Downloading more internet from the cloud",
        "Herding stray bits back into the server",
        "Updating the laws of physics — please wait…",
        "Warming up the quantum flux capacitor",
        "Asking AI nicely not to unionize",
        "Summoning extra bandwidth through dark magic",
    ];

    const message = React.useMemo(
        () => messages[Math.floor(Math.random() * messages.length)],
        []
    );

    return (
        <div style={overlayStyle}>
            <div style={{ scale: "1" }}>
                <div className="window" style={{ width: 300, marginTop: 20 }}>
                    <div className="title-bar">
                        <div className="title-bar-text">Loading Portfolio</div>
                        <div className="title-bar-controls">
                            <button aria-label="Minimize"></button>
                            <button aria-label="Maximize"></button>
                            <button aria-label="Close"></button>
                        </div>
                    </div>
                    <div className="window-body">
                        <div >
                            <p>{message}</p>
                            <div className="progress-indicator segmented">
                                <span className="progress-indicator-bar" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
    zIndex: 9999,
    pointerEvents: "all",
};

const boxStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    padding: "24px 36px",
    borderRadius: 10,
    background: "rgba(0, 0, 0, 0.5)",
};
