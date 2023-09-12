package com.group2.secotool_app.presentation.Controllers;

import com.group2.secotool_app.bussiness.facade.IUserFacade;
import com.group2.secotool_app.model.dto.ProductDto;
import com.group2.secotool_app.model.dto.UserDto;
import com.group2.secotool_app.model.dto.UserGetMeDto;
import com.group2.secotool_app.model.entity.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/api/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserFacade userFacade;

    @GetMapping("/getMe")
    public ResponseEntity<UserGetMeDto> getMe(){
        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        return ResponseEntity.ok(userFacade.findUserById(userId));
    }

    @GetMapping("/admin")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        return ResponseEntity.ok(userFacade.getAllUsers());
    }

    //validar que los roles esten en mayuscula
    @PostMapping("/admin/{userId}/{userRole}")
    public ResponseEntity<String> changeUserRole(@PathVariable("userId") Long userId, @PathVariable("userRole")UserRole userRole){
        userFacade.changeUserRole(userId,userRole);
        return ResponseEntity.ok(String.format("user %s now has %s role",userId,userRole.name()));
    }

    @GetMapping("/products/favorites")
    public ResponseEntity<List<ProductDto>> getAllFavoritesProducts(){
        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        return ResponseEntity.ok(userFacade.getAllFavoritesProducts(userId));
    }

    @PostMapping("/products/{productId}")
    public ResponseEntity<String> addProductToFavorite(@PathVariable("productId") Long productId){
        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        userFacade.addProductToFavorite(productId,userId);
        return ResponseEntity.ok(String.format("product: %s added to favotires",productId));
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<String> removeProductToFavorite(@PathVariable("productId") Long productId){
        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        userFacade.removeProductToFavorite(productId,userId);
        return ResponseEntity.ok(String.format("product: %s added to favotires",productId));
    }


}
