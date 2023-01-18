import { useState, useEffect, useCallback } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const onMoneyChange = (event) => {
    event.preventDefault();
    setMoney(event.target.value);
  };
  const onCoinSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value.toLowerCase());
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  useEffect(
    () =>
      setResult(
        coins.filter((coin) => {
          return coin.name.toLowerCase().includes(search.toLowerCase());
        })
      ),
    [coins, search]
  );
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input
            type="number"
            placeholder="Enter amount of USD"
            onChange={onMoneyChange}
          />
          <br />
          <input
            type="text"
            placeholder="Search coin"
            onChange={onCoinSearch}
          />
          {search ? (
            <ul>
              {result.map((coin) => {
                return (
                  <li>
                    {coin.name}({coin.symbol}): ${money / coin.quotes.USD.price}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul>
              {coins.map((coin) => {
                return (
                  <li>
                    {coin.name}({coin.symbol}): ${money / coin.quotes.USD.price}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
