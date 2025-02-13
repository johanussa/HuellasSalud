package org.huellas.salud.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.huellas.salud.domain.product.ProductMsg;
import org.huellas.salud.helper.exceptions.HSException;
import org.huellas.salud.repositories.ProductRepository;
import org.jboss.logging.Logger;

@ApplicationScoped
public class ProductService {

    private static final Logger LOG = Logger.getLogger(ProductService.class);

    @Inject
    ProductRepository productRepository;

    public void addProductInMongo(ProductMsg productMsg) throws HSException {

        LOG.infof("@addProductInMongo SERV > Inicia ejecucion del servicio para agregar un producto en base de " +
                "datos con la data: %s. Inicia validacion de existencia del producto en mongo", productMsg);

        productRepository.getProductByBarCode(productMsg.getData().getBarcode()).orElseThrow(() -> {

            LOG.errorf("@addProductInMongo SERV > El producto con la informacion: %s ya existe en la base de " +
                    "datos. No se realiza registro del producto", productMsg);

            return new HSException(Response.Status.BAD_REQUEST, "El producto con el código de barras: " + productMsg
                    .getData().getBarcode() + " ya se encuentra registrado en la base de datos");
        });

        LOG.infof("@addProductInMongo SERV > El producto con el codigo de barras: %s no esta registrado en " +
                "mongo. Inicia guardado del producto: %s en mongo", productMsg);

        productRepository.persist(productMsg);

        LOG.infof("@addProductInMongo SERV > Finaliza ejecucion del servicio para agregar un producto nuevo en " +
                "base de datos. Se registro producto con la siguiente informacion: %s", productMsg);
    }
}
