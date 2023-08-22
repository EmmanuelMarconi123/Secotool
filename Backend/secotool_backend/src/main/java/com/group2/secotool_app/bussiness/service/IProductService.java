package com.group2.secotool_app.bussiness.service;

import com.group2.secotool_app.model.entity.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAllProducts();
    List<Product> getTenRandomProducts();

    Long save(Product productRequestDto);

    void deleteById(Long id);

    List<Product> paginateProducts(int page);

    Product findProductById(Long id);
    boolean existProductById(Long id);

    void updateProduct(Product prod);

    List<Product> getAllProductsAssociateWithAFeature(String featureName);

    Product findByName(String prodName);
}
