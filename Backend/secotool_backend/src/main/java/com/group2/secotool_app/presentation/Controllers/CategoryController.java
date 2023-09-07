package com.group2.secotool_app.presentation.Controllers;

import com.group2.secotool_app.bussiness.facade.ICategoryFacade;
import com.group2.secotool_app.model.dto.CategoryFullDto;
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

    @GetMapping("/open")
    public ResponseEntity<List<CategoryFullDto>> getAllCategories(){
        return ResponseEntity.ok(categoryFacade.getAllCategory());
    }

    @PostMapping("/admin")
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

    // puede ir en el controller de prod
    /*
    @PostMapping("/{prodId}/{categoryId}")
    public ResponseEntity<String> associateProductToCategory(@PathVariable("prodId") Long prodId, @PathVariable("categoryId") Long categoryId){
        categoryFacade.associateProductToCategory(prodId,categoryId);
        return ResponseEntity.ok(String.format("product: %s successfully associated with feature: %s", prodId,categoryId));
    }
     */

    @PutMapping("/admin/{id}")
    public ResponseEntity<String> updateCategory(@RequestBody @Valid CategoryRequestDto categoryRequestDto, @PathVariable Long id){
        categoryFacade.updateCategory(categoryRequestDto,id);
        return ResponseEntity.ok(String.format("feature %s successfully updated", id));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteFeature(@PathVariable Long id){
        categoryFacade.deleteCategory(id);
        return ResponseEntity.ok(String.format("category %s successfully deleted", id));
    }
}
