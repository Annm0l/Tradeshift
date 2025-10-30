package com.tradeshift.tradeshift.controller;

import com.tradeshift.tradeshift.model.Asset;
import com.tradeshift.tradeshift.model.User;
import com.tradeshift.tradeshift.repository.AssetRepository;
import com.tradeshift.tradeshift.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AssetController {

    private final AssetRepository assetRepository;
    private final UserRepository userRepository;

    public AssetController(AssetRepository assetRepository, UserRepository userRepository) {
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    //  helper: current authenticated user from JWT (username = email) ---
    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
    }

    //  CREATE (owner set) ---
    @PostMapping
    public ResponseEntity<Asset> addAsset(@RequestBody Asset asset) {
        asset.setUser(currentUser());
        Asset saved = assetRepository.save(asset);
        return ResponseEntity.ok(saved);
    }

    //  READ (only my assets) ---
    @GetMapping
    public ResponseEntity<List<Asset>> listMyAssets() {
        List<Asset> mine = assetRepository.findByUser(currentUser());
        return ResponseEntity.ok(mine);
    }

    //  UPDATE (owner-only) ---
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAsset(@PathVariable Long id, @RequestBody Asset updated) {
        User me = currentUser();
        return assetRepository.findById(id)
                .map(a -> {
                    if (!a.getUser().getId().equals(me.getId())) {
                        return ResponseEntity.status(403).body("Forbidden");
                    }
                    // fields you actually allow to update:
                    a.setName(updated.getName());
                    a.setType(updated.getType());
                    a.setValue(updated.getValue());
                    a.setCurrency(updated.getCurrency());
                    assetRepository.save(a);
                    return ResponseEntity.ok(a);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    //  DELETE (owner-only) ---
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAsset(@PathVariable Long id) {
        User me = currentUser();
        return assetRepository.findById(id)
                .map(a -> {
                    if (!a.getUser().getId().equals(me.getId())) {
                        return ResponseEntity.status(403).body("Forbidden");
                    }
                    assetRepository.deleteById(id);
                    return ResponseEntity.ok("Asset deleted");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
