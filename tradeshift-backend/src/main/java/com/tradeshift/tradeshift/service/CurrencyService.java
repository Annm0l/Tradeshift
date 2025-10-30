package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.Currency;
import java.util.List;
import java.util.Optional;

public interface CurrencyService {
    Currency addCurrency(Currency currency);
    List<Currency> getAllCurrencies();
    Optional<Currency> getCurrencyById(Long id);
    Currency updateCurrency(Long id, Currency currency);
    void deleteCurrency(Long id);
}
