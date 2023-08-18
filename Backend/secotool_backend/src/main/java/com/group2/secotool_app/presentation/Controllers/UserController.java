package com.group2.secotool_app.presentation.Controllers;

import com.group2.secotool_app.bussiness.facade.IUserFacade;
import com.group2.secotool_app.model.dto.UserDto;
import com.group2.secotool_app.model.dto.UserGetMeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
