package com.group2.secotool_app.bussiness.service.Impl;

import com.group2.secotool_app.bussiness.mapper.ProductRequestDtoMapper;
import com.group2.secotool_app.bussiness.service.IProductValidationService;
import com.group2.secotool_app.model.entity.Product;
import com.group2.secotool_app.persistence.ProductRepository;
import com.group2.secotool_app.bussiness.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    private final IProductValidationService productValidationService;
    private final ProductRequestDtoMapper productRequestDtoMapper;


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getTenRandomProducts() {
        return productRepository.getTenRandomProducts();
    }

    @Override
    public void save(Product product) {
        if (productValidationService.validateProductNameIsNotAvaible(product.getName()))
            throw new RuntimeException("product name already exists on database");
        productRepository.save(product);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
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

}
