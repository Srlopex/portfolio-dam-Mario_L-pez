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