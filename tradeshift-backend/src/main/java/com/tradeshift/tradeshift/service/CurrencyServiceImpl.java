package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.Currency;
import com.tradeshift.tradeshift.repository.CurrencyRepository;
import com.tradeshift.tradeshift.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyServiceImpl implements CurrencyService {

    @Autowired
    private CurrencyRepository currencyRepository;

    @Override
    public Currency addCurrency(Currency currency) {
        return currencyRepository.save(currency);
    }

    @Override
    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }

    @Override
    public Optional<Currency> getCurrencyById(Long id) {
        return currencyRepository.findById(id);
    }

    @Override
    public Currency updateCurrency(Long id, Currency updatedCurrency) {
        Optional<Currency> existingCurrency = currencyRepository.findById(id);
        if (existingCurrency.isPresent()) {
            Currency currency = existingCurrency.get();
            currency.setName(updatedCurrency.getName());
            currency.setCode(updatedCurrency.getCode());
            currency.setSymbol(updatedCurrency.getSymbol());
            return currencyRepository.save(currency);
        }
        throw new RuntimeException("Currency not found with id: " + id);
    }

    @Override
    public void deleteCurrency(Long id) {
        currencyRepository.deleteById(id);
    }
}
