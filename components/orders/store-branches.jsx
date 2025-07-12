export const StoreBranches = () => {
    return (
        <section className="flex flex-col gap-3">
            <h2>Store Branches</h2>
            <p className="text-gray-500 font-light">There is 1 store with stock</p>
            <div className="flex justify-between border-[1px] border-black rounded-[8px] p-4">
                <div>
                    <h4 className="font-semibold text-sm">Melonn Dosquebradas</h4>
                    <p className="text-xs text-gray-500">Calle 18a #69f-16, INDUSTRIAL ZONE, Bogotá DC</p>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-xs text-gray-500">It is usually ready in 4 hours</p>
                </div>
                <div>
                    <span>FREE</span>
                </div>
            </div>
        </section>
    )
}