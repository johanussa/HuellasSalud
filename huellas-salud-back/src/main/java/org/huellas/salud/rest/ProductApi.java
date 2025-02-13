package org.huellas.salud.rest;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.groups.ConvertGroup;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.huellas.salud.domain.product.ProductMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.helper.validators.ValidationGroups;
import org.huellas.salud.services.ProductService;
import org.jboss.logging.Logger;

@Path("/internal/product")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductApi {

    private static final Logger LOG = Logger.getLogger(ProductApi.class);

    @Inject
    ProductService productService;

    @POST
    @Path("/add")
    @Tag(name = "Gestión de productos")
    @Operation(
            summary = "Agregar un nuevo producto",
            description = "Permite crear un nuevo registro de un producto en base de datos"
    )
    public Response addProduct(
            @RequestBody(
                    name = "productMsg",
                    description = "Información del producto a registrar",
                    required = true
            )
            @NotNull(message = "Debe ingresar el objeto con la información del producto a registrar")
            @Valid @ConvertGroup(to = ValidationGroups.Post.class) ProductMsg productMsg
    ) throws HSException {

        LOG.debugf("@addProduct API > Inicia ejecucion del servicio para agregar un producto nuevo con la " +
                "data: %s", productMsg);

        productService.addProductInMongo(productMsg);

        LOG.debugf("@addProduct API > Finaliza la ejecucion del servicio de crear un nuevo registro de un " +
                "producto con la data: %s", productMsg);

        return Response.status(Response.Status.CREATED).build();
    }
}
