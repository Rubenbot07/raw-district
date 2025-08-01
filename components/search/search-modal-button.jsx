import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
export const SearchModalButton = ({ onClose, query }) => {
    const router = useRouter();
    const handleSearch = () => {
        onClose();
        if (query.trim()) {
            router.push(`/search?query=${query}`);
        }
    };

    return (
        <>
            {query.length > 0 && (    
                <button onClick={handleSearch} className="flex items-center gap-2 px-4 py-2 border-[1px] border-black">
                    <span>Search "{query}"</span>
                    <span><ArrowRight size={10}/></span>
                </button>
            )}
        </>
    )
}