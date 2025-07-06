import { useState } from "react";
export const InfinitiveLoopSlider = ({ productImages }) => {
    const [currentIndexImage, setCurrentIndexImage] = useState(0);

    const handlePrev = () => {
        setCurrentIndexImage((prevIndex) => (prevIndex === 0 ? productImages.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndexImage((prevIndex) => (prevIndex === productImages.length - 1 ? 0 : prevIndex + 1));
    };
    return (
        <div className="flex flex-col items-center">
            <div className="w-64 h-64 overflow-hidden mb-4">
                <img
                src={productImages[currentIndexImage].image_url}
                alt={`Slide ${currentIndexImage + 1}`}
                className="w-full h-full object-cover rounded-xl"
                />
            </div>

            <div className="flex gap-4">
                <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                Prev
                </button>
                <button
                onClick={handleNext}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                Next
                </button>
            </div>
        </div>
    )
};