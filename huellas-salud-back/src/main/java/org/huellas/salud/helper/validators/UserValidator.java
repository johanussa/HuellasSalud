package org.huellas.salud.helper.validators;

import io.quarkus.logging.Log;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.huellas.salud.domain.user.User;
import org.huellas.salud.domain.user.UserDocumentTypeEnum;
import org.huellas.salud.domain.user.UserRoleEnum;

import java.util.Arrays;

public class UserValidator implements ConstraintValidator<ValidUserInterface, User> {

    @Override
    public boolean isValid(User value, ConstraintValidatorContext context) {

        Log.debugf("@isValid > Inicia validacion del usuario con la data: %s", value);

        if (Arrays.stream(UserDocumentTypeEnum.values())
                .noneMatch(documentType -> documentType.getAcron().equals(value.getDocumentType()))) {

            String message = "El tipo de documento ingresado: " + value.getDocumentType() + ", no es valido";

            Log.errorf("@isValid > %s", message);

            return createConstraintViolation(context, message);
        }

        if (value.getRole() != null && Arrays.stream(UserRoleEnum.values())
                .noneMatch(enumRole -> enumRole.getValue().equals(value.getRole()))) {

            String message = "El rol de usuario ingresado: " + value.getRole() + ", no es valido";

            Log.errorf("@isValid > %s", message);

            return createConstraintViolation(context, message);
        }

        Log.debugf("@isValid > Finaliza validacion del usuario con la data: %s. Los datos son correctos", value);

        return true;
    }

    private boolean createConstraintViolation(ConstraintValidatorContext context, String message) {

        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();

        return false;
    }
}
