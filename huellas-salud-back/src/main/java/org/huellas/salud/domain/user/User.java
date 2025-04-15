package org.huellas.salud.domain.user;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.huellas.salud.helper.validators.ValidUserInterface;
import org.huellas.salud.helper.validators.ValidationGroups;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ValidUserInterface
public class User implements Serializable {

    @BsonProperty("tipoDocumento")
    @Schema(example = "CC")
    @NotBlank(message = "El campo documentType no puede ser nulo o vacío")
    @Null(message = "No debe ingresar el campo tipo de documento", groups = ValidationGroups.Post_Get.class)
    private String documentType;

    @BsonProperty("numeroDocumento")
    @Schema(example = "1023456789")
    @Size(min = 7, max = 20, message = "El campo documentNumber debe contener entre 7 y 20 caracteres")
    @NotBlank(message = "El campo documentNumber no puede ser nulo o vacío")
    @Null(message = "No debe ingresar el campo número de documento", groups = ValidationGroups.Post_Get.class)
    private String documentNumber;

    @BsonProperty("nombre")
    @Schema(example = "Julian Andres")
    @NotBlank(message = "El campo name no puede ser nulo o vacío")
    @Size(min = 3, max = 40, message = "El campo name debe contener entre 3 y 40 caracteres")
    @Pattern(regexp = "^[a-zA-Z]+( [a-zA-Z]+)*$", message = "El nombre no debe contener valores numéricos, ni " +
            "caracteres especiales, ni espacios vacíos al inicio o al final")
    @Null(message = "No debe ingresar el nombre para obtener data de usuario", groups = ValidationGroups.Post_Get.class)
    private String name;

    @BsonProperty("apellido")
    @Schema(example = "Gonzalez Rojas")
    @NotBlank(message = "El campo lastName no puede ser nulo o vacío")
    @Size(min = 3, max = 40, message = "El campo lastName debe contener entre 3 y 40 caracteres")
    @Null(message = "No debe ingresar el campo apellido", groups = ValidationGroups.Post_Get.class)
    @Pattern(regexp = "^[a-zA-Z]+( [a-zA-Z]+)*$", message = "El apellido no debe contener valores numéricos, ni " +
            "caracteres especiales, ni espacios vacíos al inicio o al final")
    private String lastName;

    @BsonProperty("correo")
    @Schema(example = "usuario@misena.edu.co")
    @Email(message = "El formato del correo ingresado es incorrecto, revise por favor", groups = {ValidationGroups
            .Post_Get.class, ValidationGroups.Post.class})
    @NotBlank(message = "El campo email no puede ser nulo o vacío", groups = {ValidationGroups.Post_Get.class,
            ValidationGroups.Post.class, ValidationGroups.Put.class})
    private String email;

    @Schema(example = "password")
    @Size(min = 8, message = "La contraseña debe tener mínimo 8 caracteres")
    @NotBlank(message = "El campo password no puede ser nulo o vacío", groups = {ValidationGroups.Post_Get.class,
            ValidationGroups.Post.class})
    private String password;

    @BsonProperty("celular")
    @NotBlank(message = "El campo cellPhone no puede ser nulo o vacío")
    @Pattern(regexp = "^(57-3-)\\d{9}", message = "El formato del número de celular del usuario debe ser 57-3-XXXXXXXXX")
    private String cellPhone;

    @BsonProperty("domicilio")
    @Pattern(regexp = "^[a-zA-Z0-9 .\\-_#]+(\\s*[a-zA-Z0-9.\\-_#]*)+$", message = "El campo dirección no puede " +
            "contener caracteres especiales (No puede contener tildes (´), coma (,), #, @, €, %, ñ y llaves)")
    private String address;

    @BsonProperty("rol")
    @Schema(example = "ADMINISTRADOR")
    @Null(message = "No debe enviar datos para el rol del usuario", groups = {ValidationGroups.Put.class,
            ValidationGroups.Post_Get.class})
    @NotBlank(message = "El campo role no debe ser nulo o vació", groups = ValidationGroups.Post.class)
    private String role;

    @BsonProperty("activo")
    @NotNull(message = "El campo active no debe ser nulo", groups = ValidationGroups.Put.class)
    @Null(message = "No debe enviar datos para el campo active", groups = {ValidationGroups.Post.class,
            ValidationGroups.Post_Get.class})
    private Boolean active;

    @Override
    public String toString() {
        return "{" +
                "\"name\": \"" + name + "\"," +
                "\"lastName\": \"" + lastName + "\"," +
                "\"documentType\": \"" + documentType + "\"," +
                "\"documentNumber\": \"" + documentNumber + "\"," +
                "\"cellPhone\": \"" + cellPhone + "\"," +
                "\"address\": \"" + address + "\"," +
                "\"email\": \"" + email + "\"," +
                "\"active\": " + active + "," +
                "\"role\": \"" + role + "\"" +
                "}";
    }
}
