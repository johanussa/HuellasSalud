package org.huellas.salud.domain.email;

import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.codecs.pojo.annotations.BsonId;
import org.huellas.salud.domain.user.User;
import org.huellas.salud.helper.utils.ConvertFormatJSON;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@MongoEntity(collection = "CorreoRecuperacion")
public class PasswordRecoveryEmail {

    @BsonId
    private String approvalCode;

    private boolean recovered;
    private String resetLink;
    private LocalDateTime effectiveDate;
    private LocalDateTime recoveryDate;
    private User dataUser;

    @Override
    public String toString() {
        return ConvertFormatJSON.toJson(this);
    }
}
