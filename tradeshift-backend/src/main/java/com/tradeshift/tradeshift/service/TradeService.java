package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.Trade;
import com.tradeshift.tradeshift.model.User;
import com.tradeshift.tradeshift.repository.TradeRepository;
import com.tradeshift.tradeshift.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TradeService {

    private final TradeRepository tradeRepository;
    private final UserRepository userRepository;

    public TradeService(TradeRepository tradeRepository, UserRepository userRepository) {
        this.tradeRepository = tradeRepository;
        this.userRepository = userRepository;
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Trade executeTrade(Trade trade) {
        User user = currentUser();
        trade.setUser(user);

        if (trade.getQuantity() == null || trade.getQuantity().compareTo(BigDecimal.ZERO) <= 0)
            throw new IllegalArgumentException("Quantity must be > 0");
        if (trade.getPrice() == null || trade.getPrice().compareTo(BigDecimal.ZERO) <= 0)
            throw new IllegalArgumentException("Price must be > 0");

        return tradeRepository.save(trade);
    }

    public List<Trade> getTradeHistory() {
        return tradeRepository.findByUserOrderByCreatedAtDesc(currentUser());
    }
}
