package org.huellas.salud.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.huellas.salud.domain.user.User;
import org.huellas.salud.domain.user.UserDTO;
import org.huellas.salud.domain.user.UserMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.helper.utils.Utils;
import org.huellas.salud.repositories.UserRepository;
import org.jboss.logging.Logger;
import org.mindrot.jbcrypt.BCrypt;

import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped
public class UserService {

    private final Logger LOG = Logger.getLogger(UserService.class);

    @Inject
    Utils utils;

    @Inject
    UserRepository userRepository;

    public UserMsg getRegisteredUserInMongo(UserMsg userMsg) throws HSException {

        LOG.infof("@getRegisteredUserInMongo SERV > Inicia ejecucion de servicio para obtener registro del " +
                "usuario con correo: %s en mongo", userMsg.getData().getEmail());

        UserMsg userMongo = userRepository.getOneUserData(userMsg.getData().getEmail()).orElseThrow(() -> {

            LOG.errorf("@getRegisteredUserInMongo SERV > No se encontro informacion del registro del usuario " +
                    "con el correo: %s en base de datos", userMsg.getData().getEmail());

            return new HSException(Response.Status.NOT_FOUND, "El usuario con correo: " + userMsg.getData().getEmail() +
                    " No se encuentra registrado en la base de datos");
        });

        if (!BCrypt.checkpw(userMsg.getData().getPassword(), userMongo.getData().getPassword())) {

            LOG.errorf("@getRegisteredUserInMongo SERV > El password ingresado no es valido para el usuario " +
                    "con correo: %s", userMsg.getData().getEmail());

            throw new HSException(Response.Status.BAD_REQUEST, "Error en los recursos suministrados");
        }
        userMongo.setData(getUserDto(userMongo));

        LOG.infof("@getRegisteredUserInMongo SERV > Finaliza ejecucion de servicio. La informacion del " +
                "usuario que se obtuvo es: %s", userMongo);

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

    public void saveUserDataInMongo(UserMsg userMsg) throws UnknownHostException, HSException {

        LOG.infof("@saveUserDataInMongo SERV > Inicia servicio de guardado de usuario en mongo con la data: " +
                "%s. Inicia verificacion de si el usuario ya esta registrado en mongo", userMsg.getData());

        validateIfUserIsRegistered(userMsg.getData().getDocumentNumber(), userMsg.getData().getEmail());

        LOG.infof("@saveUserDataInMongo SERV > Finaliza validacion de data del usuario si ya ha sido registrado " +
                "previamente. Inicia servicio de encriptacion de password de usuario con data: %s", userMsg.getData());

        validatePasswordEncrypted(userMsg.getData());

        LOG.infof("@saveUserDataInMongo SERV > Finaliza encriptacion de password del usuario con data: %s. " +
                "Inicia formato al nombre de usuario, el estado y se agrega la metadata", userMsg.getData());

        formatUserDataToCreateUser(userMsg);

        LOG.infof("@saveUserDataInMongo SERV > Finaliza estructura del objeto meta correctamente. Inicia " +
                "almacenamiento del registro en mongo con la data: %s", userMsg);

        userRepository.persist(userMsg);

        LOG.infof("@saveUserDataInMongo SERV > Finaliza servicio de creacion de usuario. El usuario con " +
                "numero de documento: %s y correo: %s se creo correctamente en la base de datos", userMsg.getData()
                .getDocumentNumber(), userMsg.getData().getEmail());
    }

    public void updateUserDataInMongo(UserMsg userMsg) throws HSException {

        LOG.infof("@updateUserDataInMongo SERV > Inicia ejecucion de servicio de actualizacion de registro " +
                "de usuario con la data: %s", userMsg.getData());

        String email = userMsg.getData().getEmail();
        String documentNumber = userMsg.getData().getDocumentNumber();

        UserMsg userMsgMongo = userRepository.findUserByDocumentNumber(documentNumber).orElseThrow(() -> {

            LOG.errorf("@updateUserDataInMongo SERV > El usuario con documento: %s y correo: %s NO esta " +
                    "registrado en mongo. Solicitud invalida no se puede editar registro", documentNumber, email);

            return new HSException(Response.Status.NOT_FOUND, "No se encontró el registro del usuario con numero de " +
                    "documento: " + documentNumber + " y correo: " + email + " en base de datos");
        });

        LOG.infof("@updateUserDataInMongo SERV > El usuario con documento: %s y correo: %s si esta registrado. " +
                "Se procede a realizar validacion del correo si va a ser modificado", documentNumber, email);

        validateUserEmail(email, userMsgMongo.getData().getEmail());

        LOG.infof("@updateUserDataInMongo SERV > Finaliza validacion del correo a actualizar el correo: %s es " +
                "valido. Inicia verificacion de password del usuario con documento: %s", email, documentNumber);

        validatePasswordEncrypted(userMsg.getData());

        LOG.infof("@updateUserDataInMongo SERV > Finaliza verificacion de password del usuario con data: %s. " +
                "Inicia actualizacion de la informacion del usuario con id: %s", userMsg.getData(), documentNumber);

        updateUserDataInformation(userMsgMongo, userMsg.getData(), documentNumber);

        LOG.infof("@updateUserDataInMongo SERV > Finaliza edicion de usuario con id: %s. Inicia actualizacion " +
                "en mongo con la data: %s", documentNumber, userMsgMongo);

        userRepository.update(userMsgMongo);

        LOG.infof("@updateUserDataInMongo SERV > Finaliza actualizacion de registro de usuario con numero de " +
                "documento: %s y correo: %s en mongo. Se actualizo el registro con la data: %s. Finaliza ejecucion " +
                "de servicio de actualizacion de usuario", documentNumber, email, userMsgMongo);
    }

    public void deleteUserDataInMongo(String documentNumber, String emailUser) throws HSException {

        LOG.infof("@deleteUserDataInMongo SERV > Inicia ejecucion del servicio para eliminar registro del " +
                "usuario con id: %s y correo: %s de mongo", documentNumber, emailUser);

        long deleted = userRepository.deleteUserDataMongo(documentNumber, emailUser);

        if (deleted == 0) {

            LOG.errorf("@deleteUserDataInMongo SERV > El registro de usuario con numero de documento: %s No " +
                    "existe en mongo. No se realiza eliminacion. Registros eliminados: %s", documentNumber, deleted);

            throw new HSException(Response.Status.NOT_FOUND, "El usuario con numero de documento: " + documentNumber +
                    " y correo: " + emailUser + " No esta registrado en la base de datos");
        }

        LOG.infof("@deleteUserDataInMongo SERV > El registro del usuario con numero de documento: %s y correo: " +
                "%s se elimino correctamente de mongo. Finaliza ejecucion del servicio para eliminar usuario y se " +
                "elimino %s registro de la base de datos", documentNumber, emailUser, deleted);
    }

    private void validateUserEmail(String emailUpdate, String emailMongo) throws HSException {

        LOG.infof("@validateUserEmail SERV > Inicia validacion del email de usuario si se modifico. Correo " +
                "actual: %s. Correo en solicitud de actualizacion: %s", emailMongo, emailUpdate);

        if (emailUpdate != null && !emailUpdate.equals(emailMongo)) {

            LOG.infof("@validateUserEmail SERV > El correo tambien se actualizara. Inicia validacion de que " +
                    "no exista un registro con el correo a modificar: %s", emailUpdate);

            if (userRepository.findUserDataByEmail(emailUpdate).isPresent()) {

                LOG.errorf("@validateUserEmail SERV > Ya existe un usuario con el correo: %s. No se puede " +
                        "actualizar el registro, se debe cambiar por otro correo que no exista en mongo", emailUpdate);

                throw new HSException(Response.Status.BAD_REQUEST, "Ya existe un usuario con el correo: " + emailUpdate +
                        ", por favor ingrese otro para poder actualizar los datos");
            }

            LOG.infof("@validateUserEmail SERV > No se encontro registro de usuario con ese correo. Se continua " +
                    "con la actualizacion de usuario. Correo antiguo: %s. Correo nuevo: %s", emailMongo, emailUpdate);
        }
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

    private void validateIfUserIsRegistered(String documentNumber, String email) throws HSException {

        LOG.infof("@validateIfUserIsRegistered SERV > Inicia busqueda del registro del usuario identificado " +
                "con numero de documento: %s y correo: %s", documentNumber, email);

        if (userRepository.findUserByEmailOrDocument(documentNumber, email).isPresent()) {

            LOG.errorf("@validateIfUserIsRegistered SERV > El usuario identificado con numero de documento: " +
                    "%s y correo: %s ya se encuentra registrado en mongo. La solicitud es invalida, no se puede " +
                    "registrar el usuario", documentNumber, email);

            throw new HSException(Response.Status.BAD_REQUEST, "El usuario con correo: " + email + " y número de " +
                    "documento: " + documentNumber + " ya se encuentra registrado en la base de datos");
        }
        LOG.infof("@validateIfUserIsRegistered SERV > Finaliza busqueda del registro del usuario. El usuario " +
                "con numero de documento: %s y correo: %s No ha sido registrado previamente. Se continua proceso de " +
                "registro en mongo", documentNumber, email);
    }

    private void validatePasswordEncrypted(User user) {

        LOG.info("@validatePasswordEncrypted SERV > Inicia verificacion del password si ya esta encriptado");

        if (user.getPassword() != null && user.getPassword().length() < 25) {

            LOG.infof("@validatePasswordEncrypted SERV > El password ingresado No esta encriptado. Inicia proceso " +
                    "de encriptar el password del cliente con numero de documento: %s", user.getDocumentNumber());

            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));

            LOG.info("@validatePasswordEncrypted SERV > El password del usuario fue encriptado correctamente");
        }

        LOG.info("@validatePasswordEncrypted SERV > Finaliza verificacion del password si ya estaba encriptado");
    }

