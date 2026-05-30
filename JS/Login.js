const btnLogin = document.getElementById("LogIn");

btnLogin.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const re = document.getElementById("re").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha || !re) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const resposta = await axios.get("http://10.110.12.66:1880/usuarios", {
            params: {
                re: re,
                email: email,
                senha: senha
            }
        });

        const dadosRetornados = resposta.data;

        const usuarioEncontrado = dadosRetornados.find(u => 
            String(u.email).toLowerCase() === email.toLowerCase() && 
            String(u.re) === re && 
            String(u.senha) === senha
        );

        if (usuarioEncontrado) {
            alert("Login realizado!");

            localStorage.setItem('id_usuario', usuarioEncontrado.id);
            localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));


            const tipo = String(usuarioEncontrado.tipo_user).toLowerCase().trim();

            if (tipo === "adm") {
                window.location.href = "./Html/HistoricoAdm.html";
            } else {
                window.location.href = "./Html/FormularioDenuncia.html";
            }

        } else {
            alert("Email, RE ou senha inválidos!");
        }

    } catch (erro) {
        console.error(erro);
        alert("Erro no servidor!");
    }
});