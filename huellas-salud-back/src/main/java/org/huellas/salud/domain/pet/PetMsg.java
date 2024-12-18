package org.huellas.salud.domain.pet;

import io.quarkus.mongodb.panache.common.MongoEntity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.huellas.salud.domain.Meta;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MongoEntity(collection = "MascotaMsg")
public class PetMsg {

    @Schema(hidden = true)
    @Null(message = "No debe ingresar valor para el campo id")
    private ObjectId id;

    @Valid
    @NotNull(message = "El campo data no puede ser nulo")
    private Pet data;

    @Null(message = "No debe ingresar valor para el campo meta")
    private Meta meta;
}