    private void formatUserDataToCreateUser(UserMsg userMsg) throws UnknownHostException {

        LOG.infof("@formatUserDataToCreateUser SERV > Inicia formato de datos del usuario con numero de " +
                "documento: %s para ser almacenados en mongo.", userMsg.getData().getDocumentNumber());

        User user = userMsg.getData();

        user.setActive(true);
        user.setName(utils.capitalizeWords(user.getName()));
        user.setLastName(utils.capitalizeWords(user.getLastName()));

        LOG.infof("@formatUserDataToCreateUser SERV > Finaliza formato al nombre del usuario con data: %s. " +
                "Inicia estructura del objeto meta con la informacion de auditoria", userMsg.getData());

        userMsg.setMeta(utils.getMetaToCreateUser());

        LOG.infof("@formatUserDataToCreateUser SERV > Finaliza estructura del objeto meta correctamente. " +
                "Finaliza formato de datos del usuario con correo: %s.", user.getEmail());
    }

    private void updateUserDataInformation(UserMsg userMsgMongo, User editedUser, String idUser) {

        LOG.infof("@updateUserDataInformation SERV > Inicia actualizacion de datos de usuario con id: %s", idUser);

        User userMongo = userMsgMongo.getData();

        userMongo.setActive(editedUser.getActive());
        userMongo.setEmail(editedUser.getEmail());
        userMongo.setCellPhone(editedUser.getCellPhone());
        userMongo.setAddress(editedUser.getAddress() != null ? editedUser.getAddress() : userMongo.getAddress());
        userMongo.setPassword(editedUser.getPassword());
        userMongo.setDocumentType(editedUser.getDocumentType());
        userMongo.setName(utils.capitalizeWords(editedUser.getName()));
        userMongo.setLastName(utils.capitalizeWords(editedUser.getLastName()));

        userMsgMongo.getMeta().setLastUpdate(LocalDateTime.now());

        LOG.infof("@updateUserDataInformation SERV > Finaliza actualizacion de datos de usuario con id: %s", idUser);
    }
}
