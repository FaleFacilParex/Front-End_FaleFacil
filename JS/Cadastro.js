const btnSignup = document.getElementById("Signup");

btnSignup.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const re = document.getElementById("re").value;
    const senha = document.getElementById("senha").value;

    if (!email || !re || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const usuario = {
        email,
        re,
        senha
    };

     try {
        const resposta = await axios.post(
            "http://10.110.12.17:1880/usuarios",
            usuario
        );

        alert("Cadastro realizado!");
        console.log(resposta.data);

    } catch (erro) {
        console.error(erro);
        alert("Erro ao cadastrar!");
    }
});