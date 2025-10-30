package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.Asset;
import com.tradeshift.tradeshift.model.PortfolioSummary;
import com.tradeshift.tradeshift.model.User;
import com.tradeshift.tradeshift.repository.AssetRepository;
import com.tradeshift.tradeshift.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PortfolioSummaryService {

    private final AssetRepository assetRepository;
    private final UserRepository userRepository;

    public PortfolioSummaryService(AssetRepository assetRepository, UserRepository userRepository) {
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    //  get current authenticated user
    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public PortfolioSummary getSummary() {
        User user = currentUser();
        List<Asset> assets = assetRepository.findByUser(user);

        BigDecimal totalInvested = BigDecimal.ZERO;
        BigDecimal currentValue = BigDecimal.ZERO;

        Map<String, BigDecimal> allocationByType = new HashMap<>();

        for (Asset a : assets) {
            BigDecimal value = BigDecimal.valueOf(a.getValue());
            totalInvested = totalInvested.add(value);
            currentValue = currentValue.add(value); // same for now

            String type = (a.getType() != null) ? a.getType() : "OTHER";
            allocationByType.put(type,
                    allocationByType.getOrDefault(type, BigDecimal.ZERO).add(value));
        }

        BigDecimal profitLoss = currentValue.subtract(totalInvested);
        double profitLossPct = totalInvested.compareTo(BigDecimal.ZERO) == 0
                ? 0.0
                : profitLoss.divide(totalInvested, 4, RoundingMode.HALF_UP).doubleValue() * 100;

        return new PortfolioSummary(
                totalInvested,
                currentValue,
                profitLoss,
                profitLossPct,
                assets.size(),
                allocationByType
        );
    }
}
