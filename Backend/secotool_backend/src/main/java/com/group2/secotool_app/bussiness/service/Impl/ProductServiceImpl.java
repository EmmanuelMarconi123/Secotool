package com.group2.secotool_app.bussiness.service.Impl;

import com.group2.secotool_app.bussiness.mapper.ProductMapper;
import com.group2.secotool_app.bussiness.service.IProductValidationService;
import com.group2.secotool_app.model.entity.Image;
import com.group2.secotool_app.model.entity.Product;
import com.group2.secotool_app.persistence.ProductRepository;
import com.group2.secotool_app.bussiness.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    private final IProductValidationService productValidationService;
    private final ProductMapper productMapper;


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getTenRandomProducts() {
        return productRepository.getTenRandomProducts();
    }

    @Override
    public Long save(Product product) {
        if (productValidationService.validateProductNameIsNotAvaible(product.getName()))
            throw new RuntimeException("product name already exists on database");
        var prod = productRepository.save(product);
        return prod.getId();
    }

    @Override
    public void deleteById(Long id, Set<Image> images) {
        var prod = new Product();
        prod.setId(id);
        prod.setImages(images);
        productRepository.delete(prod);
    }

    @Override
    public List<Product> paginateProducts(int page) {
        final Pageable pageable = PageRequest.of(page,10);
        return productRepository.findAll(pageable).get().toList();
    }

    @Override
    public Product findProductById(Long id) {
        var product = productRepository.findById(id);
        if (product.isPresent()){
            return product.get();
        }
        throw new RuntimeException("product "+id+ " not found");
    }

    @Override
    public boolean existProductById(Long id) {
        return productRepository.existsById(id);
    }

    @Override
    public void updateProduct(Product prod) {
        if (!existProductById(prod.getId()))
            throw new RuntimeException("it is not posible to update a product doesn't exists");
        productRepository.save(prod);
    }

    @Override
    public List<Product> getAllProductsAssociateWithAFeature(String featureName) {
        return productRepository.findAllByFeatureName(featureName);
    }
    @Override
    public List<Product> getAllProductsAssociateWithACategory(String category) {
        return productRepository.findAllByFeatureName(category);
    }

    @Override
    public Product findByName(String prodName) {
        var product = productRepository.findByName(prodName);
        if (product.isPresent()){
            return product.get();
        }
        throw new RuntimeException("product "+prodName+ " not found");
    }


}
