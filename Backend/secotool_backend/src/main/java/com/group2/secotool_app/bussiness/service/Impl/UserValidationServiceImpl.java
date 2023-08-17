package com.group2.secotool_app.bussiness.service.Impl;

import com.group2.secotool_app.bussiness.service.IUserValidationService;
import com.group2.secotool_app.model.dto.request.UserAuthenticationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserValidationServiceImpl implements IUserValidationService {

    private final AuthenticationManager authenticationManager;
    @Override
    public void AuthenticateUser(UserAuthenticationRequestDto authenticationRequestDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequestDto.username(),authenticationRequestDto.password())
        );
    }
}
