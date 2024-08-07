export default function InputField({ name, type, placeholder, value, onChange, onBlur, error, touched }) {
    return (
        <div className="flex flex-col">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`placeholder-[#000] bg-slate-100 rounded-xl w-full h-[60px] focus:outline-none px-6 ${touched && error ? 'bg-red-50' : ''
                    }`}
            />
            {touched && error && (
                <div className="text-red-500 text-sm mt-1 px-2">{error}</div>
            )}
        </div>
    );
}