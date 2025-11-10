package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.Asset;
import com.tradeshift.tradeshift.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;

    // Add new asset
    public Asset addAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    // Get all assets
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    // Get asset by ID
    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    // Update an asset
    public Asset updateAsset(Long id, Asset updatedAsset) {
        Optional<Asset> existingAsset = assetRepository.findById(id);
        if (existingAsset.isPresent()) {
            Asset asset = existingAsset.get();
            asset.setName(updatedAsset.getName());
            asset.setType(updatedAsset.getType());
            asset.setValue(updatedAsset.getValue());
            asset.setCurrency(updatedAsset.getCurrency());
            return assetRepository.save(asset);
        } else {
            return null;
        }
    }

    // Delete asset
    public boolean deleteAsset(Long id) {
        if (assetRepository.existsById(id)) {
            assetRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
