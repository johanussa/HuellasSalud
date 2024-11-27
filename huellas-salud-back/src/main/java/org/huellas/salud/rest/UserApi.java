package org.huellas.salud.rest;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.ConvertGroup;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.huellas.salud.domain.user.UserMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.helper.validators.ValidationGroups;
import org.huellas.salud.services.UserService;
import org.jboss.logging.Logger;

import java.util.List;

@Path("/internal/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserApi {

    private static final Logger LOG = Logger.getLogger(UserApi.class);

    @Inject
    UserService userService;

    @POST
    @Tag(name = "Gestión de usuarios")
    @Operation(
            summary = "Obtención de un usuario registrado",
            description = "Permite obtener la información de un usuario por los datos proporcionados"
    )
    public Response getOneUserData(
            @RequestBody(
                    name = "userMsg",
                    description = "Información del usuario que se va a consultar",
                    required = true,
                    content = @Content(example = """
                            {
                                "data": {
                                    "email": "emailusuario@correo.com",
                                    "password": "password"
                                }
                            }"""
                    )
            )
            @NotNull(message = "Debe ingresar el objeto con la información del usuario a registrar")
            @Valid @ConvertGroup(to = ValidationGroups.Post_Get.class) UserMsg userMsg
    ) throws HSException {

        LOG.infof("@getOneUserData API > Inicia ejecucion del servicio para obtener el registro del usuario " +
                "con el correo: %s en la base de datos", userMsg.getData().getEmail());

        UserMsg userMongo = userService.getRegisteredUserInMongo(userMsg);

        LOG.infof("@getOneUserData API > Finaliza ejecucion del servicio para obtener el registro del usuario " +
                "con el correo: %s. La data del usuario se obtuvo correctamente", userMsg.getData().getEmail());

        return Response.ok().entity(userMongo).build();
    }

    @GET
    @Path("/users-list")
    @Tag(name = "Gestión de usuarios")
    @Operation(
            summary = "Obtención de todos los usuarios registrados",
            description = "Permite obtener un listado con la información de los usuario registrados en DB"
    )
    public Response getListUsers() {

        LOG.info("@getListUsers API > Inicia ejecucion del servicio para obtener el listado de todos los usuarios " +
                "registrados en mongo");

        List<UserMsg> users = null;

        LOG.infof("@getListUsers API > Finaliza ejecucion del servicio para obtener el listado de todos los " +
                "usuarios registrados en mongo. Se encontraron: %s registros", users.size());

        return Response.ok().entity(users).build();
    }
}
