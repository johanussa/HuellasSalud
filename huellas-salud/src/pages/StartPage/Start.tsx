import styles from './Start.module.css';

export const Start = () => {
    return (
        <Nabvar />
    )
}

const Nabvar = () => {

    return (
        <>
            <section className={styles.container}>
                <aside className={`${styles.linkOption} ${styles.logo}`}>
                    🦮 Huellas & Salud
                </aside>
                <aside className={styles.linkOption}>
                    | 🏠 Inicio
                </aside>
                <aside className={styles.linkOption}>
                    | 🔖 Productos
                </aside>
                <aside className={styles.linkOption}>
                    | ⛽ Servicios
                </aside>
                <aside className={styles.linkOption}>
                    | 📲 Contactos
                </aside>
                <aside className={styles.linkOption}>
                    🛒
                </aside>
            </section>
        </>
    )
}