
export default function Page({ searchParams }) {
  const error = searchParams?.error;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
            <div>
              <div>
                <div className="text-2xl">
                  Sorry, something went wrong.
                </div>
              </div>
              <div>
              {error ? (
                <p className="text-sm text-muted-foreground">
                  Code error: {error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  An unspecified error occurred.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}