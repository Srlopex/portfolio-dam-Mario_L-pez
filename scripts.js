const botonTema = document.getElementById("temaBtn");

if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("dark-mode");
}

botonTema.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "oscuro");
    } else {
        localStorage.setItem("tema", "claro");
    }

});