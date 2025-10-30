package com.tradeshift.tradeshift.controller;

import com.tradeshift.tradeshift.model.AllocationResponse;
import com.tradeshift.tradeshift.model.TrendPoint;
import com.tradeshift.tradeshift.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AnalyticsController {

    private final AnalyticsService analytics;

    public AnalyticsController(AnalyticsService analytics) {
        this.analytics = analytics;
    }

    @GetMapping("/allocation")
    public AllocationResponse allocation() {
        return analytics.allocation();
    }

    @GetMapping("/trend")
    public List<TrendPoint> trend(@RequestParam(defaultValue = "30") int days) {
        return analytics.trend(days);
    }
}
