export const StoreBranches = () => {
  return (
    <section className="flex flex-col gap-3" aria-labelledby="branches-heading">
      <h2 id="branches-heading" className="text-lg font-semibold">Store Branches</h2>
      <p className="text-gray-500 font-light">There is 1 store with stock</p>

      <div
        className="flex justify-between border border-black rounded-[8px] p-4"
        role="group"
        aria-labelledby="store-1-heading"
      >
        <div>
          <h3 id="store-1-heading" className="font-semibold text-sm">
            Melonn Dosquebradas
          </h3>

          <address className="not-italic text-xs text-gray-500 mb-1">
            Calle 18a #69f-16, INDUSTRIAL ZONE, Bogotá DC
          </address>

          <p className="text-xs text-gray-500">
            <span className="sr-only">Phone:</span>
            +57 300 123 4567
          </p>

          <p className="text-xs text-gray-500">
            It is usually ready in 4 hours
          </p>
        </div>

        <div className="self-start">
          <span className="text-sm font-medium">FREE</span>
        </div>
      </div>
    </section>
  );
};