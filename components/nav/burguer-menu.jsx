import { useState } from "react"
import { GiftsNavMobile } from "./gifts-nav-mobile"
import { AlignJustify, X } from "lucide-react"
export const BurguerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            {isOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                onClick={() => setIsOpen(false)}
                aria-label="Close cart overlay"
            />
            )}
            <AlignJustify size={20} className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}/>
            <div className={`fixed top-0 left-0 z-50 transform transition-all duration-500 ease-in-out w-full h-1/5 min-h-72  bg-white shadow-lg p-8 rounded-md ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <X size={20} className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsOpen(false)}/>
                <ul className="flex flex-col gap-4 cursor-pointer">
                    <li className="relative w-fit">
                            <GiftsNavMobile onOpen={() => setIsOpen(false)}/>
                            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="relative group w-fit">
                            <span>About</span>
                            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                    <li className="relative group w-fit">
                            <span>Brand</span>
                            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </li>
                </ul>
            </div> 
        </div>
    )
}