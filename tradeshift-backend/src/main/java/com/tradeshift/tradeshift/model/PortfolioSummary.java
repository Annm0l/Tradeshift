package com.tradeshift.tradeshift.model;

import java.math.BigDecimal;
import java.util.Map;

public class PortfolioSummary {

    private BigDecimal totalInvested;    // sum of all asset values
    private BigDecimal currentValue;     // same as invested
    private BigDecimal profitLoss;       // current - invested
    private double profitLossPct;        // (P/L) / invested * 100
    private long assetCount;             // number of assets
    private Map<String, BigDecimal> allocationByType; // type -> total value

    public PortfolioSummary() {}

    public PortfolioSummary(BigDecimal totalInvested, BigDecimal currentValue,
                            BigDecimal profitLoss, double profitLossPct,
                            long assetCount, Map<String, BigDecimal> allocationByType) {
        this.totalInvested = totalInvested;
        this.currentValue = currentValue;
        this.profitLoss = profitLoss;
        this.profitLossPct = profitLossPct;
        this.assetCount = assetCount;
        this.allocationByType = allocationByType;
    }

    // Getters & setters
    public BigDecimal getTotalInvested() { return totalInvested; }
    public void setTotalInvested(BigDecimal totalInvested) { this.totalInvested = totalInvested; }

    public BigDecimal getCurrentValue() { return currentValue; }
    public void setCurrentValue(BigDecimal currentValue) { this.currentValue = currentValue; }

    public BigDecimal getProfitLoss() { return profitLoss; }
    public void setProfitLoss(BigDecimal profitLoss) { this.profitLoss = profitLoss; }

    public double getProfitLossPct() { return profitLossPct; }
    public void setProfitLossPct(double profitLossPct) { this.profitLossPct = profitLossPct; }

    public long getAssetCount() { return assetCount; }
    public void setAssetCount(long assetCount) { this.assetCount = assetCount; }

    public Map<String, BigDecimal> getAllocationByType() { return allocationByType; }
    public void setAllocationByType(Map<String, BigDecimal> allocationByType) { this.allocationByType = allocationByType; }
}
