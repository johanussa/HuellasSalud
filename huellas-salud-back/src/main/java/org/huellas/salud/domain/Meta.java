package org.huellas.salud.domain;

import org.bson.codecs.pojo.annotations.BsonProperty;

import java.time.LocalDateTime;

public class Meta {

    @BsonProperty("fechaCreacion")
    private LocalDateTime creationDate;

    @BsonProperty("fechaUltimaActualizacion")
    private LocalDateTime lastUpdate;

    private String ipAddress;

    private String source;

    private String idUser;

    private String nameUser;

    private String emailUser;
}
