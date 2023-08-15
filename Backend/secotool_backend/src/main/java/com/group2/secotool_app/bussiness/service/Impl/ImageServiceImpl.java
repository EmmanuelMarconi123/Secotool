package com.group2.secotool_app.bussiness.service.Impl;

import com.group2.secotool_app.bussiness.service.IImageService;
import com.group2.secotool_app.model.entity.Image;
import com.group2.secotool_app.model.entity.Product;
import com.group2.secotool_app.persistence.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements IImageService {
    private final ImageRepository imageRepository;
    @Override
    public void saveProductImage(String imageUrl, Long prodId) {
        Image image = new Image();
        Product product = new Product();
        product.setId(prodId);
        image.setUrl(imageUrl);
        image.setProduct(product);
        imageRepository.save(image);
    }
}
