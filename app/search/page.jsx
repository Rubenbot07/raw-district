export default async function Page({ searchParams }) {
    const {query } = await searchParams || '';
    console.log(query)
    return (
        <div>
            <h1>Search</h1>
        </div>
    );
}