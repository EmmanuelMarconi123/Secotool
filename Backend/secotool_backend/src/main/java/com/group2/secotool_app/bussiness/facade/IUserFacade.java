package com.group2.secotool_app.bussiness.facade;

import com.group2.secotool_app.model.dto.UserAuthenticatedResponseDto;
import com.group2.secotool_app.model.dto.UserDto;
import com.group2.secotool_app.model.dto.UserGetMeDto;
import com.group2.secotool_app.model.dto.request.UserAuthenticationRequestDto;
import com.group2.secotool_app.model.dto.request.UserRegistrationRequestDto;

import java.util.List;

public interface IUserFacade {
    UserGetMeDto findUserById(Long id);
    UserGetMeDto findUserByUsername(String username);
    UserAuthenticatedResponseDto authenticateUser(UserAuthenticationRequestDto authenticationRequestDto);
    UserAuthenticatedResponseDto registerUser(UserRegistrationRequestDto registerRequestDto);

    List<UserDto> getAllUsers();
}
