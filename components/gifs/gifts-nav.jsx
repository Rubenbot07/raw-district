'use client'
import { useState } from "react";
export const GiftsNav = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative cursor-pointer">Gifts</span>
            <span className={`absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left transition-transform duration-300 ${
                isHovered ? "scale-x-100" : "scale-x-0"
                }`}>
            </span>
            <ul className={`${isHovered ? 'opacity-100' : 'opacity-0'} text-xs flex flex-col gap-3 absolute w-max top-8 bg-white z-50  py-6 px-4 transition-opacity duration-300 ease-in-out`}>
                <li className="relative group w-fit">
                    <span>
                        Gift cards    
                    </span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </li>
                <li className="relative group w-fit">
                    <span>
                        Less than $200.000    
                    </span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </li>
                <li className="relative group w-fit">
                    <span>
                        less than $300.000    
                    </span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </li>
                <li className="relative group w-fit">
                    <span>
                        Less than $400.000    
                    </span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </li>
            </ul>
        </div>
    );
}