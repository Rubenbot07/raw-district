
export const SelectableOptions = ({name, text, value, setValue, children, position}) => {
    return (
        <div onClick={() => setValue(name)} className={`p-3 flex justify-between cursor-pointer border-[1px]  rounded-[8px] ${position === 'top' ? ' rounded-br-none rounded-bl-none' : (position === 'bottom') ? 'rounded-tr-none rounded-tl-none' : 'rounded-none'} ${value === name ? 'border-black' : 'border-gray-400'}`}>
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                name={name}
                value={name}
                className="hidden peer"
                checked={value === name}
                onChange={() => setValue(name)}
            />
            <span
                className="w-4 h-4 rounded-full border-[1px] bg-white border-gray-400 flex items-center justify-center peer-checked:border-black peer-checked:bg-black"
            >
                <span
                    className="w-2 h-2 bg-white rounded-full transition-transform"
                ></span>
            </span>
                {text}
            </label>
            <span>{children}</span>
        </div>
    )
};