package com.group2.secotool_app.bussiness.service.Impl;

import com.group2.secotool_app.bussiness.mapper.ImageMapper;
import com.group2.secotool_app.bussiness.service.IImageService;
import com.group2.secotool_app.model.entity.Image;
import com.group2.secotool_app.model.entity.Product;
import com.group2.secotool_app.persistence.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements IImageService {
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;
    @Override
    public void saveProductImage(String imageUrl, Long prodId) {
        Image image = new Image();
        Product product = new Product();
        product.setId(prodId);
        image.setUrl(imageUrl);
        image.setProduct(product);
        imageRepository.save(image);
    }

    @Override
    public Image saveCategoryImage(String imageUrl) {
        Image image = new Image();
        image.setUrl(imageUrl);
        return imageRepository.save(image);
    }

    @Override
    public Set<Image> getAllImagesByProduct(Long productId) {
        Set<Image> images = new HashSet<>();
        var imagesDto = imageRepository.findAllByProductId(productId);
        System.out.println(imagesDto.toString());
        imagesDto.forEach(image -> images.add(imageMapper.toImage(image)));
        return images;
    }
    @Override
    public void deleteImage(Long imageId) {
        imageRepository.deleteById(imageId);
    }
}
