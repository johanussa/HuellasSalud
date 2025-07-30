package org.huellas.salud.helper.templates;

import lombok.NoArgsConstructor;

import java.time.Year;

@NoArgsConstructor
public final class PasswordRecoveryTemplate {

    public static final String PASS_RECOVERY_TEMPLATE = """
            <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body style="font-family: Arial, sans-serif; background-color: #f7fafc; margin: 0; padding: 20px;">
                        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <div style="background: linear-gradient(135deg, #38b2ac 0%, #3686ef 100%); padding: 20px; text-align: center; color: white;">
                                <div>
                                    <span style="font-size: 24px; margin-right: 10px; vertical-align: middle;">\uD83D\uDC3E</span>
                                    <h1 style="display: inline-block; margin: 0; font-size: 28px; vertical-align: middle;">Huellas & Salud</h1>
                                    <span style="font-size: 24px; margin-left: 10px; vertical-align: middle;">\uD83D\uDC3E</span>
                                </div>
                                <h2 style="margin: 0; font-size: 18px;">Recuperación de contraseña</h2>
                            </div>
                            <!-- Content -->
                            <div style="padding: 20px;">
                                <p style="color: #4a5568; margin-bottom: 15px;">Hola <strong style="font-size: 14px;">{nombre}</strong>,</p>
                                <p style="color: #4a5568; margin-bottom: 15px;">Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en el sistema de Huellas & Salud.</p>
                                <p style="color: #4a5568; margin-bottom: 20px;">Haz clic en el siguiente botón para crear una nueva contraseña:</p>
                                <div style="text-align: center; margin-bottom: 20px;">
                                    <a href="{link}" style="display: inline-block; background: #38b2ac; color: white; font-weight: bold; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-size: 16px;">
                                        Restablecer contraseña
                                    </a>
                                </div>
                                <p style="color: #718096; font-size: 13px; margin-bottom: 5px;">Si no solicitaste este cambio, puedes ignorar este mensaje. Tu contraseña permanecerá igual.</p>
                                <p style="color: #718096; font-size: 13px; margin: 0 0 20px;">De lo contrario, este enlace solo se podrá utilizar una sola vez.</p>
                                <div style="border-top: 1px solid #e2e8f0; padding-top: 15px;">
                                    <p style="color: #718096; margin-bottom: 8px;">⏰ Este enlace expirará en 24 horas.</p>
                                    <p style="color: #718096;">\uD83D\uDD12 Por seguridad, no compartas este correo.</p>
                                </div>
                            </div>
                            <!-- Sección de Contacto -->
                            <div style="background: #f8fafc; padding: 5px 20px;">
                                <h3 style="font-size: 18px; font-weight: 600; color: #2d3748; margin-bottom: 16px;">Contacto</h3>
                                <div style="margin-bottom: 24px;">
                                    <div>
                                        <span style="color: #38b2ac; margin-right: 12px;">📍</span>
                                        <span style="color: #718096;">Calle 116 # 18B-43, Bogotá D.C.</span>
                                    </div>
                                    <div>
                                        <span style="color: #38b2ac; margin-right: 12px;">📞</span>
                                        <span style="color: #718096;">304 567 8900</span>
                                    </div>
                                    <div>
                                        <span style="color: #38b2ac; margin-right: 12px;">✉️</span>
                                        <span style="color: #718096;">contacto@huellasysalud.com</span>
                                    </div>
                                    <div>
                                        <span style="color: #38b2ac; margin-right: 12px;">🌐</span>
                                        <span style="color: #718096;">www.huellasysalud.com</span>
                                    </div>
                                </div>
                                <div style="background: #f8fafc; text-align: center;">
                                    <p style="color: #718096; font-size: 12px; margin: 0;">
                                        © {date} Huellas & Salud. Todos los derechos reservados.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>""";

    private static final String TEXT_CONTENT = """
            "Hola %s," +
            "Para restablecer tu contraseña en Huellas & Salud, visita el siguiente enlace:" +
            "%s" +
            "Este enlace expirará en 24 horas." +
            "© %d Huellas & Salud""";

    public static String getTextContent(String userName, String recoveryLink) {
        return String.format(
                TEXT_CONTENT,
                userName,
                recoveryLink,
                Year.now().getValue()
        );
    }

    public static String formatPasswordRecovery(String userName, String recoveryLink) {

        String template = PASS_RECOVERY_TEMPLATE;

        template = template.replace("{nombre}", userName);
        template = template.replace("{link}", recoveryLink);
        template = template.replace("{date}", String.valueOf(Year.now().getValue()));

        return template;
    }
}
