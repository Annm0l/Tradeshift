package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.Portfolio;
import java.util.List;
import java.util.Optional;

public interface PortfolioService {
    Portfolio savePortfolio(Portfolio portfolio);            // Save a new portfolio
    List<Portfolio> getAllPortfolios();                     // Get all portfolios
    Optional<Portfolio> getPortfolioById(Long id);         // Get portfolio by ID
    Portfolio updatePortfolio(Long id, Portfolio portfolio); // Update portfolio
    void deletePortfolio(Long id);                          // Delete portfolio
}
