import { useState } from "react";
import styles from "./pets.module.css";
import imgPrd from "../../assets/Huellas&Salud_3.png";
import { Pet } from "../../services/typesHS";
import { fieldsFormPet, petFieldsTable, pets } from "./dataPet";

const Pets = () => {

  const [petSelected, setPetSelected] = useState<Pet>({
    id: 0, name: "", type: "", breed: "", age: 0, weight: 0, treatments: "",
    description: "", status: "", vaccines: "", surgeries: "", styrofoam: false
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
    <main className={styles.petsSection}>
      <div className={styles.title}>
        <h2>Panel de administración - Mascotas</h2>
      </div>
      <button className={styles.addBtn} onClick={() => { setShowAdd(true); }}>
        Agregar Mascota <i className="fa-solid fa-dog" />
      </button>
      <section>
        <div className={styles.formGroup}>
          <label htmlFor="searchTerm">Buscar mascota</label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Buscar por nombre, tipo, raza o dueño"
          />
        </div>
        <aside>
          <button className={styles.addBtn} style={{ marginRight: "1rem" }}>
            Buscar <i className="fa-solid fa-search" />
          </button>
          <button className={styles.addBtn}>
            Mostrar todos <i className="fa-solid fa-cat" />
          </button>
        </aside>
      </section>
      <section className={styles.tableContainer}>
        <table className={styles.petsTable}>
          <thead>
            <tr>
              {petFieldsTable.map((field) => (<th key={field}>{field}</th>))}
            </tr>
          </thead>
          <tbody>
            {
              pets.map((pet) => (
                <tr key={pet.id}>
                  <td style={{ fontWeight: "bold" }}>{pet.id}</td>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.age}</td>
                  <td>{pet.weight}</td>
                  <td>{pet.styrofoam ? "Si" : "No"}</td>
                  <td>{pet.status}</td>
                  <td className={styles.actions}>
                    <button className={styles.editBtn} title="Editar mascota" onClick={() => { setPetSelected(pet); setShowEdit(true); }}>
                      <i className="fa-solid fa-pencil" />
                    </button>
                    <button className={styles.deleteBtn} title="Eliminar mascota" onClick={() => { setShowDelete(true); }}>
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
        {showEdit && <CompForm title="Edición de mascota" nameBtn="Actualizar mascota" pet={petSelected} handlerCloseModal={handlerCloseModal} />}
        {showDelete && <div className={styles.deleteUser} >
          <h1>Eliminar mascota</h1>
          <h3 className={styles.deleteMsg}>¿Seguro que quieres eliminar la mascota de nombre Firulais?</h3>
          <div className={styles.buttons}>
            <button className={styles.btnConfirmDelete}>Sí, eliminar</button>
            <button className={styles.btnCancelDelete} onClick={() => { setShowDelete(prev => !prev) }} >No, cancelar</button>
          </div>
        </div>}
        {showAdd && <CompForm title="Crear mascota" nameBtn="Crear mascota" handlerCloseModal={handlerCloseModal} />}
      </section>
    </main>
  );
}

interface CompFormProps {
  title: string;
  nameBtn: string;
  pet?: Pet;
  handlerCloseModal?: () => void;
}

const CompForm = ({ title, nameBtn, pet, handlerCloseModal }: CompFormProps) => {

  return (
    <div className={styles.editPet}>
      <h1 className={styles.editionTitle}>{title}</h1>
      <div className={styles.image}>
        <div className={styles.imagePet}>
          <img src={imgPrd} alt="ImageProduct" />
        </div>
        <button>Cargar imagen</button>
      </div>
      <div className={styles.information}>
        {
          fieldsFormPet.map((field) => (
            <div key={field.id} className={styles.dataForm}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                value={pet ? pet[field.id as keyof Pet] as string : ""} />
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

export default Pets;