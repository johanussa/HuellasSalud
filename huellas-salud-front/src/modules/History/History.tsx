import styles from "./history.module.css";
import imgPet from "../../assets/simba.webp";
import { useState } from "react";

const History = () => {

  const [detailPet, setDetailPet] = useState<boolean>(true);
  const [viewListPet, setViewListPet] = useState<boolean>(false);

  return (
    <main className={styles.historySection}>
      <section className={styles.headerBtns}>
        <button className={styles.historyBtn} onClick={() => { setViewListPet(true); setDetailPet(false); }}>
          <i className="fa-solid fa-arrow-left" /> Volver
        </button>
        <button className={styles.historyBtn}><i className="fa-solid fa-paw" /> Agregar mascota</button>
      </section>
      <h2 className={styles.titleOwner}>Mascotas de Carlos Puentes</h2>
      {viewListPet && (
        <section className={styles.cardContainer}>
          <aside className={styles.cardPet}>
            <p>Mailon</p>
            <img className={styles.petImg} src={imgPet} />
            <button className={styles.historyBtn} onClick={() => { setViewListPet(false); setDetailPet(true); }}>Ver Historial</button>
          </aside>
        </section>
      )}
      {detailPet && (
        <section className={styles.historyContainer}>
          <aside className={styles.photoPet}>
            <h1>Mailon</h1>
            <img src={imgPet} alt="Foto" width="200" />
          </aside>
          <aside className={styles.informationPet}>
            <section className={styles.options}>
              <ul>
                <li>Tratamientos</li>
                <li>Información</li>
                <li>Historial</li>
                <li>Proceso</li>
              </ul>
              <h3>Contenido</h3>
            </section>
          </aside>
        </section>
      )}
    </main>
  );
}

export default History;