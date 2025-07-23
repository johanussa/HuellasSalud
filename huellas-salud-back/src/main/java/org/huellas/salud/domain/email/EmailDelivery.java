package org.huellas.salud.domain.email;

import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.Builder;
import lombok.Data;
import org.huellas.salud.helper.utils.ConvertFormatJSON;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@MongoEntity(collection = "EntregaEmail")
public class EmailDelivery {

    private String deliveryId;
    private String description;
    private List<String> recipient;
    private LocalDateTime dateOfShipment;
    private String status;
    private String subject;
    private String type;

    @Override
    public String toString() {
        return ConvertFormatJSON.toJson(this);
    }
}
