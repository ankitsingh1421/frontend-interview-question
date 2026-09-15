import "./App.css";
import Autocomplete from "./components/autocomplete";

function App() {

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };

  return (
    <main className="app-shell">
      <section className="search-hero" aria-labelledby="page-title">
        <div className="eyebrow">Recipe finder</div>
        <h1 id="page-title">What are you craving?</h1>
        <p className="intro-copy">
          Search thousands of recipes and find your next delicious idea.
        </p>

        <Autocomplete
          placeholder={"Try \"chicken curry\" or \"pasta\""}
          // staticData={staticData}
          fetchSuggestions={fetchSuggestions}
          dataKey={"name"}
          customLoading={<>Finding recipes...</>}
          onSelect={(res) => console.log(res)}
          caching={true}
          onChange={() => {}}
          onBlur={() => {}}
          onFocus={() => {}}
          customStyles={{}}
        />

        <div className="search-note">
          <span className="status-dot" aria-hidden="true" />
          Suggestions appear as you type
        </div>
      </section>

      <footer className="page-footer">
        <span className="footer-mark" aria-hidden="true">✦</span>
      </footer>
    </main>
  );
}

export default App;
