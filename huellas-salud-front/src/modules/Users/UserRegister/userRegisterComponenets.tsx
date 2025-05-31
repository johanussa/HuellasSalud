import { InputFieldUserRegister, User } from "../../../services/typesHS";
import { SocialMediaIcons } from "../../Login/loginComponents";
import { RegisterOptions } from "react-hook-form";
import { validationRules } from "./validationRulesUserRegister";
import { useUserRegister } from "./userRegisterService";
import ButtonComponent from "../../../components/Button/Button";
import styles from "./userRegister.module.css";

export const FormUserRegister = () => {

    const { errorMsg, handleCreateUserSubmit, loading, register, errors, handleSubmit } = useUserRegister();

    return (
        <section className={styles.containerForm}>
            <p>Registrate</p><hr />
            <form className={styles.formRegister} onSubmit={handleSubmit(handleCreateUserSubmit)}>
                <InputField label="Nombre" idInput="name" register={register} errors={errors} />
                <InputField label="Apellido" idInput="lastName" register={register} errors={errors} />
                <section className={`${styles.inputField}`} {...register("documentType",)}>
                    <label htmlFor="docType">
                        Tipo de documento
                        <span className={styles.required}>*</span>
                    </label>
                    <select defaultValue={'CC'} id="docType" className={styles.form_input} required>
                        <option value="CC">Cédula de ciudadania</option>
                        <option value="CE">Cédula de extranjeria</option>
                        <option value="PEP">Permiso especial de permanencia</option>
                        <option value="PPT">Permiso protección temporal</option>
                        <option value="PA">Pasaporte</option>
                        <option value="TI">Tarjeta de identidad</option>
                    </select>
                </section>
                <InputField label="Número de documento" type="number" idInput="documentNumber" register={register} errors={errors} />
                <InputField label="Email" type="email" idInput="email" register={register} errors={errors} />
                <InputField label="Teléfono" type="number" idInput="cellPhone" register={register} errors={errors} />
                <InputField label="Dirección de residencia" idInput="address" inputFull required={false} register={register} errors={errors} />
                <InputField label="Contraseña" type="password" idInput="password" register={register} errors={errors} />
                <InputField label="Confirmar contraseña" type="password" idInput="confirmPassword" register={register} errors={errors} />

                <p className={`${styles.inputFull} ${styles.errorMsg}`}>
                    {(Object.keys(errors).length > 0 && "⚠️ Por favor corrige los errores en el formulario ⚠️")}
                    {errorMsg ? `⚠️ ${errorMsg} ⚠️` : "ㅤ"}
                </p>

                <aside className={`${styles.containerButtons} ${styles.inputFull}`}>
                    <ButtonComponent type="reset" contain={"Limpiar"} loading={loading} />
                    <ButtonComponent type="submit" contain={"Crear cuenta"} loading={loading} />
                </aside>
            </form>
        </section>
    );
}

export const InfoUserRegister = () => (
    <aside className={styles.userRegisterData}>
        <p className={styles.slogan}>¡Únete a la familia de Huellas y Salud!</p>
        <p>Regístrate en nuestro sistema y accede a un mundo de cuidados especializados para tu mascota.</p>
        <SocialMediaIcons />
    </aside>
);

const InputField = ({
    label,
    type = "text",
    idInput,
    required = true,
    inputFull = false,
    register,
    errors
}: InputFieldUserRegister) => {

    const fieldValidation = validationRules[idInput] as RegisterOptions<User, typeof idInput>;

    return (
        <section className={`${styles.inputField} ${inputFull && styles.inputFull}`}>
            <label htmlFor={idInput}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <input
            className={`${errors[idInput] ? styles.errorInput : ''}`}
                id={idInput}
                type={type}
                required={required}
                {...register(idInput, fieldValidation)}
            />
            <span className={styles.validationError}>{errors[idInput]?.message as string}</span>
        </section >
    );
};