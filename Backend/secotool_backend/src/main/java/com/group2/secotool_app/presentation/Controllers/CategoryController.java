package com.group2.secotool_app.presentation.Controllers;

import com.group2.secotool_app.bussiness.facade.ICategoryFacade;
import com.group2.secotool_app.model.dto.CategoryDto;
import com.group2.secotool_app.model.dto.request.CategoryRequestDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/categories")
public class CategoryController {

    private final ICategoryFacade categoryFacade;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories(){
        return ResponseEntity.ok(categoryFacade.getAllCategory());
    }

    // guardar imagen de la categoria
    @PostMapping
    public ResponseEntity<String> saveCategory(@RequestPart("data") @Valid
                                               CategoryRequestDto categoryRequestDto,
                                               @RequestParam("image")
                                               @NotNull(message = "image required")
                                               @Valid
                                               MultipartFile image
    ){
        categoryFacade.saveCategory(categoryRequestDto, image);
        return ResponseEntity.ok("category saved successfully");
    }

    @PostMapping("/{prodName}/{categoryName}")
    public ResponseEntity<String> associateProductToCategory(@PathVariable("prodName") String prodName, @PathVariable("categoryName") String categoryName){
        categoryFacade.associateProductToCategory(prodName,categoryName);
        return ResponseEntity.ok(String.format("product: %s successfully associated with feature: %s", prodName,categoryName));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCategory(@RequestBody @Valid CategoryRequestDto categoryRequestDto, @PathVariable Long id){
        categoryFacade.updateCategory(categoryRequestDto,id);
        return ResponseEntity.ok(String.format("feature %s successfully updated", id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeature(@PathVariable Long id){
        categoryFacade.deleteCategory(id);
        return ResponseEntity.ok(String.format("category %s successfully deleted", id));
    }
}
