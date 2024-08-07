export default function SubmitButton({ children }) {
    return (
        <button
            type="submit"
            className="bg-[#00b4b9] hover:bg-[#1e2636] focus:bg-[#1e2636] h-[60px] text-white w-full rounded-xl"
        >
            {children}
        </button>
    );
}