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
            // Faz o PUT para /alterasenha/ID_CERTO_DA_PESSOA
            const resposta = await fetch(`${URL_ALTERAR_SENHA}/${usuarioId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                // Envia apenas o objeto { senha: "..." } esperado pelo seu back-end
                body: JSON.stringify({
                    senha: senha
                })
            });

            if (resposta.ok) {
                alert("Sua senha foi alterada com sucesso!");
                form.reset();
                // Opcional: Redirecionar para o login aqui
                // window.location.href = "Login.html";
            } else {
                exibirMensagem("Erro ao atualizar a senha no servidor.", "erro");
                configurarEstadoCarregamento(false);
            }

        } catch (erro) {
            console.error("Erro no envio:", erro);
            exibirMensagem("Não foi possível conectar ao servidor.", "erro");
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