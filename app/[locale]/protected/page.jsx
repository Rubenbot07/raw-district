

export default async function ProtectedPage() {


  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Protected</h2>
          <p className="text-gray-500">
            This page is protected. You need to be logged in to see it.
          </p>
        </div>
      </div>
    </div>
  );
}
