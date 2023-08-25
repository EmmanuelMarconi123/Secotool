package com.group2.secotool_app.bussiness.facade.Impl;

import com.group2.secotool_app.bussiness.facade.IEmailFacade;
import com.group2.secotool_app.bussiness.service.IEmailService;
import com.group2.secotool_app.model.dto.request.UserRegistrationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailFacade implements IEmailFacade {

    private final IEmailService emailService;


    @Override
    public void sendEmail(UserRegistrationRequestDto user) {
        String emailBody = String.format("Hola %s %s: \u2028 Hemos terminado de crear su cuenta de secotool Puede utilizar %s para iniciar sesión en nuestro sitio, .\u2028 Haga click en el siguiente enlace para acceder. http://127.0.0.1:5173/auth/login",user.firstName(),user.lastName(),user.username());
        emailService.sendEmail(user.username(),"registro existoso secotool",emailBody);
    }
}
