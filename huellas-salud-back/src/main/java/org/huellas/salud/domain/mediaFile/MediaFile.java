package org.huellas.salud.domain.mediaFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaFile {

    @BsonProperty("identificador")
    private String entityId;

    @Schema(example = "User")
    @BsonProperty("tipoEntidad")
    private String entityType;

    @BsonProperty("NombreArchivo")
    private String fileName;

    @BsonProperty("tipoContenido")
    private String contentType;

    @BsonProperty("tipoArchivo")
    private String fileType;

    @BsonProperty("Adjunto")
    private String attachment;
}
