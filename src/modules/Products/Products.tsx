import { carrito, categorias, marcas, productos } from './data';
import styles from './products.module.css';
import imgPrd from '../../assets/Huellas&Salud_3.png';

const Products = () => {

	const handlerFormatCoin = (precio: number): string => {
		return new Intl.NumberFormat("es-CO", {
			style: "currency",
			currency: "COP",
			minimumFractionDigits: 0
		}).format(precio);
	}

	return (
		<main className={styles.containProducts}>
			<section className={styles.containFilter}>
				<div className={styles.sectionFilter}>
					{/* <div className="tituloFiltro" onclick="cambiarFiltro('categoria')"> */}
					<div className={styles.titleFilter}>
						Categoría<span><i className="fa-solid fa-square-caret-down"></i></span>
					</div>
					<div className={styles.filterContain}>
						{/* <input type="text" className="buscar" placeholder="Buscar..." onkeyup="filtrarLista('listaCategoria', this.value)"> */}
						<input type="text" className={styles.search} placeholder="Buscar..." />
						<div className={styles.listCheckbox}>
							{categorias.map(category => (
								<label key={category.nombre}><input type="checkbox" value={category.nombre} /> {category.nombre}</label>
							))}
						</div>
					</div>
				</div>
				<div className={styles.sectionFilter}>
					{/* <div className="tituloFiltro" onclick="cambiarFiltro('marca')"> */}
					<div className={styles.titleFilter}>
						Marca<span><i className="fa-solid fa-square-caret-down"></i></span>
					</div>
					<div className={styles.filterContain}>
						{/* <input type="text" className="buscar" placeholder="Buscar..." onkeyup="filtrarLista('listaMarca', this.value)"> */}
						<input type="text" className={styles.search} placeholder="Buscar..." />
						<div className={styles.listCheckbox}>
							{marcas.map(marca => (
								<label key={marca.nombre}><input type="checkbox" value={marca.nombre} /> {marca.nombre}</label>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className={styles.productCardContainer}>
				{productos.map(prod => (
					<div className={styles.cardProduct} key={prod.name}>
						<img src={imgPrd} alt={prod.name} />
						<div className={styles.productName}><h1>{prod.name}</h1></div>
						<h3 className={styles.productPrice}>Precio: {handlerFormatCoin(prod.price)}</h3>
						<h4>Cantidad:
							<input min="1" type="number" id="cantidad-${nombre}" />
						</h4>
						{/* <button className="boton" onclick="agregarCarrito('${nombre}', '${precio}', '${imagen}', 'cantidad-${nombre}')"> */}
						<button className={styles.productBtn}>
							Agregar al carrito
						</button>
					</div>
				))}
			</section>
			{/* <div className="iconoCarrito" id="iconoCarrito" onclick="abrirCarrito()"> */}
			<div className={styles.cartIcon} id="iconoCarrito">
				<div className={styles.amount} id="cantidad"></div>
				<i className="fa-solid fa-cart-shopping"></i>
			</div>
			<section style={{ display: "none" }}>
				{carrito.map((prod) => (
					<div className="carrito-item" key={prod.name}>
						<img src={prod.image} alt={prod.name} />
						<p>${prod.name}<br /> ${handlerFormatCoin(prod.price)} x
							{/* <input className="cantCarrito" type="number" min="1" value="${cantidad}" onchange="actualizarCantidad('${nombre}', this.value)" /> */}
							<input className="cantCarrito" type="number" min="1" value={prod.amount} />
						</p>
						{/* <button className="botonProducto" onclick="eliminarDelCarrito('${nombre}')"> */}
						<button className="botonProducto">
							<i className="fa-solid fa-trash-can" />
						</button>
					</div>
				))}
			</section>
		</main>
	);
}

export default Products;