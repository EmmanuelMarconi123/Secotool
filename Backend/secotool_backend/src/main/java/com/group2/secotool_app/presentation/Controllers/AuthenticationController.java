package com.group2.secotool_app.presentation.Controllers;

import com.group2.secotool_app.bussiness.facade.IUserFacade;
import com.group2.secotool_app.model.dto.UserAuthenticatedResponseDto;
import com.group2.secotool_app.model.dto.request.UserAuthenticationRequestDto;
import com.group2.secotool_app.model.dto.request.UserRegistrationRequestDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IUserFacade userFacade;

    @PostMapping("/login")
    public ResponseEntity<UserAuthenticatedResponseDto> AuthenticateUser(@RequestBody @Valid UserAuthenticationRequestDto authenticationRequest) {
        return ResponseEntity.ok(userFacade.authenticateUser(authenticationRequest));
    }

    @PostMapping("/resend_email")
    public ResponseEntity<String> resendEmail(@RequestBody @Valid UserAuthenticationRequestDto authenticationRequest){
        userFacade.resendEmail(authenticationRequest);
        return ResponseEntity.ok("email successfully sent");
    }


    @PostMapping("/singup")
    public ResponseEntity<?> registerNewUser(@RequestBody @Valid UserRegistrationRequestDto registrationRequestDto) {
        return ResponseEntity.ok(userFacade.registerUser(registrationRequestDto));
    }


}
