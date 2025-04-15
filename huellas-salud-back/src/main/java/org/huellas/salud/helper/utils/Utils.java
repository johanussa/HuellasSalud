package org.huellas.salud.helper.utils;

import io.vertx.core.http.HttpServerRequest;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Provider;
import org.huellas.salud.domain.Meta;
import org.jboss.logging.Logger;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.stream.Collectors;

@ApplicationScoped
public class Utils {

    private static final Logger LOG = Logger.getLogger(Utils.class);

    @Inject
    Provider<HttpServerRequest> httpServerRequestProvider;

    public String capitalizeWords(String input) {

        LOG.infof("@capitalizeWords SERV > Inicia formato capitalize al valor: %s", input);

        return Arrays.stream(input.toLowerCase().split(" "))
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1))
                .collect(Collectors.joining(" "));
    }

    public Meta getMetaToCreateUser() throws UnknownHostException {

        LOG.info("@getMetaToCreateUser SERV > Inicia estructura de objeto meta con informacion de creacion de usuario");

        // TODO - Falta tomar información de quien creó el usuario desde el token

        return Meta.builder()
                .creationDate(LocalDateTime.now())
                .source(httpServerRequestProvider.get().absoluteURI())
                .ipAddress(InetAddress.getLocalHost().getHostAddress())
                .build();
    }
}
