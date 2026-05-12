const botonTema = document.getElementById("temaBtn");

if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("dark-mode");
    botonTema.textContent = "Activar modo claro";
}

botonTema.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "oscuro");
        botonTema.textContent = "Activar modo claro";
    } else {
        localStorage.setItem("tema", "claro");
        botonTema.textContent = "Activar modo oscuro";
    }

});


const estudios = [
    {
        titulo: "Desarrollo de Aplicaciones Multiplataforma",
        centro: "IES Gregorio Prieto",
        año: 2025
    },

    {
        titulo: "Sistemas Microinformáticos y Redes",
        centro: "IES Gregorio Prieto",
        año: 2024
    }
];

const listaEstudios = document.getElementById("lista-estudios");

function mostrarEstudios() {

    listaEstudios.innerHTML = "";

    estudios.forEach(function (estudio) {

        listaEstudios.innerHTML += `

            <article>
                <h3>${estudio.titulo}</h3>
                <p>${estudio.centro}</p>
                <p>${estudio.año}</p>
            </article>

        `;

    });

}

mostrarEstudios();

estudios.push({
    titulo: "Curso de JavaScript",
    centro: "Udemy",
    año: 2026
});

mostrarEstudios();