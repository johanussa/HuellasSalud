package org.huellas.salud.rest;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.Arrays;

@Path("/internal/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserApi {

    @POST
    @Tag(name = "Gestión de usuarios")
    public Response getOneUser() {

        int[][] matriz1 = new int[][]{{1,2,3},{4,5,6}};
        int[][] matriz2 = new int[][]{{7,8,9},{10,11,12}};
        int[][] response = new int[2][3];

        for (int i = 0; i < matriz1.length; i++) {
            for (int j = 0; j < matriz1[0].length; j++) {
                response[i][j] = (matriz1[i][j] + matriz2[i][j]);
            }
        }

        return Response.ok()
                .entity(response).build();
    }

}
