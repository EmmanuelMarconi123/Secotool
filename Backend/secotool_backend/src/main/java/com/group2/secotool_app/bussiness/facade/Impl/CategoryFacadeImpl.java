package com.group2.secotool_app.bussiness.facade.Impl;

import com.group2.secotool_app.bussiness.facade.ICategoryFacade;
import com.group2.secotool_app.bussiness.mapper.CategoryDtoMapper;
import com.group2.secotool_app.bussiness.mapper.CategoryMapper;
import com.group2.secotool_app.bussiness.service.*;
import com.group2.secotool_app.model.dto.CategoryDto;
import com.group2.secotool_app.model.dto.request.CategoryRequestDto;
import com.group2.secotool_app.model.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CategoryFacadeImpl implements ICategoryFacade {
    private final ICategoryService categoryService;
    private final IImageService imageService;
    private final IFileService fileService;
    private final IProductService productService;
    private final CategoryDtoMapper categoryDtoMapper;
    private final CategoryMapper categoryMapper;
    private final IBucketS3Service bucketS3Service;
    @Override
    public List<CategoryDto> getAllCategory() {
        List<CategoryDto> categoryDtos = new ArrayList<>();
        List<Category> categories = categoryService.findAll();
        categories.forEach(category -> categoryDtos.add(categoryDtoMapper.toCategoryDto(category)));
        return categoryDtos;
    }

    @Override
    public void saveCategory(CategoryRequestDto categoryRequestDto, MultipartFile image) {
        var imageArray = Arrays.asList(image);
        fileService.validateFilesAreImages(imageArray);
        var urlImage = bucketS3Service.storeFiles(imageArray);
        Category category = categoryMapper.toCategory(categoryRequestDto);
        urlImage.forEach(url ->
                category.setImage(imageService.saveCategoryImage(url))
        );
        categoryService.save(category);
    }

    @Override
    public void updateCategory(CategoryRequestDto categoryRequestDto, Long id) {
        var category = categoryMapper.toCategory(categoryRequestDto);
        category.setId(id);
        categoryService.update(category);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryService.findById(id);
        imageService.deleteImage(category.getImage().getId());
    }

    @Override
    public void associateProductToCategory(Long prodId, Long categoryId) {
        var prod = productService.findProductById(prodId);
        var category = categoryService.findById(categoryId);
        categoryService.associateProductToCategory(prod,category);
    }
}
