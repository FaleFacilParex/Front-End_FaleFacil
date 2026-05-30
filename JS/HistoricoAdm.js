const tabelaBody = document.getElementById("tbodyReclamacoes");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.querySelector(".box_fil");

const API_URL = "http://10.110.12.66:1880/reclamacoes";
let reclamacoes = [];


async function buscarReclamacoes() {
    if (!tabelaBody) return; 
    try {
        const response = await axios.get(API_URL);
        reclamacoes = response.data;
        renderizarTabela(reclamacoes);
    } catch (erro) {
        console.error("Erro ao buscar reclamações:", erro);
    }
}


function renderizarTabela(lista) {
    if (!tabelaBody) return;
    tabelaBody.innerHTML = "";

    let acumuladorHtml = ""; 

    lista.forEach((r) => {

        const titulo = r.tituloDoProblema || r.titulodoproblema || r.titulo_do_problema || "Sem título";
        const urgencia = r.urgencia || "Não informada";
        const setor = r.setor || "Geral";
        const status = r.status || "Pendente";
        
        const dataFormatada = r.data_criacao 
            ? new Date(r.data_criacao).toLocaleDateString("pt-BR") 
            : "---";

        acumuladorHtml += `
          <tr onclick="abrirReclamacao(${r.id})" style="cursor: pointer;">
            <td>${r.id}</td>
            <td>${r.nome || "Não informado"}</td>
            <td>${titulo}</td>
            <td>${urgencia}</td>
            <td>${setor}</td>
            <td>${status}</td>
            <td>${dataFormatada}</td>
          </tr>
        `;
    });

    tabelaBody.innerHTML = acumuladorHtml;
}


if (pesquisa) {
    pesquisa.addEventListener("input", () => {
        const valor = pesquisa.value.toLowerCase();

        const filtradas = reclamacoes.filter((r) => {
            const nome = (r.nome || "").toLowerCase();
            const titulo = (r.tituloDoProblema || r.titulodoproblema || r.titulo_do_problema || "").toLowerCase();
            const setor = (r.setor || "").toLowerCase();
            const status = (r.status || "").toLowerCase();

            return nome.includes(valor) || titulo.includes(valor) || setor.includes(valor) || status.includes(valor);
        });

        renderizarTabela(filtradas);
    });
} else {
    console.warn("Aviso: Elemento com id 'pesquisa' não foi encontrado nesta página.");
}

if (filtro) {
    filtro.addEventListener("change", () => {
        const valor = filtro.value;
        let lista = [...reclamacoes];

        // STATUS
        if (valor === "resolvida" || valor === "pendente" || valor === "nao_resolvida") {
            lista = lista.filter((r) => {
                return (r.status || "").toLowerCase() === valor.toLowerCase();
            });
        }

        // RECENTES
        if (valor === "recentes") {
            lista.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
        }

        // ANTIGAS
        if (valor === "antigas") {
            lista.sort((a, b) => new Date(a.data_criacao) - new Date(b.data_criacao));
        }

        renderizarTabela(lista);
    });
} else {
    console.warn("Aviso: Elemento com a classe '.box_fil' não foi encontrado nesta página.");
}


function abrirReclamacao(id) {
    window.location.href = `TelaDeZoom.html?id=${id}`;
}


window.addEventListener("DOMContentLoaded", buscarReclamacoes);