package com.group2.secotool_app.bussiness.facade;

import com.group2.secotool_app.model.dto.request.UserRegistrationRequestDto;

public interface IEmailFacade {
    void sendEmail(UserRegistrationRequestDto user);
}
