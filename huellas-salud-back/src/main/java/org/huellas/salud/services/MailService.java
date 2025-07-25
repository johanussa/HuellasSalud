package org.huellas.salud.services;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.huellas.salud.domain.email.EmailDelivery;
import org.huellas.salud.domain.email.PasswordRecoveryEmail;
import org.huellas.salud.domain.user.UserMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.helper.templates.PasswordRecoveryTemplate;
import org.huellas.salud.repositories.EmailDeliveryRepository;
import org.huellas.salud.repositories.PasswordRecoveryRepository;
import org.huellas.salud.repositories.UserRepository;
import org.jboss.logging.Logger;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class MailService {

    private static final Logger LOG = Logger.getLogger(MailService.class);

    @ConfigProperty(name = "PARAMETER.HUELLAS_SALUD.DOMAIN_RESEND")
    String domainResend;

    @ConfigProperty(name = "PARAMETER.HUELLAS_SALUD.RESEND_API.API_KEY")
    String resendApiKey;

    @Inject
    UserService userService;

    @Inject
    UserRepository userRepository;

    @Inject
    EmailDeliveryRepository emailDeliveryRepository;

    @Inject
    PasswordRecoveryRepository passwordRecoveryRepository;

    public void sendEmailRecoveryPass(String userEmail) throws HSException {

        LOG.infof("@sendEmailRecoveryPass SERV > Inicia el servicio para enviar el correo de recuperacion de " +
                "contrasena al usuario con email: %s. Inicia busqueda del registro del usuario", userEmail);

        UserMsg userMsg = getUserByEmail(userEmail);

        LOG.infof("@sendEmailRecoveryPass SERV > El usuario obtenido fue: %s. Inicia envio de correo", userMsg);

        sendEmail(userEmail, userMsg);

        LOG.info("@sendEmailRecoveryPass SERV > Finaliza servicio de envio de correo de recupracion de contrasena");
    }

    public boolean validateTokenRecovery(String approvalCode) throws HSException {

        LOG.info("@validateTokenRecovery SERV > Inicia servicio de validacion del codigo de recuperacion");

        PasswordRecoveryEmail recovery = getPasswordRecovery(approvalCode);

        LOG.infof("@validateTokenRecovery SERV > Se encontro el siguiente registro: %s", recovery);

        boolean isValid = recovery.getEffectiveDate().isAfter(LocalDateTime.now()) && !recovery.isRecovered();

        if (!isValid) {

            LOG.errorf("@validateTokenRecovery SERV > El codigo de aprobacion invalido, ya ha sido utilizado " +
                    "o ha expirado: %s", approvalCode);

            throw new HSException(Response.Status.NOT_FOUND, "El código de recuperación de contraseña es inválido");
        }

        LOG.infof("@validateTokenRecovery SERV > El codigo de aprobacion: %s es aun valido", approvalCode);

        recovery.setRecovered(true);

        return true;
    }

    private UserMsg getUserByEmail(String userEmail) throws HSException {

        return userRepository.findUserDataByEmail(userEmail).orElseThrow(() -> {

            LOG.errorf("@getUserByEmail SERV > El usuario con correo: %s no esta registrado", userEmail);

            return new HSException(Response.Status.NOT_FOUND, "El usuario con correo: " + userEmail +
                    " No se encuentra registrado en la base de datos");
        });
    }

    private void sendEmail(String userEmail, UserMsg userMsg) throws HSException {
        try {
            LOG.infof("@sendEmail SERV > Inicia servicio de envio de correo al email: %s", userEmail);

            Resend resend = new Resend(resendApiKey);

            CreateEmailOptions options = buildCreateEmailOptions(userEmail, userMsg);
            CreateEmailResponse response = resend.emails().send(options);

            String description = "Correo entregado correctamente. ID: " + response.getId();

            saveEmailDelivery(description, userEmail, "OK");

            LOG.infof("@sendEmailRecoveryPass SERV > Correo enviado correctamente. Respuesta: %s", response.getId());

        } catch (Exception ex) {

            LOG.errorf(ex, "@sendEmailRecoveryPass SERV > Error al enviar correo a: %s", userEmail);

            String description = "Error en envío de correo: " + ex.getMessage();
            saveEmailDelivery(description, userEmail, "ERROR");

            throw new HSException(Response.Status.INTERNAL_SERVER_ERROR, "Error al enviar correo de recuperación");
        }
    }

    private CreateEmailOptions buildCreateEmailOptions(String userEmail, UserMsg userMsg) {

        String resetLink = getResetLink(userMsg);
        String userName = userMsg.getData().getName() + " " + userMsg.getData().getLastName();

        return CreateEmailOptions.builder()
                .from(domainResend)
                .to(List.of(userEmail))
                .subject("Recuperación de contraseña - Huellas & Salud")
                .html(PasswordRecoveryTemplate.getTextContent(userName, resetLink))
                .text(PasswordRecoveryTemplate.formatPasswordRecovery(userName, resetLink))
                .build();
    }

    private void saveEmailDelivery(String description, String userEmail, String status) {

        LOG.infof("@saveEmailDelivery SERV > Inicia guardado de registro para el envio del email: %s", userEmail);

        EmailDelivery emailDelivery = EmailDelivery.builder()
                .deliveryId(UUID.randomUUID().toString())
                .description(description)
                .recipient(List.of(userEmail))
                .dateOfShipment(LocalDateTime.now())
                .status(status)
                .subject("Recuperación de contraseña - Huellas & Salud")
                .type("RECUPERACION_CONTRASEÑA")
                .build();

        LOG.infof("@saveEmailDelivery SERV > Se almacena el siguiente registro: %s", emailDelivery);

        emailDeliveryRepository.persist(emailDelivery);

        LOG.infof("@saveEmailDelivery SERV > El registro email delivery fue almacenado correctamente");
    }

    private String getResetLink(UserMsg user) {

        LOG.info("@getResetLink SERV > Inicia obtencion del link de recuperacion de contrasena");

        String token = UUID.randomUUID() + "-" + Instant.now().toEpochMilli();
        String resetLink = "http://localhost:8089/reset-password?approvalCode=" + token;

        PasswordRecoveryEmail recoveryEmail = PasswordRecoveryEmail.builder()
                .approvalCode(token)
                .resetLink(resetLink)
                .recoveryDate(LocalDateTime.now())
                .effectiveDate(LocalDateTime.now().plusHours(24))
                .dataUser(userService.getUserDto(user, false))
                .build();

        LOG.infof("@getResetLink SERV > Inicia guardado del registro: %s", recoveryEmail);

        passwordRecoveryRepository.persist(recoveryEmail);

        LOG.info("@getResetLink SERV > El registro se almaceno correctamente. Se retorna link de recuperacion");

        return resetLink;
    }

    public PasswordRecoveryEmail getPasswordRecovery(String approvalCode) throws HSException {

        return passwordRecoveryRepository.findByIdOptional(approvalCode).orElseThrow(() -> {

            LOG.errorf("@getPasswordRecovery SERV > No hay registros con codigo de aprobacion: %s", approvalCode);

            return new HSException(Response.Status.NOT_FOUND, "El código de recuperación de contraseña no existe");
        });
    }
}
