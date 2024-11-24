package org.huellas.salud.repository;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import org.huellas.salud.domain.user.UserMsg;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class UserRepository implements PanacheMongoRepository<UserMsg> {

    private final Logger LOG = Logger.getLogger(UserRepository.class);

    public Optional<UserMsg> getDataUser(String documentNumber, String documentType) {

        LOG.infof("@getDataUser REPO > Inicia consulta a mongo del registro de usuario con tipo de " +
                "documento: %s y numero de documento: %s", documentType, documentNumber);

        return find("data.numeroDocumento = ?1 and data.tipoDocumento = ?2", documentNumber, documentType)
                .firstResultOptional();
    }

    public List<UserMsg> getRegisteredUsersMongo() {

        LOG.info("@getRegisteredUsersMongo REPO > Inicia obtencion de los usuarios registrados en mongo. estos se " +
                "retornaran ordenados de manera descendente por fecha de creacion");

        return listAll(Sort.descending("meta.fechaCreacion"));
    }

    public Optional<UserMsg> findUserByDocumentNumber(String documentNumber) {

        LOG.infof("@findUserByDocumentNumber REPO > Inicia busqueda del registro del usuario con numero de " +
                "documento: %s en mongo", documentNumber);

        return find("data.numeroDocumento = ?1", documentNumber).firstResultOptional();
    }

    public long deleteUserDataMongo(String documentType, String documentNumber) {

        LOG.infof("@deleteUserDataMongo REPO > Inicia servicio de eliminacion de usuario con tipo de " +
                "documento: %s y numero de documento: %s en mongo", documentType, documentNumber);

        return delete("data.tipoDocumento = ?1 and data.numeroDocumento = ?2", documentType, documentNumber);
    }
}
