const fichas = document.querySelector(".fichasMascotas");

const mascotas = [
    {
        nombre: "Pelusa",
        foto: "./fotos/pelusa.jpg",
        especie: "Gato",
        raza: "Persa",
        edad: "2 años",
        peso: "4.5 kg"
    },
    {
        nombre: "Simba",
        foto: "./fotos/simba.jpg",
        especie: "Perro",
        raza: "Golden Retriever",
        edad: "3 años",
        peso: "28 kg"
    }
];

function fichasMascotas(){
    fichas.innerHTML = "";

    mascotas.forEach(m => {
        const ficha = document.createElement("div");
        ficha.classList.add("fichaMascota");
        ficha.innerHTML = `
            <p>${m.nombre}</p>
            <img class="fotoMascota" src="${m.foto}">
            <button>Ver Historial</button>
        `;

        ficha.addEventListener("click", () => {
            localStorage.setItem("mascotaSeleccionada", JSON.stringify(m));
            window.location.href = "historial.html"; // o el nombre de tu otra página
        });

        fichas.appendChild(ficha);
    });
}

let estadoModal = false;

function modal(){
    estadoModal = !estadoModal;

    const modal = document.querySelector(".modalAgregar");

    if(estadoModal) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

function agregarMascota(){
    const nombre = document.getElementById("nombre").value;
    const especie = document.getElementById("especie").value;
    const raza = document.getElementById("raza").value;
    const peso = document.getElementById("peso").value;
    const edad = document.getElementById("edad").value;
    const foto = "./fotos/michifu.jpg";

    const nuevaMascota = {
        nombre: nombre,
        foto: foto,
        especie: especie,
        raza: raza,
        peso: peso,
        edad: edad
    };

    mascotas.push(nuevaMascota);
    fichasMascotas();
    modal();
}

fichasMascotas();