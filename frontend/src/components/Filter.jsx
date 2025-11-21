const Filter = ({ search, searchResult, handleSearch }) => {
    return (
        <>
            <label htmlFor="search">Search: </label>
            <input id="search" value={search} onChange={handleSearch} />
            {searchResult.map((result) => (
                <p key={result.id}>
                    {result.name} {result.number}
                </p>
            ))}
        </>
    );
};

export default Filter;
