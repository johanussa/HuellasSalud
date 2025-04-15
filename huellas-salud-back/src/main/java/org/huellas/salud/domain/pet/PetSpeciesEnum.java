package org.huellas.salud.domain.pet;

import lombok.Getter;

@Getter
public enum PetSpeciesEnum {

    _0_PERRO("Perro"),
    _1_GATO("Gato"),
    _2_CONEJO("Conejo"),
    _3_HAMSTER("Hámster"),
    _4_CUY("Cuy"),
    _5_MONO("Mono"),
    _6_RATON("Ratón"),
    _7_CHIMPANCE("Chimpancé"),
    _8_PERICO("Perico"),
    _9_CANARIO("Canario"),
    _10_LORO("Loro"),
    _11_CACATUA("Cacatúa"),
    _12_GUACAMAYA("Guacamaya"),
    _13_PALOMA("Paloma"),
    _14_GALLINA("Gallina"),
    _15_TORTUGA("Tortuga"),
    _16_IGUANA("Iguana"),
    _17_CAMALEON("Camaleón"),
    _18_SERPIENTE("Serpiente"),
    _19_PEZ_BETTA("Pez Betta"),
    _20_PEZ_DORADO("Pez Dorado"),
    _21_PEZ_ANGEL("Pez Ángel"),
    _22_CABALLO("Caballo"),
    _23_BURRO("Burro"),
    _24_VACA("Vaca"),
    _25_TORO("Toro"),
    _26_CABRA("Cabra"),
    _27_OVEJA("Oveja"),
    _28_CERDO("Cerdo"),
    _29_ERIZO("Erizo"),
    _30_ZARIGUEYA("Zarigüeya"),
    _31_MAPACHE("Mapache"),
    _32_MONO_TITI("Mono Tití"),
    _33_ARDILLA("Ardilla"),
    _34_CIERVO("Ciervo"),
    _35_ZORRO("Zorro"),
    _36_COYOTE("Coyote"),
    _37_AGUILA("Águila");

    private final String value;

    PetSpeciesEnum(String value) { this.value = value; }
}
