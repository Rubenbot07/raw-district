import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
export const GiftsNavMobile = ({onOpen}) => {
    const priceFilters = [200000, 300000, 400000];
    const [isOpen, setIsOpen] = useState(false);
    const [rotate, setRotate] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
        setRotate(!rotate);
    };
    return (
        <div>
            <div className="cursor-pointer flex items-center gap-2 relative group" onClick={handleToggle}>
                <span className="flex items-center gap-1">
                    Gifts
                </span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${rotate ? 'rotate-180' : ''}`} />
            </div>
            <ul className={`flex flex-col gap-2 text-xs h-0 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 h-fit p-4' : 'opacity-0'}`}>
                <li className="relative group w-fit">
                    <Link href="/gifts?type=gift-cards">
                    Gift cards
                    </Link>
                    <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </li>
                {
                    priceFilters.map(price => (
                        <li onClick={onOpen} key={price} className={`${isOpen ? 'opacity-100' : 'opacity-0'} relative group w-fit`}>
                            <Link href={`/gifts?price_lt=${price}`}>
                                Less than ${price.toLocaleString()}
                            </Link>
                            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                        </li>   
                ))
                }
            </ul>
        </div>
    )
}