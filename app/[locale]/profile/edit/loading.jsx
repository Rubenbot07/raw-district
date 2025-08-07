export default function Loading() {
    return (
    <section className="animate-pulse p-4">
      <div className="flex flex-col gap-4">
        {/* Card de inputs */}
        <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-[8px] text-sm">
          {/* Address */}
          <div>
            <div className="h-4 bg-gray-300 rounded w-20 mb-1" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>

          {/* Phone */}
          <div>
            <div className="h-4 bg-gray-300 rounded w-20 mb-1" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Botón */}
        <div className="bg-gray-200 text-white py-2 text-center rounded-[8px] self-start w-32 h-10" />
      </div>
    </section>
    );
}