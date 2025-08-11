import styles from "./history.module.css";
import imgPet from "../../assets/simba.webp";
import { useState } from "react";
import { fieldsFormPet, pets } from "../Pets/dataPet";
import { Pet } from "../../helper/typesHS";

const History = () => {

  const [petSelected, setPetSelected] = useState<Pet>({
    id: "0", name: "", type: "Perro", breed: "", age: 0, weight: 0, treatments: [""],
    description: "", status: "Activo", vaccines: [""], surgeries: [""], styrofoam: false
  });
  const [detailPet, setDetailPet] = useState<boolean>(false);
  const [viewListPet, setViewListPet] = useState<boolean>(true);
  const [option, setOption] = useState<number>(1);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  return (
    <main className={styles.historySection}>
      <section className={styles.headerBtns}>
        <button className={styles.historyBtn} onClick={() => { setViewListPet(true); setDetailPet(false); }}>
          <i className="fa-solid fa-arrow-left" /> Volver
        </button>
        <button className={styles.historyBtn} onClick={() => setShowAdd(true)}>
          <i className="fa-solid fa-paw" /> Agregar mascota
        </button>
      </section>
      <h2 className={styles.titleOwner}>Mascotas de Carlos Puentes</h2>
      <section className={styles.cardContainer}>
        {viewListPet &&
          pets.map((pet) => (
            <aside className={styles.cardPet} key={pet.id}>
              <p>{pet.name}</p>
              <img className={styles.petImg} src={imgPet} />
              <button
                className={styles.historyBtn}
                onClick={() => { setViewListPet(false); setDetailPet(true); setPetSelected(pet); }}>
                Ver Historial
              </button>
            </aside>
          ))
        }
      </section>
      {detailPet && (
        <section className={styles.historyContainer}>
          <aside className={styles.photoPet}>
            <h1>{petSelected.name}</h1>
            <img src={imgPet} alt="Foto" width="200" />
          </aside>
          <aside className={styles.informationPet}>
            <section className={styles.options}>
              <ul className={styles.ulOptions}>
                <li className={option === 1 ? styles.selected : ""} onClick={() => setOption(1)}>Información</li>
                <li className={option === 2 ? styles.selected : ""} onClick={() => setOption(2)}>Tratamientos</li>
                <li className={option === 3 ? styles.selected : ""} onClick={() => setOption(3)}>Historial</li>
                <li className={option === 4 ? styles.selected : ""} onClick={() => setOption(4)}>Proceso</li>
              </ul>
              <InfoPet pet={petSelected} option={option} />
            </section>
          </aside>
        </section>
      )}
      <section className={(showAdd) ? styles.modalEdit : ""}>
        {showAdd && <CompForm setShowAdd={setShowAdd} />}
      </section>
    </main>
  );
}

interface CompFormProps {
  setShowAdd: (updater: (prevState: boolean) => boolean) => void;
}

const CompForm = ({ setShowAdd }: CompFormProps) => {

  return (
    <div className={styles.editPet}>
      <h1 className={styles.editionTitle}>Agregar mascota</h1>
      <div className={styles.image}>
        <div className={styles.imagePet}>
          <img src={imgPet} alt="ImageProduct" />
        </div>
        <button>Cargar imagen</button>
      </div>
      <div className={styles.information}>
        {
          fieldsFormPet.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
              />
            </div>
          ))
        }
      </div>
      <div className={styles.button}>
        <button className={styles.updateBtn}>Crear mascota</button>
      </div>
      <div className={styles.modalClose} onClick={() => setShowAdd(prev => !prev)} >
        <i className={`fa-solid fa-square-xmark ${styles.btnClose}`}></i>
      </div>
    </div>
  );
}

