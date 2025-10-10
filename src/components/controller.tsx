

export default function Controller({ onReset }: { onReset: () => void | null }) {
    return (
        <div className="controller">
            <button onClick={onReset} className='win98-button'>   Zoom</button>
        </div>
    );
}
