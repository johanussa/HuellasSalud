package org.huellas.salud.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.huellas.salud.domain.pet.Pet;
import org.huellas.salud.domain.pet.PetMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.helper.utils.Utils;
import org.huellas.salud.repositories.PetRepository;
import org.jboss.logging.Logger;

import java.net.UnknownHostException;
import java.util.Objects;

@ApplicationScoped
public class PetService {

    private static final Logger LOG = Logger.getLogger(PetService.class);

    @Inject
    Utils utils;

    @Inject
    PetRepository petRepository;

    @ConfigProperty(name = "PARAMETER.HUELLAS_SALUD.DEFAULT_BREED")
    String defaultBreed;

    public void savePetDataMongo(PetMsg petMsg) throws HSException, UnknownHostException {

        LOG.infof("@savePetDataMongo SERV > Inicia ejecucion de servicio para almacenar el registro de una " +
                "mascota con la data: %s. Inicia validacion de la informacion de la mascota", petMsg.getData());

        Pet petData = petMsg.getData();

        if (petRepository.findPetByNameAndOwner(petData.getIdOwner(), petData.getName()).isPresent()) {

            LOG.errorf("@savePetDataMongo SERV > La mascota con el nombre: %s ya esta registrada para el " +
                    "propietario con numero de documento: %s", petData.getName(), petData.getIdOwner());

            throw new HSException(Response.Status.BAD_REQUEST, "La mascota con nombre: " + petData.getName() + ", ya " +
                    "esta registrada para el propietario con número de documento: " + petData.getIdOwner());
        }

        LOG.infof("@savePetDataMongo SERV > Finaliza validacion de la informacion. La mascota con nombre: %s " +
                "no ha sido almacenada. Inicia formato de la info enviada y se agrega metadata", petData.getName());

        petData.setName(utils.capitalizeWords(petData.getName()));
        petData.setBreed(Objects.requireNonNullElse(petData.getBreed(), defaultBreed));
        petMsg.setMeta(utils.getMetaToCreateUser());

        LOG.infof("@savePetDataMongo SERV > Finaliza formato de la data. Se realiza el registro de la mascota " +
                "en mongo con la siguiente informacion: %s", petMsg);

        petRepository.persist(petMsg);

        LOG.infof("@savePetDataMongo SERV > La mascota se registro exitosamente en la base de datos. Finaliza " +
                "ejecucion de servicio para almacenar el registro de una mascota con la data: %s", petMsg);
    }
}
