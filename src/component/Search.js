const Search = ({ cityName, setCityName, handleSubmit }) => {
  return (
    <div>
      <div className="weather-title">Weather Forecast</div>
      <div className="search">
        <input
          type="search"
          placeholder="enter city name"
          name="cityName"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};
export default Search;
