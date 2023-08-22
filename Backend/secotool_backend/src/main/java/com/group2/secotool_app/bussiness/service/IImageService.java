package com.group2.secotool_app.bussiness.service;

import com.group2.secotool_app.model.entity.Image;

import java.util.Set;

public interface IImageService {
    void saveProductImage(String imageUrl, Long prodId);
    Image saveCategoryImage(String imageUrl);
    Set<Image> getAllImagesByProduct(Long productId);
    void deleteImage(Long imageId);
}
