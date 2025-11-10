package com.tradeshift.tradeshift.model;

import java.math.BigDecimal;
import java.util.Map;

public class AllocationResponse {
    private BigDecimal total;
    private Map<String, BigDecimal> allocationByType;

    public AllocationResponse() {}

    public AllocationResponse(BigDecimal total, Map<String, BigDecimal> allocationByType) {
        this.total = total;
        this.allocationByType = allocationByType;
    }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public Map<String, BigDecimal> getAllocationByType() { return allocationByType; }
    public void setAllocationByType(Map<String, BigDecimal> allocationByType) { this.allocationByType = allocationByType; }
}
