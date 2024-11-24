package org.huellas.salud.domain.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    private ObjectId id;

    @BsonProperty("tipoDocumento")
    private UserDocumentTypeEnum documentType;

    @BsonProperty("numeroDocumento")
    private String documentNumber;

    @BsonProperty("nombre")
    private String name;

    @BsonProperty("apellido")
    private String lastName;

    @BsonProperty("correo")
    private String email;

    private String password;

    @BsonProperty("celular")
    private String cellPhone;

    @BsonProperty("direccion")
    private String address;

    @BsonProperty("rol")
    private UserRoleEnum role;

    @BsonProperty("estado")
    private boolean status;

}
