package org.huellas.salud.services;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.huellas.salud.domain.user.UserMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.helper.templates.PasswordRecoveryTemplate;
import org.huellas.salud.repositories.UserRepository;
import org.jboss.logging.Logger;

import java.util.List;

@ApplicationScoped
public class MailService {

    private static final Logger LOG = Logger.getLogger(MailService.class);

    @ConfigProperty(name = "PARAMETER.HUELLAS_SALUD.DOMAIN_RESEND")
    String domainResend;

    @ConfigProperty(name = "PARAMETER.HUELLAS_SALUD.RESEND_API.API_KEY")
    String resendApiKey;

    @Inject
    UserRepository userRepository;

    public void sendEmailRecoveryPass(String userEmail) throws HSException {

        LOG.infof("@sendEmailRecoveryPass SERV > Inicia el servicio para enviar el correo de recuperacion de " +
                "contrasena al usuario con email: %s. Inicia busqueda del registro del usuario", userEmail);

        UserMsg userMsg = userRepository.findUserDataByEmail(userEmail).orElseThrow(() -> {

            LOG.errorf("@sendEmailRecoveryPass SERV > El usuario con correo: %s no esta registrado", userEmail);

            return new HSException(Response.Status.NOT_FOUND, "El usuario con correo: " + userEmail +
                    " No se encuentra registrado en la base de datos");
        });

        String resetLink = "http://localhost:8089";
        String userName = userMsg.getData().getName() + " " + userMsg.getData().getLastName();
        String textContent = PasswordRecoveryTemplate.getTextContent(userName, resetLink);
        String htmlContent = PasswordRecoveryTemplate.formatPasswordRecovery(userName, resetLink);

        sendEmail(userEmail, htmlContent, textContent);

        LOG.info("@sendEmailRecoveryPass SERV > Finaliza servicio de envio de correo de recupracion de contrasena");
    }

    private void sendEmail(String userEmail, String htmlContent, String textContent) throws HSException {
        try {
            LOG.infof("@sendEmail SERV > Inicia servicio de envio de correo al email: %s", userEmail);

            Resend resend = new Resend(resendApiKey);

            CreateEmailOptions options = CreateEmailOptions.builder()
                    .from(domainResend)
                    .to(List.of(userEmail))
                    .subject("Recuperación de contraseña - Huellas & Salud")
                    .html(htmlContent)
                    .text(textContent)
                    .build();

            CreateEmailResponse response = resend.emails().send(options);

            LOG.infof("@sendEmailRecoveryPass SERV > Correo enviado correctamente. Respuesta: %s", response.getId());

        } catch (Exception ex) {

            LOG.errorf(ex, "@sendEmailRecoveryPass SERV > Se presento un error al intentar enviar el correo " +
                    "de recuperar contrasena al usuario con email: %s", userEmail);

            throw new HSException(Response.Status.INTERNAL_SERVER_ERROR, "Error al enviar correo de recuperacion");
        }
    }
}
