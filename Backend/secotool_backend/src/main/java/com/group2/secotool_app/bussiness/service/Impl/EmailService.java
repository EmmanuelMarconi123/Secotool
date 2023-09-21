package com.group2.secotool_app.bussiness.service.Impl;

import com.group2.secotool_app.bussiness.service.IEmailService;
import jakarta.activation.DataHandler;
import jakarta.activation.DataSource;
import jakarta.activation.FileDataSource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

    private final JavaMailSender javaMailSender;
    @Override
    public void sendSimpleEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }

    @Override
    public void sendHtmlEmail(String to, String subject, String body) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message,true);
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(subject);

        //html
        MimeMultipart multipart = new MimeMultipart("related");
        MimeBodyPart html = new MimeBodyPart();
        html.setContent(body, "text/html");
        multipart.addBodyPart(html);


        //company logo
        MimeBodyPart image = new MimeBodyPart();
        DataSource logo = new FileDataSource("logo.png");
        image.setDataHandler(new DataHandler(logo));
        image.setHeader("Content-ID", "<image>");

        multipart.addBodyPart(image);
        message.setContent(multipart);
        javaMailSender.send(message);
    }

}
