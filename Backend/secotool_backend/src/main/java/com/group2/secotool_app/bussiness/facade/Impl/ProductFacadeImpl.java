package com.group2.secotool_app.bussiness.facade.Impl;

import com.group2.secotool_app.bussiness.facade.IProductFacade;
import com.group2.secotool_app.bussiness.mapper.ProductDtoMapper;
import com.group2.secotool_app.bussiness.mapper.ProductMapper;
import com.group2.secotool_app.bussiness.service.IBucketS3Service;
import com.group2.secotool_app.bussiness.service.IFileService;
import com.group2.secotool_app.bussiness.service.IImageService;
import com.group2.secotool_app.bussiness.service.IProductService;
import com.group2.secotool_app.model.dto.ProductDto;
import com.group2.secotool_app.model.dto.request.ProductRequestDto;
import com.group2.secotool_app.model.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductFacadeImpl implements IProductFacade {

    private final IProductService productService;
    private final IFileService fileService;
    private final ProductMapper productMapper;
    private final ProductDtoMapper productDtoMapper;
    private final IImageService imageService;
    private final IBucketS3Service bucketS3Service;

    @Override
    public List<ProductDto> getAllProducts() {
        var prods = productService.getAllProducts();
        return productToProductsDto(prods);
    }

    @Override
    public List<ProductDto> getTenRandomProducts() {
        var randomProds = productService.getTenRandomProducts();
        return productToProductsDto(randomProds);
    }

    @Override
    public String save(ProductRequestDto productRequestDto, List<MultipartFile> images) {
        fileService.validateFilesAreImages(images);
        var product = productMapper.toProduct(productRequestDto);
        Long prodId = productService.save(product);
        var urlImages = bucketS3Service.storeFiles(images);
        urlImages.forEach(url ->
                imageService.saveProductImage(url,prodId)
        );
        return "product saved successfully";
    }

    @Override
    public String deleteById(Long id) {
        var images = imageService.getAllImagesByProduct(id);
        productService.deleteById(id,images);
        return "product "+id+ " successfully deleted";
    }

    @Override
    public List<ProductDto> paginateProducts(int page) {
        var products = productService.paginateProducts(page);
        return productToProductsDto(products);
    }

    @Override
    public ProductDto findProductById(Long id) {
        var product = productService.findProductById(id);
        return productDtoMapper.toProductDto(product);
    }

    @Override
    public void updateProduct(Long id, ProductRequestDto productRequestDto) {
        var prod = productMapper.toProduct(productRequestDto);
        prod.setId(id);
        productService.updateProduct(prod);
    }

    @Override
    public List<ProductDto> getAllProductsAssociateWithAFeature(String featureName) {
        List<ProductDto> productDtos = new ArrayList<>();
        var prods = productService.getAllProductsAssociateWithAFeature(featureName);
        prods.forEach(prod -> productDtos.add(productDtoMapper.toProductDto(prod)));
        return productDtos;
    }
    @Override
    public List<ProductDto> getAllProductsAssociateWithACategory(String category) {
        List<ProductDto> productDtos = new ArrayList<>();
        var prods = productService.getAllProductsAssociateWithACategory(category);
        System.out.println(prods);
        prods.forEach(prod -> productDtos.add(productDtoMapper.toProductDto(prod)));
        return productDtos;
    }

    private List<ProductDto> productToProductsDto(List<Product> products){
        ArrayList<ProductDto> productsDto = new ArrayList<>();
        products.forEach(product ->
                productsDto.add(productDtoMapper.toProductDto(product)
                ));
        return productsDto;
    }
}
