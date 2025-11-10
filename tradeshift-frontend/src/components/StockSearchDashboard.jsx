import React, { useEffect, useRef, useState } from "react";

export default function StockSearchDashboard() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const debounceRef = useRef(null);

  // ✅ Enable Finnhub live data
  const USE_FINNHUB = true;

  // 🔍 Fetch stock suggestions from Finnhub
  async function fetchSymbolsFromFinnhub(query) {
    const key = process.env.REACT_APP_FINNHUB_KEY;
    if (!key) throw new Error("Missing REACT_APP_FINNHUB_KEY");
    const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${key}`;
    const res = await fetch(url);
    const json = await res.json();

    // limit results to top 8
    const symbols = (json.result || []).slice(0, 8);

    // Get company logos for each
    const detailed = await Promise.all(
      symbols.map(async (s) => {
        const logo = await fetchCompanyLogo(s.symbol);
        return {
          symbol: s.symbol,
          description: s.description,
          logo,
        };
      })
    );

    return detailed;
  }

  // 🧩 Fallback (offline)
  function mockSearch(query) {
    const db = [
      {
        symbol: "AAPL",
        description: "Apple Inc.",
        logo: "https://logo.clearbit.com/apple.com",
      },
      {
        symbol: "MSFT",
        description: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
      },
      {
        symbol: "TCS",
        description: "Tata Consultancy Services",
        logo: "https://logo.clearbit.com/tcs.com",
      },
    ];

    const q = query.trim().toLowerCase();
    return new Promise((resolve) => {
      const results = q
        ? db.filter(
            (d) =>
              d.symbol.toLowerCase().includes(q) ||
              d.description.toLowerCase().includes(q)
          )
        : [];
      setTimeout(() => resolve(results), 200);
    });
  }

  // 🏢 Fetch company logo
  async function fetchCompanyLogo(symbol) {
    try {
      const key = process.env.REACT_APP_FINNHUB_KEY;
      const res = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${key}`
      );
      const data = await res.json();
      return data.logo || "https://via.placeholder.com/32";
    } catch {
      return "https://via.placeholder.com/32";
    }
  }

  // 📈 Fetch live price
  async function fetchLivePrice(symbol) {
    try {
      const key = process.env.REACT_APP_FINNHUB_KEY;
      const formatted =
        symbol === "TCS"
          ? "TCS.NS"
          : symbol === "INFY"
          ? "INFY.NS"
          : symbol.endsWith(".NS") || symbol.endsWith(".BO")
          ? symbol
          : symbol;
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${formatted}&token=${key}`
      );
      const data = await res.json();
      return {
        price: data.c,
        change: data.d,
        percent: data.dp,
      };
    } catch {
      return null;
    }
  }

  // 🔁 Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(() => {
      (USE_FINNHUB ? fetchSymbolsFromFinnhub(query) : mockSearch(query))
        .then((res) => {
          setSuggestions(res);
          setOpen(true);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // 🎯 Select a stock
  async function handleSelect(stock) {
    setQuery(`${stock.symbol} — ${stock.description}`);
    setOpen(false);
    setSelectedStock({ ...stock, price: "Loading..." });

    const priceData = await fetchLivePrice(stock.symbol);
    setSelectedStock({
      ...stock,
      price: priceData ? priceData.price : "N/A",
      change: priceData ? priceData.change : 0,
      percent: priceData ? priceData.percent : 0,
    });
  }

  return (
    <div className="max-w-xl mx-auto p-4 text-gray-900 dark:text-gray-100 transition-all duration-500 relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Search Stocks
      </label>

      <div className="relative flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError(null);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Type stock name or symbol (e.g. TCS, AAPL)"
          className="w-full rounded-md border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          🔍
        </button>
      </div>

      {loading && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Searching...</p>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {open && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white dark:bg-gray-900 border dark:border-gray-700 mt-2 rounded-md shadow-lg w-full max-h-60 overflow-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
            >
              <img
                src={s.logo || "https://via.placeholder.com/32"}
                alt="logo"
                className="w-8 h-8 rounded-full border dark:border-gray-600"
              />
              <div className="flex-1">
                <strong className="block text-gray-800 dark:text-gray-200">
                  {s.symbol}
                </strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 📊 Selected stock details */}
      {selectedStock && (
        <div className="mt-6 bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
          <img
            src={selectedStock.logo || "https://via.placeholder.com/64"}
            alt="logo"
            className="mx-auto w-12 h-12 rounded-full border dark:border-gray-600 mb-3"
          />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {selectedStock.description} ({selectedStock.symbol})
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ₹ {Number(selectedStock.price).toFixed(2)}
          </p>
          <p
            className={`mt-1 text-sm font-medium ${
              selectedStock.change >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {selectedStock.change >= 0 ? "▲" : "▼"} {selectedStock.change} (
            {selectedStock.percent}%)
          </p>
        </div>
      )}
    </div>
  );
}
