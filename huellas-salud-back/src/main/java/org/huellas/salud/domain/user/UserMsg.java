package org.huellas.salud.domain.user;

import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.huellas.salud.domain.Meta;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MongoEntity(collection = "UsuarioMsg")
public class UserMsg implements Serializable {

    private ObjectId id;

    private User data;

    private Meta meta;
}
