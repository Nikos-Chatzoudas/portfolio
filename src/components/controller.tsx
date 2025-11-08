import "98.css";
interface ControllerProps {
    onReset: () => void | null;
    onPartyToggle: () => void;
    isPartyMode: boolean;
}

export default function Controller({ onReset, onPartyToggle, isPartyMode }: ControllerProps) {
    return (
        <div className="controller">
            <button onClick={onReset} className='win98-button'>
                zoom
            </button>
            <button
                onClick={onPartyToggle}
                className={`win98-button ${isPartyMode ? 'active' : ''}`}
            >party
            </button>
        </div>
    );
}
