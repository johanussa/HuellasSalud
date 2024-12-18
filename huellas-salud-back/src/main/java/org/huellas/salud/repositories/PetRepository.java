package org.huellas.salud.repositories;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.huellas.salud.domain.pet.PetMsg;
import org.huellas.salud.services.PetService;
import org.jboss.logging.Logger;

import java.util.Optional;

@ApplicationScoped
public class PetRepository implements PanacheMongoRepository<PetMsg> {

    private static final Logger LOG = Logger.getLogger(PetService.class);

    public Optional<PetMsg> findPetByNameAndOwner(String ownerDocument, String petName) {

        LOG.debugf("@findPetByNameAndOwner REPO > Inicia busqueda del registro de la mascota con el nombre: " +
                "%s del propietario con numero de documento: %s", petName, ownerDocument);

        return find("data.nombre = ?1 and data.idPropietario = ?2", petName, ownerDocument)
                .firstResultOptional();
    }
}
