export default function Loading() {
    return (
    <section className="bg-white h-auto w-auto flex flex-col gap-7 lg:border-r-[1px] p-4 animate-pulse">
      {/* Account */}
      <div className="flex flex-col gap-2 border-b-[1px] border-gray-400 py-3">
        <div className="h-4 w-20 bg-gray-300 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>

      {/* Delivery Options */}
      <div className="flex flex-col gap-2">
        <div className="h-5 w-24 bg-gray-300 rounded" />
        <div className="space-y-2">
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Address form OR store branches */}
      <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-[8px]">
        <div className="h-4 w-28 bg-gray-300 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-300 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>

      {/* Payment */}
      <div className="flex flex-col gap-3">
        <div className="h-5 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-64 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-100 border border-gray-300 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-100 border border-gray-300 rounded" />
      </div>

      {/* Summary cart */}
      <div className="flex flex-col gap-2">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="h-16 bg-gray-200 rounded" />
        ))}
      </div>

      {/* Summary detail (mobile) */}
      <div className="lg:hidden flex flex-col gap-2">
        <div className="h-4 w-32 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-28 bg-gray-300 rounded" />
      </div>

      {/* Buy now button */}
      <div className="h-12 bg-gray-300 rounded" />
    </section>
    );
}