package com.tradeshift.tradeshift.controller;

import com.tradeshift.tradeshift.model.Portfolio;
import com.tradeshift.tradeshift.service.PortfolioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    //  Get all portfolios
    @GetMapping
    public List<Portfolio> getAllPortfolios() {
        return portfolioService.getAllPortfolios();
    }

    //  Create a new portfolio
    @PostMapping
    public Portfolio createPortfolio(@RequestBody Portfolio portfolio) {
        return portfolioService.savePortfolio(portfolio);
    }

    //  Get portfolio by ID
    @GetMapping("/{id}")
    public Portfolio getPortfolioById(@PathVariable Long id) {
        return portfolioService.getPortfolioById(id)
                .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + id));
    }

    // Update portfolio
    @PutMapping("/{id}")
    public Portfolio updatePortfolio(@PathVariable Long id, @RequestBody Portfolio portfolio) {
        return portfolioService.updatePortfolio(id, portfolio);
    }

    //  Delete portfolio
    @DeleteMapping("/{id}")
    public String deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
        return "Portfolio deleted successfully!";
    }
}
