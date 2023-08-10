package com.group2.secotool_app.presentation.Controllers;

import com.group2.secotool_app.bussiness.facade.IProductFacade;
import com.group2.secotool_app.model.dto.ProductDto;
import com.group2.secotool_app.model.dto.request.ProductRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("v1/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final IProductFacade productFacade;

    @Operation(summary = "return a list of all products saved in database")
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        return ResponseEntity.ok(productFacade.getAllProducts());
    }

    @Operation(summary = "return a product saved on database by its id")
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@Parameter(description = "id of product ") @PathVariable Long id){
        return ResponseEntity.ok(productFacade.findProductById(id));
    }

    @Operation(summary = "return ten random products")
    @GetMapping("/random")
    public ResponseEntity<List<ProductDto>> getTenRandomProducts(){
        return ResponseEntity.ok(productFacade.getTenRandomProducts());
    }

    @Operation(summary = "return a list of ten products according to the specified index. 0 = first 10 products 1 = second 10 products")
    @GetMapping("/paginate/{page}")
    public ResponseEntity<List<ProductDto>> productPaginationTenByTen(@Parameter(description = "index of product needed")@PathVariable int page){
        return ResponseEntity.ok(productFacade.paginateProducts(page));
    }

    @Operation(summary = "save a product on database")
    @PostMapping
    public ResponseEntity<String> saveProduct(@Parameter(description = "")@RequestBody @Valid ProductRequestDto productRequestDto){
        return ResponseEntity.ok(productFacade.save(productRequestDto));
    }

    @Operation(summary = "delete a product saved on database")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductById(@Parameter(description = "product id to remove") @PathVariable @Positive @Valid Long id){
        return ResponseEntity.ok(productFacade.deleteById(id));
    }
    
}
