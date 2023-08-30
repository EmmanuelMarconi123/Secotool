package com.group2.secotool_app.bussiness.facade.Impl;

import com.group2.secotool_app.bussiness.facade.IEmailFacade;
import com.group2.secotool_app.bussiness.facade.IUserFacade;
import com.group2.secotool_app.bussiness.mapper.UserDtoMapper;
import com.group2.secotool_app.bussiness.mapper.UserGetMeDtoMapper;
import com.group2.secotool_app.bussiness.mapper.UserMapper;
import com.group2.secotool_app.bussiness.service.IUserValidationService;
import com.group2.secotool_app.bussiness.service.Impl.UserServiceImpl;
import com.group2.secotool_app.model.dto.UserAuthenticatedResponseDto;
import com.group2.secotool_app.model.dto.UserDto;
import com.group2.secotool_app.model.dto.UserGetMeDto;
import com.group2.secotool_app.model.dto.request.UserAuthenticationRequestDto;
import com.group2.secotool_app.model.dto.request.UserRegistrationRequestDto;
import com.group2.secotool_app.model.entity.User;
import com.group2.secotool_app.model.entity.UserRole;
import com.group2.secotool_app.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class UserFacadeImpl implements IUserFacade {

    private final UserDtoMapper userDtoMapper;
    private final UserMapper userMapper;
    private final UserGetMeDtoMapper userGetMeDtoMapper;
    private final UserServiceImpl userService;
    private final IUserValidationService userValidationService;
    private final JwtUtils jwtUtils;
    private final IEmailFacade emailFacade;

    @Override
    public UserGetMeDto findUserById(Long id) {
        var resp = userService.findUserById(id);
        return userGetMeDtoMapper.toUserDto(resp);
    }

    @Override
    public UserGetMeDto findUserByUsername(String username) {
        var resp = userService.loadUserByUsername(username);
        return null;
    }

    @Override
    public UserAuthenticatedResponseDto authenticateUser(UserAuthenticationRequestDto authenticationRequestDto) {
        userValidationService.AuthenticateUser(authenticationRequestDto);
        User user = userService.findUserByUsername(authenticationRequestDto.username());
        Map extraClaims = new HashMap<String,Object>();
        extraClaims.put("id",user.getId());
        String jwt = jwtUtils.generateToken(user,extraClaims);
        return new UserAuthenticatedResponseDto(jwt, userDtoMapper.toUserDto(user));
    }

    @Override
    public UserAuthenticatedResponseDto registerUser(UserRegistrationRequestDto registerRequestDto) {
        var mappedUser = userMapper.toUser(registerRequestDto);
        mappedUser.setUserRole(UserRole.USER);
        var userId = userService.saveUser(mappedUser);
        Map extraClaims = new HashMap<String,Object>();
        extraClaims.put("id",userId);
        String jwt = jwtUtils.generateToken(mappedUser,extraClaims);
        emailFacade.sendEmail(registerRequestDto);
        return new UserAuthenticatedResponseDto(jwt, userDtoMapper.toUserDto(mappedUser));
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<UserDto> userDtos = new ArrayList<>();
        List<User> users = userService.findAllUser();
        users.forEach(user -> userDtos.add(userDtoMapper.toUserDto(user)));
        return userDtos;
    }

    @Override
    public void changeUserRole(Long userId, UserRole userRole) {
        userService.changeUserRole(userId, userRole);
    }
}
