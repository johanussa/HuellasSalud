package org.huellas.salud.domain.pet;

import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonProperty;

@Data
class MedicalHistory {

    @BsonProperty("diagnostico")
    public String diagnostic;

    @BsonProperty("tratamiento")
    public String treatment;

    @BsonProperty("veterinario")
    public String veterinarian;
}
