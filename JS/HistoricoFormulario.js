const cardreclamcao = document.querySelector('.recl_poss');
const idUsuarioLogado = localStorage.getItem('id_usuario');

async function buscarreclamacai() {
    try {
        const respota = await axios.get('http://10.110.12.84:1880/reclamacoes/' + idUsuarioLogado);
        const denuncia = respota.data;

        renderizarCards(denuncia);
    } catch (erro) {
        console.error("erro ao buscar resposta do axios", erro);
        // Correção das aspas no style
        cardreclamcao.innerHTML = "<p style='color: red;'>Erro ao carregar as denúncias</p>";
    }
}

function renderizarCards(listaDeDenuncias) {
    cardreclamcao.innerHTML = "";
    
    // Correção: de 'legth' para 'length'
    if (!listaDeDenuncias || listaDeDenuncias.length === 0) {
        cardreclamcao.innerHTML = "<p>Nenhuma denúncia cadastrada no momento.</p>";
        return; // Coloquei o return para ele parar aqui caso não tenha nada
    }

    // Correção: removido o '.array' que não existe
    listaDeDenuncias.forEach(denuncia => {
        
        const cardhtml = `
        <header class="Box_recl">

        <div class="inf_card">
          <p>Nome: <span>${denuncia.nome || 'Anônimo'}</span></p>
          <p>Titulo do Problema: <span>${denuncia.titulo_problema || denuncia.problema}</span></p>
          <p>Descrição: <span>${denuncia.descricao}</span></p>            
        </div>

        <div class="Box_status">
          <p id="status">${denuncia.status || 'Em andamento'}</p>            
        </div>
     
      </header>
        `;

        cardreclamcao.innerHTML += cardhtml;
    });
}

window.addEventListener('DOMContentLoaded', buscarreclamacai);