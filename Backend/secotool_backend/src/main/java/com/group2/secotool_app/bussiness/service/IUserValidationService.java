package com.group2.secotool_app.bussiness.service;

import com.group2.secotool_app.model.dto.request.UserAuthenticationRequestDto;

public interface IUserValidationService {
    void AuthenticateUser (UserAuthenticationRequestDto authenticationRequestDto);
}
