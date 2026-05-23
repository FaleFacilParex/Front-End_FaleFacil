window.addEventListener('DOMContentLoaded', () => {

    const URL_ALTERAR_SENHA = 'http://10.110.12.84:1880/alterasenha';

    const form = document.getElementById('formRedefinirSenha');
    const inputSenha = document.getElementById('novaSenha');
    const inputConfirmarSenha = document.getElementById('confirmarSenha');
    const txtStatus = document.getElementById('mensagemStatus');
    const btnConfirmar = document.getElementById('btnConfirmar');

    // Pesca o ID dinâmico da URL (?id=X)
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('id');

    // Se não tiver ID na URL, bloqueia o botão por segurança
    if (!usuarioId) {
        exibirMensagem("Erro: ID de usuário inválido. Volte e confirme o e-mail.", "erro");
        if (btnConfirmar) btnConfirmar.disabled = true;
        return;
    }

    if (form) {
        form.addEventListener('submit', enviarNovaSenha);
    }

    async function enviarNovaSenha(evento) {
        evento.preventDefault();

        const senha = inputSenha.value.trim();
        const confirmarSenha = inputConfirmarSenha.value.trim();

        if (senha !== confirmarSenha) {
            exibirMensagem("As senhas digitadas não são iguais!", "erro");
            return;
        }

        configurarEstadoCarregamento(true, "Atualizando senha...");

        try {
            // Substituído o fetch por axios.put de forma direta e limpa
            const resposta = await axios.put(`${URL_ALTERAR_SENHA}/${usuarioId}`, {
                senha: senha
            });

            // O Axios valida status de sucesso (200-299). Se chegou aqui, deu certo!
            if (resposta.status === 200) {
                alert("Sua senha foi alterada com sucesso!");
                form.reset();
                // Opcional: Redirecionar para o login aqui se preferir
                // window.location.href = "Login.html";
            }

        } catch (erro) {
            console.error("Erro no envio:", erro);
            
            // O Axios joga erros de status (ex: 400, 404, 500) direto no catch
            if (erro.response) {
                exibirMensagem("Erro ao atualizar a senha no servidor.", "erro");
            } else {
                exibirMensagem("Não foi possível conectar ao servidor.", "erro");
            }
            configurarEstadoCarregamento(false);
        }
    }

    function exibirMensagem(texto, tipo) {
        if (txtStatus) {
            txtStatus.innerText = texto;
            txtStatus.className = `mensagem-status ${tipo}`;
        }
    }

    function configurarEstadoCarregamento(estaCarregando, texto = "Processando...") {
        if (btnConfirmar) btnConfirmar.disabled = estaCarregando;
        if (estaCarregando) {
            exibirMensagem(texto, "carregando");
        }
    }
});