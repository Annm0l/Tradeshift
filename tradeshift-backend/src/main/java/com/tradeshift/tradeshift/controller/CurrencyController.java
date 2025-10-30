package com.tradeshift.tradeshift.controller;

import com.tradeshift.tradeshift.model.Currency;
import com.tradeshift.tradeshift.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/currencies")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    // Add new currency
    @PostMapping
    public ResponseEntity<?> addCurrency(@RequestBody Currency currency) {
        Currency savedCurrency = currencyService.addCurrency(currency);
        return ResponseEntity.ok(savedCurrency);
    }

    //  Get all currencies
    @GetMapping
    public ResponseEntity<List<Currency>> getAllCurrencies() {
        return ResponseEntity.ok(currencyService.getAllCurrencies());
    }

    //  Get currency by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCurrencyById(@PathVariable Long id) {
        Optional<Currency> currency = currencyService.getCurrencyById(id);
        return currency.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //  Update currency
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCurrency(@PathVariable Long id, @RequestBody Currency updatedCurrency) {
        Currency currency = currencyService.updateCurrency(id, updatedCurrency);
        return ResponseEntity.ok(currency);
    }

    //  Delete currency
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCurrency(@PathVariable Long id) {
        currencyService.deleteCurrency(id);
        return ResponseEntity.ok("Currency deleted successfully");
    }
}
