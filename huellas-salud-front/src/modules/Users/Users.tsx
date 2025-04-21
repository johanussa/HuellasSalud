import { useState } from "react";
import styles from "./users.module.css";
import imgPrd from "../../assets/Huellas&Salud_3.png";
import { User } from "../../services/typesHS";
import { fieldsFormUser, userFieldsForm, users } from "./data";

const Users = () => {

  const [userSelected, setUserSelected] = useState<User>({
    id: 0, name: "", documentType: "", documentNumber: 0,
    address: "", email: "", phone: 0, role: "", status: ""
  });

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const handlerCloseModal = () => {
    setShowEdit(false);
    setShowDelete(false);
    setShowAdd(false);
  }

  return (
    <main className={styles.usersSection}>
      <div className={styles.title}>
        <h2>Panel de administración - Usuarios</h2>
      </div>
      <button className={styles.addBtn} onClick={() => { setShowAdd(true); }}>
        Agregar Usuario <i className="fa-solid fa-users-gear" />
      </button>
      <section>
        <div className={styles.formGroup}>
          <label htmlFor="searchTerm">Buscar usuario</label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Buscar por nombre, documento, rol, teléfono o correo"
          />
        </div>
        <aside>
          <button className={styles.addBtn} style={{ marginRight: "1rem" }}>
            Buscar <i className="fa-solid fa-search" />
          </button>
          <button className={styles.addBtn}>
            Mostrar todos <i className="fa-solid fa-user"></i>
          </button>
        </aside>
      </section>
      <section className={styles.tableContainer}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              {userFieldsForm.map((field) => (<th key={field}>{field}</th>))}
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
                <tr key={user.id}>
                  <td style={{ fontWeight: "bold" }}>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.documentType}</td>
                  <td>{user.documentNumber}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td className={styles.actions}>
                    <button className={styles.editBtn} title="Editar usuario" onClick={() => { setUserSelected(user); setShowEdit(true); }}>
                      <i className="fa-solid fa-pencil" />
                    </button>
                    <button className={styles.deleteBtn} title="Eliminar usuario" onClick={() => { setShowDelete(true); }}>
                      <i className="fa-solid fa-trash" />
                    </button>
                    <button className={styles.editBtn} title="Cambiar estado">
                      <i className="fa-solid fa-arrows-rotate" />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
      <section className={(showEdit || showDelete || showAdd) ? styles.modalEdit : ""}>
        {showEdit && <CompForm title="Edición de usuario" nameBtn="Actualizar usuario" user={userSelected} handlerCloseModal={handlerCloseModal} />}
        {showDelete && <div className={styles.deleteUser} >
          <h1>Eliminar usuario</h1>
          <h3 className={styles.deleteMsg}>¿Seguro que quieres eliminar al usuario de nombre Juan Pérez?</h3>
          <div className={styles.buttons}>
            <button className={styles.btnConfirmDelete}>Sí, eliminar</button>
            <button className={styles.btnCancelDelete} onClick={() => { setShowDelete(prev => !prev) }} >
              No, cancelar
            </button>
          </div>
        </div>}
        {showAdd && <CompForm title="Crear usuario" nameBtn="Crear usuario" handlerCloseModal={handlerCloseModal} />}
      </section>
    </main>
  );
}

interface CompFormProps {
  title: string;
  nameBtn: string;
  user?: User;
  handlerCloseModal?: () => void;
}

const CompForm = ({ title, nameBtn, user, handlerCloseModal }: CompFormProps) => {

  return (
    <div className={styles.editUser}>
      <h1 className={styles.editionTitle}>{title}</h1>
      <div className={styles.image}>
        <div className={styles.imageUser}>
          <img src={imgPrd} alt="ImageProduct" />
        </div>
        <button>Cargar imagen</button>
      </div>
      <div className={styles.information}>
        {
          fieldsFormUser.map((field) => (
            <div key={field.id} className={styles.dataForm}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                value={user ? user[field.id as keyof User] as string : ""} />
            </div>
          ))
        }
      </div>
      <div className={styles.button}>
        <button className={styles.updateBtn}>{nameBtn}</button>
      </div>
      <div className={styles.modalClose} onClick={handlerCloseModal} >
        <i className={`fa-solid fa-square-xmark ${styles.btnClose}`}></i>
      </div>
    </div>
  );
}

export default Users;