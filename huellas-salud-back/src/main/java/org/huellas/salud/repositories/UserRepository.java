package org.huellas.salud.repositories;

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

    public Optional<UserMsg> getOneUserData(String emailUser) {

        LOG.infof("@getOneUserData REPO > Inicia consulta de registro de usuario con correo: %s en mongo", emailUser);

        return find("data.correo = ?1", emailUser).firstResultOptional();
    }

    public List<UserMsg> getRegisteredUsersMongo() {

        LOG.info("@getRegisteredUsersMongo REPO > Inicia obtencion de los usuarios registrados en mongo. estos se " +
                "retornaran ordenados de manera descendente por el campo de fecha de creacion");

        return listAll(Sort.descending("meta.fechaCreacion"));
    }

    public Optional<UserMsg> findUserByEmailAndDocument(String documentNumber, String email) {

        LOG.infof("@findUserByDocumentNumber REPO > Inicia busqueda del registro del usuario con numero de " +
                "documento: %s y correo: %s en mongo", documentNumber, email);

        return find("data.numeroDocumento = ?1 and data.correo = ?2", documentNumber, email).firstResultOptional();
    }

    public long deleteUserDataMongo(String documentNumber, String emailUser) {

        LOG.infof("@deleteUserDataMongo REPO > Inicia servicio de eliminacion del usuario con el numero de documento" +
                ": %s y correo: %s en mongo", documentNumber, emailUser);

        return delete("data.numeroDocumento = ?1 and data.correo = ?2", documentNumber, emailUser);
    }
}
