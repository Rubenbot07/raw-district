import Link from 'next/link';
export const PopularSearches = ({onClose}) => {
    return (
        <div className='md:w-1/3 py-3'>
                <p className='py-1 border-b-[1px] border-gray-300'>Popular searches</p>
                <ul className='flex flex-col gap-2 py-4'>
                    <li onClick={onClose}>
                        <Link href='/category/t-shirts'>T-shirts</Link>
                    </li>
                    <li onClick={onClose}>
                        <Link href='/category/hoodies'>Hoodies</Link>
                    </li>
                    <li onClick={onClose}>
                        <Link href='/category/caps'>Caps</Link>
                    </li>
                </ul>
            </div>
    )
};