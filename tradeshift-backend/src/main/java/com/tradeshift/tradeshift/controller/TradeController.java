package com.tradeshift.tradeshift.controller;

import com.tradeshift.tradeshift.model.User;
import com.tradeshift.tradeshift.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/trades")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class TradeController {

    private final UserRepository userRepository;
    private static final List<Map<String, Object>> tradeHistory = new ArrayList<>();

    public TradeController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
    }

    // Execute new trade
    @PostMapping("/execute")
    public Map<String, Object> executeTrade(@RequestBody Map<String, Object> trade) {
        User me = currentUser();
        trade.put("user", me.getEmail());
        trade.put("timestamp", new Date().toString());
        tradeHistory.add(trade);
        return trade;
    }

    // Get all trades by current user
    @GetMapping("/history")
    public List<Map<String, Object>> getMyTrades() {
        String email = currentUser().getEmail();
        List<Map<String, Object>> myTrades = new ArrayList<>();
        for (Map<String, Object> t : tradeHistory) {
            if (email.equals(t.get("user"))) {
                myTrades.add(t);
            }
        }
        return myTrades;
    }
}
