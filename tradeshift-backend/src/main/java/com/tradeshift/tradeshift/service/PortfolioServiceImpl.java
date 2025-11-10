package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.Portfolio;
import com.tradeshift.tradeshift.repository.PortfolioRepository;
import com.tradeshift.tradeshift.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioServiceImpl implements PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Override
    public Portfolio savePortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    @Override
    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    @Override
    public Optional<Portfolio> getPortfolioById(Long id) {
        return portfolioRepository.findById(id);
    }

    @Override
    public Portfolio updatePortfolio(Long id, Portfolio portfolio) {
        Portfolio existingPortfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found with id: " + id));

        existingPortfolio.setName(portfolio.getName());
        existingPortfolio.setDescription(portfolio.getDescription());
        existingPortfolio.setValue(portfolio.getValue());

        return portfolioRepository.save(existingPortfolio);
    }

    @Override
    public void deletePortfolio(Long id) {
        portfolioRepository.deleteById(id);
    }
}
