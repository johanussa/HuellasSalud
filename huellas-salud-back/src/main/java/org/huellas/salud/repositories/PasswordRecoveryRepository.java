package org.huellas.salud.repositories;

import io.quarkus.mongodb.panache.PanacheMongoRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import org.huellas.salud.domain.email.PasswordRecoveryEmail;

@ApplicationScoped
public class PasswordRecoveryRepository implements PanacheMongoRepositoryBase<PasswordRecoveryEmail, String> {
}
