package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.AllocationResponse;
import com.tradeshift.tradeshift.model.Asset;
import com.tradeshift.tradeshift.model.TrendPoint;
import com.tradeshift.tradeshift.model.User;
import com.tradeshift.tradeshift.repository.AssetRepository;
import com.tradeshift.tradeshift.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class AnalyticsService {

    private final AssetRepository assetRepository;
    private final UserRepository userRepository;

    public AnalyticsService(AssetRepository assetRepository, UserRepository userRepository) {
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Allocation by type
    public AllocationResponse allocation() {
        User user = currentUser();
        List<Asset> assets = assetRepository.findByUser(user);

        Map<String, BigDecimal> map = new HashMap<>();
        BigDecimal total = BigDecimal.ZERO;

        for (Asset a : assets) {
            BigDecimal v = BigDecimal.valueOf(a.getValue());
            String type = (a.getType() != null && !a.getType().isBlank()) ? a.getType() : "OTHER";
            map.put(type, map.getOrDefault(type, BigDecimal.ZERO).add(v));
            total = total.add(v);
        }
        return new AllocationResponse(total, map);
    }

    // Trend series
    public List<TrendPoint> trend(int days) {
        if (days <= 0) days = 30;
        User user = currentUser();
        List<Asset> assets = assetRepository.findByUser(user);

        BigDecimal total = BigDecimal.ZERO;
        for (Asset a : assets) total = total.add(BigDecimal.valueOf(a.getValue()));

        List<TrendPoint> series = new ArrayList<>(days);
        LocalDate today = LocalDate.now();
        for (int i = days - 1; i >= 0; i--) {
            series.add(new TrendPoint(today.minusDays(i), total));
        }
        return series;
    }
}
