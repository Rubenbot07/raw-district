import { useId } from "react";

export const SelectableOptions = ({ name, text, value, setValue, children, position }) => {
  const id = useId(); // genera un id único por opción
  const isSelected = value === name;

  return (
    <div
      onClick={() => setValue(name)}
      role="radio"
      aria-checked={isSelected}
      aria-labelledby={`${id}-label`}
      className={`
        p-3 flex justify-between cursor-pointer border-[1px] rounded-[8px]
        ${position === "top" ? "rounded-br-none rounded-bl-none" : position === "bottom" ? "rounded-tr-none rounded-tl-none" : "rounded-none"}
        ${isSelected ? "border-black" : "border-gray-400"}
      `}
    >
      {/* Etiqueta visual + icono */}
      <div className="flex items-center gap-2" id={`${id}-label`}>
        {/* Marcador personalizado */}
        <span
          className={`
            w-4 h-4 rounded-full border-[1px] flex items-center justify-center
            ${isSelected ? "bg-black border-black" : "bg-white border-gray-400"}
          `}
          aria-hidden="true"
        >
          <span className="w-2 h-2 bg-white rounded-full transition-transform" />
        </span>
        <span>{text}</span>
      </div>

      {/* Icono al lado derecho */}
      <span>{children}</span>
    </div>
  );
};