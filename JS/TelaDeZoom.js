const API_URL =
"http://10.110.12.66:1880/reclamacoes";

const params =
new URLSearchParams(window.location.search);

const id =
Number(params.get("id"));

let reclamacao = null;


async function buscarReclamacao() {

  try {

    const response =
    await axios.get(API_URL);

    const lista = response.data;

    console.log(lista);

    reclamacao =
    lista.find(r => Number(r.id) === id);

    if (!reclamacao) {

      alert("Reclamação não encontrada");

      return;
    }

    preencherDados();

  } catch (erro) {

    console.error(
      "ERRO AO BUSCAR:",
      erro
    );

  }

}



function preencherDados() {

  document.getElementById("nome")
  .innerText =
  reclamacao.nome || "Não informado";

  document.getElementById("titulo")
  .innerText =
  reclamacao.tituloDoProblema;

  document.getElementById("setor")
  .innerText =
  reclamacao.setor;

  document.getElementById("descricao")
  .innerText =
  reclamacao.descricao;

  document.getElementById("urgencia")
  .innerText =
  `Urgência: ${reclamacao.urgencia}`;

  document.getElementById("status")
  .value =
  reclamacao.status;

}


document.getElementById("salvar")
.addEventListener("click", async () => {

  try {

    if (!reclamacao) {

      alert("Erro na reclamação");

      return;
    }

    reclamacao.status =
    document.getElementById("status").value;

    await axios.put(

      `${API_URL}/${id}`,

      reclamacao

    );

    alert("Status atualizado!");

  } catch (erro) {

    console.error(
      "ERRO PUT:",
      erro
    );

    alert("Erro ao atualizar");

  }

});


buscarReclamacao();