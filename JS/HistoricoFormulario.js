const cardreclamcao = document.querySelector('.recl_poss');
const idUsuarioLogado = localStorage.getItem('id_usuario');

async function buscarreclamacai() {
    try {
        const respota = await axios.get('http://10.110.12.66:1880/reclamacoes/' + idUsuarioLogado);
        const denuncia = respota.data;

        renderizarCards(denuncia);
    } catch (erro) {
        console.error("erro ao buscar resposta do axios", erro);
        cardreclamcao.innerHTML = "<p style='color: red;'>Erro ao carregar as denúncias</p>";
    }
}

function renderizarCards(listaDeDenuncias) {
    cardreclamcao.innerHTML = "";

    if (!listaDeDenuncias || listaDeDenuncias.length === 0) {
        cardreclamcao.innerHTML = "<p>Nenhuma denúncia cadastrada no momento.</p>";
        return; 
    }

    listaDeDenuncias.forEach(denuncia => {
        // Trata o status para evitar quebras por maiúsculas/minúsculas ou espaços vazios
        const statusTexto = denuncia.status || 'Pendente';
        const statusNormalizado = statusTexto.toLowerCase().replace(/\s+/g, '_');

        // Define a classe de cor baseada no status mapeado
        let classeCorStatus = "status_pendente"; // Cor padrão caso não bata com nenhuma abaixo

        if (statusNormalizado === "resolvida" || statusNormalizado === "resolvido") {
            classeCorStatus = "status_resolvida";
        } else if (statusNormalizado === "nao_resolvida" || statusNormalizado === "não_resolvida") {
            classeCorStatus = "status_nao_resolvida";
        }

        const cardhtml = `
        <header class="Box_recl">
            <div class="inf_card">
                <p>Nome: <span>${denuncia.nome || 'Anônimo'}</span></p>
                <p>Titulo do Problema: <span>${denuncia.tituloDoProblema || denuncia.titulodoproblema || denuncia.titulo_do_problema || 'Sem título'}</span></p>
                <p>Descrição: <span>${denuncia.descricao || 'Sem descrição'}</span></p>            
            </div>

            <div class="Box_status ${classeCorStatus}">
                <p>${statusTexto}</p>            
            </div>
        </header>
        `;

        cardreclamcao.innerHTML += cardhtml;
    });
}

window.addEventListener('DOMContentLoaded', buscarreclamacai);