const btnLogin = document.getElementById("LogIn");

btnLogin.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const re = document.getElementById("re").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha || !re) {
        alert("Preencha todos os campos!");
        return;
    }

    try {

        const resposta = await axios.get("http://10.110.12.17:1880/usuarios", {
            params: {
                re: re,
                email: email,
                senha: senha
            }
        });

        const usuario = resposta.data;

        if (usuario.length > 0) {

            alert("Login realizado!");

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario[0])
            );

            window.location.href = "./Html/HistoricoFuncionario.html";

        } else {
            alert("Email ou senha inválidos!");
        }

    } catch (erro) {
        console.error(erro);
        alert("Erro no servidor!");
    }
});