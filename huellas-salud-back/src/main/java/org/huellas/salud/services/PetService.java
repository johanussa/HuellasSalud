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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

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
        petData.setIdPet(UUID.randomUUID().toString());

        LOG.infof("@savePetDataMongo SERV > Finaliza formato de la data. Se realiza el registro de la mascota " +
                "en mongo con la siguiente informacion: %s", petMsg);

        petRepository.persist(petMsg);

        LOG.infof("@savePetDataMongo SERV > La mascota se registro exitosamente en la base de datos. Finaliza " +
                "ejecucion de servicio para almacenar el registro de una mascota con la data: %s", petMsg);
    }

    public List<PetMsg> getListPetMsg() {

        LOG.info("@getListPetMsg SERV > Inicia ejecucion del servicio para obtener listado de las mascotas desde " +
                "mongo. Inicia consulta a mongo para obtener la informacion");

        List<PetMsg> pets = petRepository.getListPetsFromMongo();

        LOG.infof("@getListPetMsg SERV > Finaliza consulta en mongo. Finaliza ejecucion del servicio para " +
                "obtener listado de las mascotas desde mongo. Se obtuvo: %s registros", pets.size());

        return pets;
    }

    public List<PetMsg> getListPetsByOwner(String idOwner) {

        LOG.infof("@getListPetsByOwner SERV > Inicia ejecucion del servicio para obtener el listado de las " +
                "mascotas del propietario con numero de documento: %s. Inicia consulta a mongo", idOwner);

        List<PetMsg> pets = petRepository.getListPetsByOwner(idOwner);

        LOG.infof("@getListPetsByOwner SERV > Finaliza consulta de mascotas en mongo. Se obtuvo: %s registros " +
                "de mascotas relacionadas al propietario con numero de documento: %s", pets.size(), idOwner);

        return pets;
    }

    public void updatePetDataInMongo(PetMsg petMsg) throws HSException {

        LOG.infof("@updatePetDataInMongo SERV > Inicia ejecucion del servicio para actualizar registro de la " +
                "mascota con el id: %s en mongo. Data a modificar: %s", petMsg.getData().getIdPet(), petMsg);

        PetMsg petMsgMongo = petRepository.findPetById(petMsg.getData().getIdPet()).orElseThrow(() -> {

            LOG.errorf("@updatePetDataInMongo SERV > La mascota con el identificador: %s NO esta registrada en " +
                    "mongo. Solicitud invalida no se puede modificar el registro", petMsg.getData().getIdPet());

            return new HSException(Response.Status.NOT_FOUND, "No se encontró el registro de la mascota con " +
                    "identificador: " + petMsg.getData().getIdPet() + " en la base de datos");
        });

        LOG.infof("@updatePetDataInMongo SERV > La mascota con documento: %s si esta registrada. Inicia la " +
                "actualizacion del registro de la mascota con data: %s", petMsg.getData().getIdPet(), petMsg);

        petMsgMongo.getMeta().setLastUpdate(LocalDateTime.now());
        setPetInformation(petMsg.getData().getIdPet(), petMsg.getData(), petMsgMongo.getData());

        LOG.infof("@updatePetDataInMongo SERV > Finaliza edicion de la informacion de la mascota con id: %s. " +
                "Inicia actualizacion en mongo con la data: %s", petMsg.getData().getIdPet(), petMsg);

        petRepository.update(petMsgMongo);

        LOG.infof("@updatePetDataInMongo SERV > Finaliza actualizacion del registro de la mascota con id: %s en " +
                "mongo. Finaliza ejecucion de servicio de actualizacion de la mascota", petMsg.getData().getIdPet());
    }

    public void deletePetDataInMongo(String identifierPet, String idOwner) throws HSException {

        LOG.infof("@deletePetDataInMongo SERV > Inicia ejecucion del servicio para eliminar el registro de la " +
                "mascota con id: %s del propietario con numero de documento: %s", identifierPet, idOwner);

        long deletedRecords = petRepository.deletePetDataMongo(identifierPet, idOwner);

        if (deletedRecords == 0) {

            LOG.errorf("@deletePetDataInMongo SERV > El registro de la mascota con id: %s asociado al propietario " +
                    "con documento: %s No existe en mongo. No se elimina registro. Cantidad de registros eliminados" +
                    ": %s", identifierPet, idOwner, deletedRecords);

            throw new HSException(Response.Status.NOT_FOUND, "La mascota con id: " + identifierPet + " asociado al " +
                    "propietario con documento: " + idOwner + " No esta registrada en base de datos");
        }

        LOG.infof("@deletePetDataInMongo SERV > Finaliza ejecucion del servicio para eliminar el registro de la " +
                "mascota con id: %s asociada al propietario con numero de documento: %s. El registro se elimino " +
                "correctamente", identifierPet, idOwner);
    }

    private void setPetInformation(String idPet, Pet petRequest, Pet petMongo) {

        LOG.infof("@setPetInformation SERV > Inicia set de los datos de la mascota con id: %s", idPet);

        petMongo.setAge(petRequest.getAge());
        petMongo.setName(petRequest.getName());
        petMongo.setWeight(petRequest.getWeight());
        petMongo.setNeutered(petRequest.isNeutered());
        petMongo.setDisability(petRequest.getDisability());
        petMongo.setDescription(petRequest.getDescription());
        petMongo.setIsActive(petRequest.getIsActive());
        petMongo.setVaccines(petRequest.getVaccines());
        petMongo.setTreatments(petRequest.getTreatments());
        petMongo.setSurgeries(petRequest.getSurgeries());

        LOG.infof("@setPetInformation SERV > Finaliza set de los datos de la mascota con id: %s", idPet);
    }
}
