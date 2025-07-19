'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
export const SearchPageInput = ({query}) => {
    const [input, setInput] = useState(query)
    const router = useRouter()
    const handleSearch = () => {
        if(input === query) return
        if (input.length > 0) {
            router.push(`/search?query=${input}&limit=8`);
        }
    };

    return (
        <div className="flex justify-between max-w-xl w-full mx-auto p-4">
            <div className="w-full flex justify-between py-2 px-4 border-[1px] border-r-0 border-gray-300 text-xs">
                <input type="text" className="outline-none w-3/4" placeholder="Search products" value={input} onChange={(e) => setInput(e.target.value)} />
                {input.length > 0 && <button className="text-[10px]" onClick={() => setInput('')}>CLEAR</button>}
            </div>
            <button className="bg-black py-2 px-4" onClick={handleSearch}><Search  color="white" /></button>
        </div>
    )
}