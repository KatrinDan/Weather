
function Search({ city, setCity, onSearch }: { city: string; setCity: (city: string) => void; onSearch: () => void }) {
    return (
        <div className="search">
            <input  
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    );
}
export default Search;