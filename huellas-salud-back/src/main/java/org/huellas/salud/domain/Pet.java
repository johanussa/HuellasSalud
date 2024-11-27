package org.huellas.salud.domain;

import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import java.io.Serializable;
import java.util.List;

@Data
public class Pet implements Serializable {

    // TODO - Tipo de dato para almacenar imagen

    private ObjectId id;

    @BsonProperty("idPropietario")
    private String idOwner;

    @BsonProperty("nombre")
    private String name;

    @BsonProperty("especie")
    private String species;

    @BsonProperty("raza")
    private String breed;

    @BsonProperty("edad")
    private String age;

    @BsonProperty("peso")
    private String weight;

    @BsonProperty("discapacidad")
    private String disability;

    @BsonProperty("descripcion")
    private String description;

    @BsonProperty("estado")
    private Boolean status;

    @BsonProperty("vacunas")
    private List<String> vaccines;

    @BsonProperty("tratamientos")
    private List<String> treatments;

    @BsonProperty("cirugias")
    private List<String> Surgeries;

}
