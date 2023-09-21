package com.group2.secotool_app.bussiness.facade.Impl;

import com.group2.secotool_app.bussiness.facade.IEmailFacade;
import com.group2.secotool_app.bussiness.service.IEmailService;
import com.group2.secotool_app.model.dto.request.UserRegistrationRequestDto;
import com.group2.secotool_app.model.entity.Product;
import com.group2.secotool_app.model.entity.User;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class EmailFacade implements IEmailFacade {

    private final IEmailService emailService;


    @Override
    public void singUpNotification(UserRegistrationRequestDto user) {
        String emailBody = String.format("Hola %s %s: Hemos terminado de crear su cuenta de secotool Puede utilizar %s para iniciar sesión en nuestro sitio, .Haga click en el siguiente enlace para acceder. http://127.0.0.1:5173/auth/login",user.firstName(),user.lastName(),user.username());
        emailService.sendSimpleEmail(user.username(),"registro existoso secotool",emailBody);
    }

    @Override
    public void rentalNotification(Product product, User user, LocalDate startDate, LocalDate endDate, Double totalPrice) throws MessagingException {
        var name = product.getName();
        name = name.substring(0, 1).toUpperCase() + name.substring(1);
        String body = String.format("<html>" +
                "<body>" +
                "<p style='margin: 0;'>¡Gracias por elegirnos, %s!</p>" +
                "<p style='font-weight: bold'>" +
                "El alquiler de la herramienta está confirmado. A continuación, te proporcionamos los detalles:" +
                "</p>" +
                "<ul style='list-style-type: none; margin: 35px 0; padding: 0;'>" +
                "<li>Herramienta: <b>%s</b></li>" +
                "<li>Desde: <b>%s</b></li>" +
                "<li>Hasta: <b>%s</b></li>" +
                "<li>Pago total: <b>$%s</b></li>" +
                "</ul>" +
                "<p style='margin: 0;'><img style='width: 135px;' src='cid:image' alt='Logo de la empresa'></p>" +
                "<p style='margin: 0;'>Construye fácil y rápido con SecoTool.</p>" +
                "<p style='margin: 0;'>secotool@gmail.com</p>" +
                "</body>" +
                "</html>",name,product.getName(),startDate,endDate,totalPrice);

        emailService.sendHtmlEmail(user.getUsername(), "¡Tu solicitud de alquiler esta confirmada!", body);
    }

}
