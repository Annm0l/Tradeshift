package com.tradeshift.tradeshift.controller;

import com.tradeshift.tradeshift.model.PortfolioSummary;
import com.tradeshift.tradeshift.service.PortfolioSummaryService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PortfolioSummaryController {

    private final PortfolioSummaryService portfolioSummaryService;

    public PortfolioSummaryController(PortfolioSummaryService portfolioSummaryService) {
        this.portfolioSummaryService = portfolioSummaryService;
    }

    @GetMapping("/summary")
    public PortfolioSummary getPortfolioSummary() {
        return portfolioSummaryService.getSummary();
    }
}
