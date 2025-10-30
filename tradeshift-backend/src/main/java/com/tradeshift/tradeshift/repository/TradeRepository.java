package com.tradeshift.tradeshift.repository;

import com.tradeshift.tradeshift.model.Trade;
import com.tradeshift.tradeshift.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findByUserOrderByCreatedAtDesc(User user);
}
