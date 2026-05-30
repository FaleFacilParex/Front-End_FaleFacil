const URL_BUSCA_USUARIO = 'http://10.110.12.66:1880/usuarios';

const form = document.getElementById('formConfirmeEmail');
const inputEmail = document.getElementById('email');
const inputConfirmarEmail = document.getElementById('confirmarEmail');
const txtStatus = document.getElementById('mensagemStatus');
const btnConfirmar = document.getElementById('btnConfirmar');

form.addEventListener('submit', verificarEmailEAvancar);

async function verificarEmailEAvancar(evento) {
    evento.preventDefault();

    const email = inputEmail.value.trim();
    const emailConfirmacao = inputConfirmarEmail.value.trim();

    if (email !== emailConfirmacao) {
        exibirMensagem("Os e-mails digitados não são iguais!", "erro");
        return;
    }

    configurarEstadoCarregamento(true, "Verificando e-mail...");

    try {
  
        const resposta = await axios.get(URL_BUSCA_USUARIO, {
            params: { email: email }
        });

        const usuarios = resposta.data;

        if (usuarios && usuarios.length > 0) {
            const usuarioEncontrado = usuarios[0];

            alert("E-mail confirmado com sucesso! Redirecionando...");

            window.location.href = `ConfirmarSenha.html?id=${usuarioEncontrado.id}`;
        } else {
            exibirMensagem("Este e-mail não está cadastrado no sistema.", "erro");
            configurarEstadoCarregamento(false);
        }

    } catch (erro) {
        console.error("Erro na busca:", erro);
        exibirMensagem("Não foi possível conectar ao servidor.", "erro");
        configurarEstadoCarregamento(false);
    }
}

function exibirMensagem(texto, tipo) {
    txtStatus.innerText = texto;
    txtStatus.className = `mensagem-status ${tipo}`;
}

function configurarEstadoCarregamento(estaCarregando, texto = "Processando...") {
    btnConfirmar.disabled = estaCarregando;
    if (estaCarregando) {
        exibirMensagem(texto, "carregando");
    }
}