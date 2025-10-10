import "98.css";
import { useState, useEffect } from 'react';

export default function MP3Player() {
    const [bar1, setBar1] = useState(0);
    const [bar2, setBar2] = useState(0);
    const [bar3, setBar3] = useState(0);
    const [bar4, setBar4] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBar1(Math.floor(Math.random() * 28));
            setBar2(Math.floor(Math.random() * 28));
            setBar3(Math.floor(Math.random() * 28));
            setBar4(Math.floor(Math.random() * 28));
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mp3player">
            <div className="window " >
                <div className="mp3-preview">
                    <div className="info">
                        <p>SongName</p>
                        <p>Artist</p>
                    </div>
                    <div className="bars">
                        <div className="bar" style={{ height: `${bar1}px` }}></div>
                        <div className="bar" style={{ height: `${bar2}px` }}></div>
                        <div className="bar" style={{ height: `${bar3}px` }}></div>
                        <div className="bar" style={{ height: `${bar4}px` }}></div>
                    </div>
                </div>
                <div className="progress-indicator" style={{ height: "17px" }}>
                    <span className="progress-indicator-bar" style={{ width: "40%" }} />
                </div>
                <div className="flex flex-row">

                    <button>▶</button>
                    <button>⏸</button>
                    <button>⏮</button>
                    <button>⏭</button>
                </div>
                <div className="flex flex-row">
                    <button>notin</button>
                    <button>notin</button>
                    <button>notin</button>
                    <button>notin</button>
                </div>


            </div >

        </div >
    );
}
