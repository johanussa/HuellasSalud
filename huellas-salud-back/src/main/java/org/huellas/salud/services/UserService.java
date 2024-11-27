package org.huellas.salud.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.huellas.salud.domain.user.UserDTO;
import org.huellas.salud.domain.user.UserMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.repositories.UserRepository;
import org.jboss.logging.Logger;
import org.mindrot.jbcrypt.BCrypt;

import java.util.List;

@ApplicationScoped
public class UserService {

    private final Logger LOG = Logger.getLogger(UserService.class);

    @Inject
    UserRepository userRepository;

    public UserMsg getRegisteredUserInMongo(UserMsg userMsg) throws HSException {

        LOG.infof("@getRegisteredUserInMongo SERV > Inicia ejecucion de servicio para obtener registro del " +
                "usuario con correo: %s en mongo", userMsg.getData().getEmail());

        UserMsg userMongo = userRepository.getOneUserData(userMsg.getData().getEmail()).orElseThrow(() -> {

            LOG.errorf("@getRegisteredUserInMongo SERV > No se encontro informacion del registro del usuario " +
                    "con el correo: %s en base de datos", userMsg.getData().getEmail());

            return new HSException(Response.Status.NOT_FOUND, "No se encontró el recurso suministrado");
        });

        if (!BCrypt.checkpw(userMsg.getData().getPassword(), userMongo.getData().getPassword())) {

            LOG.errorf("@getRegisteredUserInMongo SERV > El password ingresado no es valido para el usuario " +
                    "con correo: %s", userMsg.getData().getEmail());

            throw new HSException(Response.Status.BAD_REQUEST, "Error en los recursos suministrados");
        }
        userMongo.setData(getUserDto(userMongo));

        LOG.infof("@getRegisteredUserInMongo SERV > Finaliza ejecucion de servicio para obtener registro del " +
                "usuario con el correo: %s", userMsg.getData().getEmail());

        return userMongo;
    }

    public List<UserMsg> getListRegisteredUser() {

        LOG.info("@getListRegisteredUser SERV > Inicia ejecucion del servicio para obtener el listado de los " +
                "usuarios registrados en mongo");

        List<UserMsg> users = getUserData();

        LOG.infof("@getListRegisteredUser SERV > Finaliza obtencion de registros de usuarios y se retorna " +
                "un total de %s registros de mongo. Finaliza ejecucion del servicio para obtener el listado de los" +
                "usuarios registrados", users.size());

        return users;
    }

    private UserDTO getUserDto(UserMsg userMsg) {

        UserDTO userDTO = new UserDTO();

        userDTO.setName(userMsg.getData().getName());
        userDTO.setLastName(userMsg.getData().getLastName());
        userDTO.setRole(userMsg.getData().getRole());
        userDTO.setEmail(userMsg.getData().getEmail());
        userDTO.setActive(userMsg.getData().getActive());
        userDTO.setDocumentType(userMsg.getData().getDocumentType());
        userDTO.setDocumentNumber(userMsg.getData().getDocumentNumber());
        userDTO.setAddress(userMsg.getData().getAddress());
        userDTO.setCellPhone(userMsg.getData().getCellPhone());

        return userDTO;
    }

    private List<UserMsg> getUserData() {

        LOG.info("@getUserData SERV > Inicia servicio que consulta y transforma la informacion de cada usuario en " +
                "un DTO para asi retornar solo los datos necesarios");

        return userRepository.getRegisteredUsersMongo().stream()
                .peek(userMsg -> userMsg.setData(getUserDto(userMsg)))
                .toList();
    }
}
