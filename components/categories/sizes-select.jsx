'use client';
import { useTranslations } from 'next-intl';

export const SizesSelect = ({ sizes, selectedSize, onSelectSize }) => {
  const t = useTranslations('Sizes');
  return (
    <fieldset className="flex justify-between max-w-xs" role="radiogroup" aria-label="Select a size">
      <legend className="sr-only">{t('sizeOptions')}</legend>
      <div>
        <p className="text-xs font-semibold">{t('sizeName')}</p>
        <p className="text-[10px] font-medium" id="selected-size-label">
          {selectedSize?.size || 'None selected'}
        </p>
      </div>

      <div className="flex gap-2 px-4">
        {sizes.map((size) => {
          const isSelected = selectedSize?.id === size.id;
          return (
            <button
              key={size.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={size.stock <= 0}
              disabled={size.stock <= 0}
              onClick={() => onSelectSize(size)}
              className={`w-10 border-[1px] border-black text-xs inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded
                ${
                  isSelected
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                } 
                ${size.stock <= 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {size.size}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};