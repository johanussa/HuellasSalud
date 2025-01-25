package org.huellas.salud.rest;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.ConvertGroup;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.huellas.salud.domain.pet.PetMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.helper.validators.ValidationGroups;
import org.huellas.salud.services.PetService;
import org.jboss.logging.Logger;

import java.net.UnknownHostException;
import java.util.List;

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

        return Response.status(Response.Status.CREATED).build();
    }

    @GET
    @Path("/list-pets")
    @Tag(name = "Gestión de mascotas")
    public Response getListPets() {

        LOG.debug("@getListPets API > Inicia ejecucion del servicio para obtener el listado de los registros de las " +
                "mascotas en base de datos");

        List<PetMsg> pets = petService.getListPetMsg();

        LOG.debugf("@getListPets API > Finaliza ejecucion del servicio para obtener el listado de las mascotas " +
                "registradas en base de datos. Se obtuvo: %s resultados", pets.size());

        return Response.ok().entity(pets).build();
    }

    @GET
    @Path("/owners-pets/{idOwner}")
    @Tag(name = "Gestión de mascotas")
    public Response getListPetsOfOwner(
            @Parameter(
                    name = "idOwner",
                    description = "Identificador del propietario",
                    required = true,
                    example = "123456789"
            )
            @NotBlank(message = "Debe ingresar el numero de documento del propietario")
            @PathParam("idOwner") String idOwner
    ) {

        LOG.debugf("@getListPetsOfOwner API > Inicia ejecucion del servicio que obtiene el listado de las " +
                "mascotas relacionadas al propietario con numero de identificacion: %s", idOwner);

        List<PetMsg> pets = petService.getListPetsByOwner(idOwner);

        LOG.debugf("@getListPetsOfOwner API > Finaliza ejecucion del servicio para obtener el listado de las " +
                "mascotas del propietario con numero documento: %s. Se obtuvo: %s resultados", idOwner, pets.size());

        return Response.ok().entity(pets).build();
    }

    @PUT
    @Path("/update")
    @Tag(name = "Gestión de mascotas")
    public Response updatePetData(
            @RequestBody(
                    name = "petMsg",
                    description = "Información actualizada de la mascota",
                    required = true
            )
            @NotNull(message = "Debe ingresar los datos que se actualizarán de la mascota")
            @ConvertGroup(to = ValidationGroups.Put.class) @Valid PetMsg petMsg
    ) throws HSException {

        LOG.debugf("@updatePetData API > Inicia ejecucion del servicio para actualizar la informacion de una " +
                "mascota con la data: %s", petMsg.getData());

        petService.updatePetDataInMongo(petMsg);

        LOG.debugf("@updatePetData API > Finaliza ejecucion del servicio de actualizacion de la informacion de " +
                "una mascota. Se actualizo con la siguiente informacion: %s", petMsg);

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @DELETE
    @Path("/delete")
    @Tag(name = "Gestión de mascotas")
    public Response deletePetData(
            @Parameter(
                    name = "identifierPet",
                    description = "Identificador de la mascota",
                    required = true,
                    example = "26ec4a57-f43b-4230-a169-b0ef1fd6ade1"
            )
            @NotBlank(message = "Debe ingresar el identificador (identifierPet) de la mascota")
            @QueryParam("identifierPet") String identifierPet,
            @Parameter(
                    name = "idOwner",
                    description = "Identificador del propietario de la mascota",
                    required = true,
                    example = "1023456789"
            )
            @NotBlank(message = "Debe ingresar el identificador (idOwner) del propietario")
            @QueryParam("idOwner") String idOwner
    ) throws HSException {

        LOG.debugf("@deletePetData API > Inicia ejecucion del servicio para eliminar el registro de la mascota " +
                "con id: %s asociada al propietario con numero de documento: %s", identifierPet, idOwner);

        petService.deletePetDataInMongo(identifierPet, idOwner);

        LOG.debugf("@deletePetData API > Finaliza ejecucion del servicio para eliminar el registro de la mascota " +
                "con id: %s asociada al propietario con numero de documento: %s", identifierPet, idOwner);

        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
