export default function Button({ text, onClick }) {
    return (
        <button
            className="bg-[#00b4b9] text-white px-4 py-2 rounded hover:bg-[#008c8f]"
            onClick={onClick}
        >
            {text}
        </button>
    );
}