const InfoPet = ({ pet, option }: { pet: Pet; option: number }) => {
  switch (option) {
    case 1:
      return (
        <section className={styles.information}>
          {
            fieldsFormPet.map((field) => (
              <section key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  disabled
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={pet ? pet[field.id as keyof Pet] as string : ""} />
              </section>
            ))
          }
        </section>
      );
    case 2:
      return (
        <section className={styles.optionDetial}>
          <h2>Tratamientos realizados</h2>
          <ul className={styles.ulTreatment}>
            <li className={styles.liTreatment}>
              <strong>Vacuna Antirrábica</strong><br />
              Fecha: 10/01/2025<br />
              Veterinario: Dr. Ramírez<br />
              Observaciones: Sin reacciones adversas.
            </li>
            <li className={styles.liTreatment}>
              <strong>Desparasitación interna</strong><br />
              Fecha: 05/02/2025<br />
              Veterinario: Dra. Gómez<br />
              Observaciones: Repetir en 3 meses.
            </li>
            <li className={styles.liTreatment}>
              <strong>Tratamiento para otitis</strong><br />
              Fecha: 20/03/2025<br />
              Veterinario: Dr. Pérez<br />
              Observaciones: Aplicar gotas 2 veces al día por 7 días.
            </li>
          </ul>
        </section>
      );
    case 3:
      return (
        <section style={{ overflowY: "scroll", height: "100%", padding: "10px" }}>
          <h2>Historial Clínico</h2>
          <h3>Resumen de la Mascota</h3>
          <div style={{ background: "#eaf4f7", padding: "15px", borderRadius: "10px" }}>
            <p><strong>Nombre:</strong> {pet.name}</p>
            <p><strong>Especie:</strong> {pet.type}</p>
            <p><strong>Raza:</strong> {pet.breed}</p>
            <p><strong>Edad:</strong> {pet.age}</p>
            <p><strong>Peso:</strong> {pet.weight}</p>
          </div>

          <h3 style={{ marginTop: "20px" }}>🩺 Último Procedimiento Realizado</h3>
          <div style={{ background: "#fef6e4", padding: "15px", borderRadius: "10px" }}>
            <p><strong>Fecha:</strong> 20/03/2025</p>
            <p><strong>Motivo:</strong> Infección en el oído</p>
            <p><strong>Tratamiento:</strong> Aplicación de gotas antibióticas durante 7 días</p>
            <p><strong>Veterinario:</strong> Dr. Pérez</p>
          </div>

          <h3 style={{ marginTop: "20px" }}>🔍 Revisión General</h3>
          <div style={{ background: "#e3f9e5", padding: "15px", borderRadius: "10px" }}>
            <p><strong>Estado general:</strong> Saludable</p>
            <p><strong>Observaciones:</strong> Buen estado de ánimo, apetito normal, sin signos visibles de dolor o infección.</p>
          </div>
          <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "10px" }}>
            <div >
              <strong>Fecha:</strong> 10/01/2025<br />
              <strong>Motivo de consulta:</strong> Vacunación<br />
              <strong>Diagnóstico:</strong> Salud óptima<br />
              <strong>Tratamiento:</strong> Aplicación de vacuna antirrábica<br />
              <strong>Veterinario:</strong> Dr. Ramírez
            </div>
            <div style={{ marginTop: "20px" }}>
              <strong>Fecha:</strong> 05/02/2025<br />
              <strong>Motivo de consulta:</strong> Desparasitación<br />
              <strong>Diagnóstico:</strong> Prevención<br />
              <strong>Tratamiento:</strong> Antiparasitario oral<br />
              <strong>Veterinario:</strong> Dra. Gómez
            </div>
            <div style={{ marginTop: "20px" }}>
              <strong>Fecha:</strong> 20/03/2025<br />
              <strong>Motivo de consulta:</strong> Infección en oído<br />
              <strong>Diagnóstico:</strong> Otitis externa<br />
              <strong>Tratamiento:</strong> Gotas óticas antibióticas<br />
              <strong>Veterinario:</strong> Dr. Pérez
            </div>
          </div>
        </section>
      );
    case 4:
      return (
        <div className={styles.containerProcess}>
          <div className={styles.steps}>
            <div className={`${styles.step} ${styles.completed}`}>
              <span className={styles.icon}>✔️</span>
              <p>Bañado</p>
            </div>
            <div className={`${styles.line} ${styles.completed}`}></div>
            <div className={`${styles.step} ${styles.completed}`}>
              <span className={styles.icon}>✔️</span>
              <p>Uñas</p>
            </div>
            <div className={`${styles.line} ${styles.incomplete}`}></div>
            <div className={`${styles.step} ${styles.incomplete}`}>
              <span className={styles.icon}>❌</span>
              <p>Desparasitación</p>
            </div>
            <div className={`${styles.line} ${styles.incomplete}`}></div>
            <div className={`${styles.step} ${styles.incomplete}`}>
              <span className={styles.icon}>❌</span>
              <p>Peluqueado</p>
            </div>
          </div>
          <p className={styles.message}>
            Tu mascota <strong>{pet.name}</strong> aún está en proceso de atención.<br />
            Te avisaremos cuando esté lista para ser recogida.<br /><br />
            ¡Gracias por tu paciencia! 🐾
          </p>
        </div>
      );
  }
}

export default History;