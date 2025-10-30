package com.tradeshift.tradeshift.repository;

import com.tradeshift.tradeshift.model.Asset;
import com.tradeshift.tradeshift.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    // NEW: current user ke assets
    List<Asset> findByUser(User user);
}
