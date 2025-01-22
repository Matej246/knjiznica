document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const knjigaForm = document.getElementById("knjiga-form");
    const knjigeLista = document.getElementById("knjige-lista");

    // Kod za registraciju
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("reg-username").value;
            const email = document.getElementById("reg-email").value;
            const password = document.getElementById("reg-password").value;

            fetch("http://localhost:3000/registracija", {  // Promijenjeno u "/registracija"
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.message);
                    if (data.message === "Korisnik uspješno registriran!") {
                        // Možete preusmjeriti na prijavu ili početnu stranicu
                    }
                })
                .catch((err) => console.error(err));
        });
    }

    // Za prijavu
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            fetch("http://localhost:3000/prijava", {  // Promijenjeno u "/prijava"
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.message);
                    if (data.message === "Prijava uspješna!") {
                        // Nakon uspješne prijave, možete preusmjeriti korisnika na stranicu s knjigama ili profil.
                    }
                })
                .catch((err) => console.error(err));
        });
    }

    // Unos knjige
    if (knjigaForm) {
        knjigaForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const inventarniBroj = document.getElementById("inventarniBroj").value;
            const brojPosudbe = document.getElementById("brojPosudbe").value;
            const autor = document.getElementById("autor").value;

            fetch("http://localhost:3000/knjige", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inventarniBroj, brojPosudbe, autor }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.message);
                    fetchKnjige(); // Osvježite popis knjiga nakon unosa
                })
                .catch((err) => console.error(err));
        });
    }

    // Dohvat knjiga
    function fetchKnjige() {
        fetch("http://localhost:3000/knjige")
            .then((res) => res.json())
            .then((data) => {
                knjigeLista.innerHTML = ""; 
                data.forEach((knjiga) => {
                    const li = document.createElement("li");
                    li.textContent = `Inventarni broj: ${knjiga.inventarniBroj}, Posudba: ${knjiga.brojPosudbe}, Autor: ${knjiga.autor}`;

                    // Gumb "Obriši"
                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Obriši";
                    deleteButton.style.marginLeft = "10px";

                    deleteButton.addEventListener("click", () => {
                        fetch(`http://localhost:3000/knjige/${knjiga.inventarniBroj}`, {
                            method: "DELETE",
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                alert(data.message);
                                fetchKnjige(); // Osvježavanje popisa knjiga nakon brisanja
                            })
                            .catch((err) => console.error(err));
                    });

                    li.appendChild(deleteButton);
                    knjigeLista.appendChild(li);
                });
            })
            .catch((err) => console.error(err));
    }

    fetchKnjige();
});
