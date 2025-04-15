package org.huellas.salud.domain.pet;

import lombok.Getter;

@Getter
public enum PetSexEnum {

    _0_MACHO("Macho"),
    _1_HEMBRA("Hembra"),
    _2_INDETERMINADO("Indeterminado");

    private final String value;

    PetSexEnum(String value) {
        this.value = value;
    }
}
