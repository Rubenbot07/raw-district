'use client'
import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

export const ProductImageSlider = ({ productImages, productName }) => {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className="md:hidden w-full p-4 flex flex-col gap-4">
      {/* Imagen principal */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={productImages[currentImage].image_url}
              alt={productName}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Miniaturas */}
      <div className="flex gap-4 justify-center">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className="cursor-pointer"
            aria-label={`Product image ${index + 1} of ${productImages.length}`}
          >
            {/* aria-hidden evita que screen reader lea alt repetido */}
            <img
              src={image.thumbnail_url}
              alt={productName}
              aria-hidden="true"
            />
            <div
              className={`${
                currentImage === index ? 'border-gray-400' : 'border-none'
              } border-2 mt-2`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  )
}