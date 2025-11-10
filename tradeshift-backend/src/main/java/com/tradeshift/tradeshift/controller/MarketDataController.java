package com.tradeshift.tradeshift.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/marketdata")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class MarketDataController {

    private static final Map<String, Double> lastPrices = new HashMap<>();
    private static final Random random = new Random();

    // Generate mock stock prices
    @GetMapping("/{symbol}")
    public Map<String, Object> getStockPrice(@PathVariable String symbol) {
        double base = lastPrices.getOrDefault(symbol, 1000.0);
        double change = (random.nextDouble() - 0.5) * 20; // +/- 10 range
        double price = Math.round((base + change) * 100.0) / 100.0;
        lastPrices.put(symbol, price);

        return Map.of(
                "symbol", symbol,
                "price", price,
                "time", new Date().toString()
        );
    }

    // For multiple symbols
    @GetMapping
    public List<Map<String, Object>> getAllPrices() {
        String[] symbols = {"TCS", "INFY", "RELIANCE", "HDFC", "BTC", "ETH"};
        List<Map<String, Object>> data = new ArrayList<>();
        for (String s : symbols) {
            data.add(getStockPrice(s));
        }
        return data;
    }
}
