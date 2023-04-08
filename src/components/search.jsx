const Search = (props) => {
    return (
        <div className="inp">
            <h1 className="head1">Weather App</h1>
            <div className="inp-enter">
                <input className="ser-inp"
                onChange={(e) => {
                    props.setSearch(e.target.value);
                }}
                type="search"
                placeholder="Enter city name"
                />
                <button className="enter"
                onClick={props.searchCity}>Search</button>
            </div>
        </div>
    );
};

export default Search;