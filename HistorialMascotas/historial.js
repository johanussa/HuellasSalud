let mascota = null;

window.onload = function() {
    mascota = JSON.parse(localStorage.getItem("mascotaSeleccionada"));

    if (mascota) {
        document.getElementById("nombre").textContent = mascota.nombre;
        document.getElementById("foto").src = mascota.foto;
    } else {
        alert("No se encontró ninguna mascota.");
    }
};

document.querySelector(".btnVolver").addEventListener("click", () => {
    window.location.href = "index.html"; // Cambia el nombre por el archivo al que quieras ir
});

function mostrarContenido(opcion) {
    const contenedor = document.getElementById('opcion-contenido');
    let contenido = '';

    switch(opcion) {
        case 'tratamientos':
            contenido = `
                <h2>Tratamientos realizados</h2>
                <ul style="padding: 0; list-style: none;">
                    <li style="margin-bottom: 15px; background: #f0f0f0; padding: 10px; border-radius: 8px;">
                        <strong>Vacuna Antirrábica</strong><br>
                        Fecha: 10/01/2025<br>
                        Veterinario: Dr. Ramírez<br>
                        Observaciones: Sin reacciones adversas.
                    </li>
                    <li style="margin-bottom: 15px; background: #f0f0f0; padding: 10px; border-radius: 8px;">
                        <strong>Desparasitación interna</strong><br>
                        Fecha: 05/02/2025<br>
                        Veterinario: Dra. Gómez<br>
                        Observaciones: Repetir en 3 meses.
                    </li>
                    <li style="margin-bottom: 15px; background: #f0f0f0; padding: 10px; border-radius: 8px;">
                        <strong>Tratamiento para otitis</strong><br>
                        Fecha: 20/03/2025<br>
                        Veterinario: Dr. Pérez<br>
                        Observaciones: Aplicar gotas 2 veces al día por 7 días.
                    </li>
                </ul>
                <button>Actualizar</button>`;
            break;
        case 'informacion':
            contenido = `
                <h2>Información de la mascota</h2>
                <form id="infoMascota">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" value="${mascota ? mascota.nombre : ''}" /><br><br>

                    <label for="especie">Especie:</label>
                    <input type="text" id="especie" name="especie" value="${mascota ? mascota.especie : ''}" /><br><br>
            
                    <label for="raza">Raza:</label>
                    <input type="text" id="raza" name="raza" value="${mascota ? mascota.raza : ''}" /><br><br>
            
                    <label for="edad">Edad:</label>
                    <input type="text" id="edad" name="edad" value="${mascota ? mascota.edad : ''}" /><br><br>
            
                    <label for="peso">Peso:</label>
                    <input type="text" id="peso" name="peso" value="${mascota ? mascota.peso : ''}" /><br><br>
            
                    <label for="foto">Foto URL:</label>
                    <input type="text" id="foto" name="foto" value="${mascota ? mascota.foto : ''}" /><br><br>
            
                    <button type="button" onclick="guardarInformacion()">Guardar cambios</button>
                </form>`;
            break;            
        case 'historial':
            contenido = `
                <h2>Historial Clínico</h2>
                <h3>Resumen de la Mascota</h3>
                <div style="background: #eaf4f7; padding: 15px; border-radius: 10px;">
                    <p><strong>Nombre:</strong> ${mascota.nombre}</p>
                    <p><strong>Especie:</strong> ${mascota.especie}</p>
                    <p><strong>Raza:</strong> ${mascota.raza}</p>
                    <p><strong>Edad:</strong> ${mascota.edad}</p>
                    <p><strong>Peso:</strong> ${mascota.peso}</p>
                 </div>

                <h3 style="margin-top: 20px;">🩺 Último Procedimiento Realizado</h3>
                <div style="background: #fef6e4; padding: 15px; border-radius: 10px;">
                    <p><strong>Fecha:</strong> 20/03/2025</p>
                    <p><strong>Motivo:</strong> Infección en el oído</p>
                    <p><strong>Tratamiento:</strong> Aplicación de gotas antibióticas durante 7 días</p>
                    <p><strong>Veterinario:</strong> Dr. Pérez</p>
                </div>

                <h3 style="margin-top: 20px;">🔍 Revisión General</h3>
                <div style="background: #e3f9e5; padding: 15px; border-radius: 10px;">
                    <p><strong>Estado general:</strong> Saludable</p>
                    <p><strong>Observaciones:</strong> Buen estado de ánimo, apetito normal, sin signos visibles de dolor o infección.</p>
                </div>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 10px;">
                    <div style="margin-bottom: 20px;">
                        <strong>Fecha:</strong> 10/01/2025<br>
                        <strong>Motivo de consulta:</strong> Vacunación<br>
                        <strong>Diagnóstico:</strong> Salud óptima<br>
                        <strong>Tratamiento:</strong> Aplicación de vacuna antirrábica<br>
                        <strong>Veterinario:</strong> Dr. Ramírez
                    </div>
                    <div style="margin-bottom: 20px;">
                        <strong>Fecha:</strong> 05/02/2025<br>
                        <strong>Motivo de consulta:</strong> Desparasitación<br>
                        <strong>Diagnóstico:</strong> Prevención<br>
                        <strong>Tratamiento:</strong> Antiparasitario oral<br>
                        <strong>Veterinario:</strong> Dra. Gómez
                    </div>
                    <div>
                        <strong>Fecha:</strong> 20/03/2025<br>
                        <strong>Motivo de consulta:</strong> Infección en oído<br>
                        <strong>Diagnóstico:</strong> Otitis externa<br>
                        <strong>Tratamiento:</strong> Gotas óticas antibióticas<br>
                        <strong>Veterinario:</strong> Dr. Pérez
                    </div>
                </div>
                <button>Actualizar</button>`;
            break;
        case 'proceso':
            contenido = `
                <div class="proceso-contenedor">
                    <div class="pasos">
                        <div class="paso completado">
                            <span class="icono">✔️</span>
                            <p>Bañado</p>
                        </div>
                        <div class="linea completado"></div>
                        <div class="paso completado">
                            <span class="icono">✔️</span>
                            <p>Uñas</p>
                        </div>
                        <div class="linea incompleto"></div>
                        <div class="paso incompleto">
                            <span class="icono">❌</span>
                            <p>Desparasitación</p>
                        </div>
                        <div class="linea incompleto"></div>
                        <div class="paso incompleto">
                            <span class="icono">❌</span>
                            <p>Peluqueado</p>
                        </div>
                    </div>
                    <p class="mensaje">
                        Tu mascota <strong>${mascota.nombre}</strong> aún está en proceso de atención.<br>
                        Te avisaremos cuando esté lista para ser recogida.<br><br>
                        ¡Gracias por tu paciencia! 🐾
                    </p>
                </div>`;
            break;
    }

    contenedor.innerHTML = contenido;
}

