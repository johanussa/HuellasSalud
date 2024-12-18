package org.huellas.salud.rest;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.ConvertGroup;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.huellas.salud.domain.pet.PetMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.helper.validators.ValidationGroups;
import org.huellas.salud.services.PetService;
import org.jboss.logging.Logger;

import java.net.UnknownHostException;

@Path("/internal/pet")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PetApi {

    private static final Logger LOG = Logger.getLogger(PetApi.class);

    @Inject
    PetService petService;

    @POST
    @Path("/create")
    @Tag(name = "Gestión de mascotas")
    public Response createPetData(
            @RequestBody(
                    name = "petMsg",
                    description = "Información de la mascota a registrar",
                    required = true
            )
            @NotNull(message = "Debe ingresar los datos de la mascota")
            @ConvertGroup(to = ValidationGroups.Post.class) @Valid PetMsg petMsg
    ) throws HSException, UnknownHostException {

        LOG.debugf("@createPetData API > Inicia ejecucion del servicio para crear el registro de una mascota " +
                "en base de datos con la data: %s", petMsg.getData());

        petService.savePetDataMongo(petMsg);

        LOG.debugf("@createPetData API > Finaliza ejecucion del servicio para crear el registro de una mascota " +
                "en base de datos. Se registro la siguiente informacion: %s", petMsg);

        return Response.ok().status(Response.Status.CREATED).build();
    }
}
