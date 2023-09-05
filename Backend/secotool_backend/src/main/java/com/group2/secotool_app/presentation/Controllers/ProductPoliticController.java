package com.group2.secotool_app.presentation.Controllers;

import com.group2.secotool_app.bussiness.service.IProductPoliticService;
import com.group2.secotool_app.model.dto.ProductPoliticDto;
import com.group2.secotool_app.model.dto.request.ProductPoliticRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/politics")
public class ProductPoliticController {

    private final IProductPoliticService productPoliticService;

    @GetMapping("/open")
    public ResponseEntity<List<ProductPoliticDto>> getallPolitics(){
        return ResponseEntity.ok(productPoliticService.findAll());
    }

    @PostMapping("/admin")
    public ResponseEntity<String> savePolitic(@RequestBody @Valid
                                                   ProductPoliticRequestDto productPoliticRequestDto
    ){
        productPoliticService.save(productPoliticRequestDto);
        return ResponseEntity.ok("politic successfully saved");
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<String> updatePolitic(@PathVariable Long id,
                                                @RequestBody @Valid
                                                ProductPoliticRequestDto productPoliticRequestDto){
        productPoliticService.update(productPoliticRequestDto, id);
        return ResponseEntity.ok("politic successfully updated");
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deletePolitic(@PathVariable Long id){
        productPoliticService.delete(id);
        return ResponseEntity.ok(String.format("politic %s successfully deleted", id));
    }
}
