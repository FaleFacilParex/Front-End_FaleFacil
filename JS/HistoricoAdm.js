const tabelaBody = document.getElementById("tbodyReclamacoes");

const pesquisa = document.getElementById("pesquisa");

const filtro = document.querySelector(".box_fil");

const API_URL = "http://10.110.12.83:1880/reclamacoes";

let reclamacoes = [];

// ==========================================
// BUSCAR RECLAMAÇÕES
// ==========================================
async function buscarReclamacoes() {

    try {

        const response = await axios.get(API_URL);

        reclamacoes = response.data;

        renderizarTabela(reclamacoes);

    } catch (erro) {

        console.error(
            "Erro ao buscar reclamações:",
            erro
        );

    }

}

// ==========================================
// RENDERIZAR TABELA
// ==========================================
function renderizarTabela(lista) {

  tabelaBody.innerHTML = "";

  lista.forEach((r) => {

    const dataFormatada =
      new Date(r.data_criacao)
      .toLocaleDateString("pt-BR");

    const linha = `
      <tr onclick="abrirReclamacao(${r.id})">

        <td>${r.id}</td>

        <td>${r.nome || "Não informado"}</td>

        <td>${r.tituloDoProblema}</td>

        <td>${r.urgencia}</td>

        <td>${r.setor}</td>

        <td>${r.status}</td>

        <td>${dataFormatada}</td>

      </tr>
    `;

    tabelaBody.innerHTML += linha;

  });

}
// ==========================================
// PESQUISA
// ==========================================
pesquisa.addEventListener("input", () => {

    const valor =
        pesquisa.value.toLowerCase();

    const filtradas =
        reclamacoes.filter((r) => {

            return (

                (r.nome || "")
                    .toLowerCase()
                    .includes(valor)

                ||

                r.tituloDoProblema
                    .toLowerCase()
                    .includes(valor)

                ||

                r.setor
                    .toLowerCase()
                    .includes(valor)

                ||

                r.status
                    .toLowerCase()
                    .includes(valor)

            );

        });

    renderizarTabela(filtradas);

});

// ==========================================
// FILTRO
// ==========================================
filtro.addEventListener("change", () => {

    const valor = filtro.value;

    let lista = [...reclamacoes];

    // ==========================
    // STATUS
    // ==========================
    if (
        valor === "resolvida" ||
        valor === "pendente" ||
        valor === "nao_resolvida"
    ) {

        lista = lista.filter((r) => {

            return (
                r.status.toLowerCase()
                === valor.toLowerCase()
            );

        });

    }

    // ==========================
    // RECENTES
    // ==========================
    if (valor === "recentes") {

        lista.sort((a, b) => {

            return (
                new Date(b.data_criacao)
                - new Date(a.data_criacao)
            );

        });

    }

    // ==========================
    // ANTIGAS
    // ==========================
    if (valor === "antigas") {

        lista.sort((a, b) => {

            return (
                new Date(a.data_criacao)
                - new Date(b.data_criacao)
            );

        });

    }

    renderizarTabela(lista);

});

// ==========================================
// INICIAR
// ==========================================


function abrirReclamacao(id) {

  window.location.href =
  `TelaDeZoom.html?id=${id}`;

}

buscarReclamacoes();