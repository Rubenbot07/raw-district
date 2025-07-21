export const ProductsLayout = ({ children }) => {
    return (      
        <div className='mx-auto max-w-[1700px] xl:max-w-[2000px] px-4'>
            <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 px-2 mx-auto gap-4 '>
                {children}
            </ul>
        </div>
    )
}