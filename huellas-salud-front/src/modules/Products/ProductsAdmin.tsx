import { productosAdmin } from "./data";
import styles from "./productsAdmin.module.css";
import imgPrd from "../../assets/Huellas&Salud_3.png";

const ProductsAdmin = () => {

  const handlerFormatCoin = (precio: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(precio);
  }

  return (
    <main>
      <section className={styles.productsSection}>
        <div className={styles.title}>
          <h2>Listado de Productos</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Unidades</th>
              <th>Categoría</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody id="productos">
            {productosAdmin.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img src={imgPrd} alt={prod.nombre} />
                </td>
                <td>{prod.nombre}</td>
                <td>{handlerFormatCoin(prod.precio)}</td>
                <td>{prod.unidades}</td>
                <td>{prod.categoria}</td>
                <td className={styles.options}>
                  <button className={styles.editBtn}><i id="editar" className="fa-solid fa-pencil"></i></button>
                  <button className={styles.deleteBtn}><i id="eliminar" className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.addBtn}>
          Agregar Producto <i className="fa-solid fa-cart-plus"></i>
        </button>
      </section>
      <section className={styles.modalEdit}>
        <div className={styles.editProduct}>

          <h1 className={styles.editionTitle}>Modificación del producto</h1>
          <div className={styles.image}>
            <div className={styles.imageProd}>
              <img src={imgPrd} alt="" />
            </div>
            <button>Cargar imagen</button>
          </div>
          <div className={styles.information}></div>
          <div className={styles.button}>
            <button className={styles.updateBtn}>Actualizar producto</button>
          </div>
          <div className={styles.modalClose} >
            <i className={`fa-solid fa-square-xmark ${styles.btnClose}`}></i>
          </div>
        </div>
        <div className={styles.deleteProduct} >
          <h1>Eliminar producto</h1>
          <h2 className={styles.deleteMsg}>¿Seguro que quieres eliminar el producto Comida de perro?</h2>
          <div className={styles.buttons}>
            <button className={styles.btnConfirmDelete}>Sí, eliminar</button>
            <button className={styles.btnCancelDelete} >No, cancelar</button>
          </div>
        </div>
        <div className={styles.addProduct}>
          <h1 className={styles.editionTitle}>Agregar producto</h1>
          <div className={styles.image}>
            <div className={styles.imageProd}>
              <img src={imgPrd} alt="" />
            </div>
            <button>Cargar imagen</button>
          </div>
          <div className={styles.addInformation}></div>
          <div className={styles.button}>
            <button className={styles.updateBtn}>Agregar producto</button>
          </div>
          <div className={styles.modalClose} >
            <i className={`fa-solid fa-square-xmark ${styles.btnClose}`}></i>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductsAdmin;