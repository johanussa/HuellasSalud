package org.huellas.salud.rest;

import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.services.MailService;
import org.jboss.logging.Logger;

@Path("/internal")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MailApi {

    private static final Logger LOG = Logger.getLogger(MailApi.class);

    @Inject
    MailService mailService;

    @GET
    @Tag(name = "Envío email")
    @Path("/password-recovery/{userEmail}")
    @Operation(
            summary = "Enviar correo electrónico",
            description = "Permite enviar el correo electrónico de recuperación de contraseña"
    )
    public Response sendEmailRecovery(
            @Parameter(
                    name = "userEmail",
                    description = "Correo electrónico dle usuario",
                    example = "usuario@correo.com",
                    required = true
            )
            @NotBlank(message = "El valor del email no puede ser nulo o vacío")
            @PathParam("userEmail") String userEmail
    ) throws HSException {

        LOG.infof("@sendEmailRecovery API > Inicia recuperacion de contrasena del usuario con correo: %s", userEmail);

        mailService.sendEmailRecoveryPass(userEmail);

        LOG.infof("@sendEmailRecovery API > Finaliza recuperacion de contrasena del usuario con correo: %s", userEmail);

        return Response.ok().status(Response.Status.NO_CONTENT).build();
    }
}
