// =========================
// MODO OSCURO
// =========================

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


// =========================
// ESTUDIOS DINÁMICOS
// =========================

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

const listaEstudios =
    document.getElementById("lista-estudios");

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


// =========================
// NUEVO ESTUDIO
// =========================

estudios.push({

    titulo: "Curso de JavaScript",
    centro: "Udemy",
    año: 2026

});

mostrarEstudios();


// =========================
// GITHUB API
// =========================

const buscarGithub =
    document.getElementById("buscarGithub");

const perfilGithub =
    document.getElementById("perfilGithub");

const reposGithub =
    document.getElementById("reposGithub");


// Evento botón

buscarGithub.addEventListener(
    "click",
    cargarGithub
);


// =========================
// FUNCIÓN GITHUB
// =========================

async function cargarGithub() {

    // Obtener username

    const username =
        document.getElementById("githubUser")
            .value
            .trim();


    // Validación

    if (username === "") {

        alert("Introduce un usuario de GitHub");

        return;

    }


    // Loader

    perfilGithub.innerHTML = `
        <p>Cargando perfil...</p>
    `;

    reposGithub.innerHTML = `
        <p>Cargando repositorios...</p>
    `;


    try {

        // =========================
        // FETCH PERFIL
        // =========================

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );


        // Error HTTP

        if (!response.ok) {

            throw new Error("Error al obtener usuario");

        }

        const data = await response.json();


        // Guardar usuario

        localStorage.setItem(
            "githubUser",
            username
        );


        // =========================
        // MOSTRAR PERFIL
        // =========================

        perfilGithub.innerHTML = `

            <article>

                <img
                    src="${data.avatar_url}"
                    alt="${data.login}"
                    width="150"
                    style="
                        border-radius: 50%;
                        margin-bottom: 10px;
                    "
                >

                <h3>${data.login}</h3>

                <p>
                    ${data.bio || "Sin biografía"}
                </p>

                <p>
                    Repositorios públicos:
                    ${data.public_repos}
                </p>

                <p>
                    Seguidores:
                    ${data.followers}
                </p>

                <a
                    href="${data.html_url}"
                    target="_blank"
                >
                    Ver perfil
                </a>

            </article>

        `;


        // =========================
        // FETCH REPOSITORIOS
        // =========================

        const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos`
        );


        // Error HTTP

        if (!reposResponse.ok) {

            throw new Error(
                "Error al obtener repositorios"
            );

        }

        const repos =
            await reposResponse.json();


        // Limpiar repos

        reposGithub.innerHTML = "";


        // Sin repositorios

        if (repos.length === 0) {

            reposGithub.innerHTML = `
                <p>No hay repositorios</p>
            `;

            return;

        }


        // Ordenar repositorios por estrellas

        repos.sort(function (a, b) {

            return (
                b.stargazers_count -
                a.stargazers_count
            );

        });


        // =========================
        // RECORRER REPOS
        // =========================

        repos.forEach(function (repo) {

            reposGithub.innerHTML += `

                <article style="margin-bottom: 15px;">

                    <h3>${repo.name}</h3>

                    <p>
                        ${repo.description || "Sin descripción"}
                    </p>

                    <p>
                        Lenguaje:
                        ${repo.language || "No especificado"}
                    </p>

                    <p>
                        ⭐ ${repo.stargazers_count}
                    </p>

                    <a
                        href="${repo.html_url}"
                        target="_blank"
                    >
                        Ver repositorio
                    </a>

                </article>

            `;

        });

    } catch (error) {

        perfilGithub.innerHTML = `
            <p>Error al cargar GitHub</p>
        `;

        reposGithub.innerHTML = "";

        console.error(error);

    }

}


// =========================
// CARGAR ÚLTIMO USUARIO
// =========================

window.addEventListener("load", function () {

    const ultimoUsuario =
        localStorage.getItem("githubUser");

    if (ultimoUsuario) {

        document.getElementById("githubUser").value =
            ultimoUsuario;

        cargarGithub();

    }

});