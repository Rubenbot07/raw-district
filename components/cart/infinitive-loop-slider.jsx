import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
export const InfinitiveLoopSlider = ({ productImages }) => {
    const [currentIndexImage, setCurrentIndexImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handlePrev = () => {
        setCurrentIndexImage((prevIndex) => (prevIndex === 0 ? productImages.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndexImage((prevIndex) => (prevIndex === productImages.length - 1 ? 0 : prevIndex + 1));
    };
    return (
        <div 
            className="relative overflow-hidden hidden md:block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full h-auto overflow-hidden mb-4">
                <img
                src={productImages[currentIndexImage].thumbnail_url}
                alt={`Slide ${currentIndexImage + 1}`}
                className="w-full h-full object-cover"
                />
            </div>

            <div className="flex justify-between w-full px-2 absolute top-1/2">
                <button
                onClick={handlePrev}
                className={`px-2 py-2 bg-white rounded hover:bg-gray-300 transform -translate-x-20 transition-transform duration-300 ease-in-out ${isHovered ? 'translate-x-2' : ''}`}
                >
                <ArrowLeft />
                </button>
                <button
                onClick={handleNext}
                className={`px-2 py-2 bg-white rounded hover:bg-gray-300 transform translate-x-20 transition-transform duration-300 ease-in-out ${isHovered ? '-translate-x-2' : ''}`}
                >
                <ArrowRight />
                </button>
            </div>
        </div>
    )
};