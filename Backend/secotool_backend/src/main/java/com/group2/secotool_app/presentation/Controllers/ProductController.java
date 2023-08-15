package com.group2.secotool_app.presentation.Controllers;

import com.group2.secotool_app.bussiness.facade.IProductFacade;
import com.group2.secotool_app.model.dto.ProductDto;
import com.group2.secotool_app.model.dto.request.ProductRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @GetMapping
    @Operation(summary = "return a list of all products saved in database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "list of products")
    })
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        return ResponseEntity.ok(productFacade.getAllProducts());
    }

    @GetMapping("/{id}")
    @Operation(summary = "return a product saved on database by its id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "product found"),
            @ApiResponse(responseCode = "400",description = "product not found")
    })
    public ResponseEntity<ProductDto> getProductById(@Parameter(description = "id of product ") @PathVariable Long id){
        return ResponseEntity.ok(productFacade.findProductById(id));
    }

    @GetMapping("/random")
    @Operation(summary = "return ten random products")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "list of random products")
    })
    public ResponseEntity<List<ProductDto>> getTenRandomProducts(){
        return ResponseEntity.ok(productFacade.getTenRandomProducts());
    }

    @GetMapping("/paginate/{page}")
    @Operation(summary = "return a list of ten products according to the specified index. 0 = first 10 products 1 = second 10 products")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "page of required products")
    })
    public ResponseEntity<List<ProductDto>> productPaginationTenByTen(@Parameter(description = "index of products needed")@PathVariable int page){
        return ResponseEntity.ok(productFacade.paginateProducts(page));
    }

    @PostMapping
    @Operation(summary = "save a product on database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "product saved successfully"),
            @ApiResponse(responseCode = "400",description = "invalid body fields"),
            @ApiResponse(responseCode = "406",description = "product name already exists on database")
    })
    public ResponseEntity<String> saveProduct(@Parameter(description = "")@RequestBody @Valid ProductRequestDto productRequestDto){
        return ResponseEntity.status(201).body(productFacade.save(productRequestDto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "delete a product saved on database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "product successfully deleted")
    })
    public ResponseEntity<String> deleteProductById(@Parameter(description = "product id to remove") @PathVariable @Positive @Valid Long id){
        return ResponseEntity.ok(productFacade.deleteById(id));
    }

}
