const formulario = document.getElementById("InfoRecla")

const idUsuarioLogado = localStorage.getItem('id_usuario');

document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault();

    const reclamacao = {
        id_usuario: idUsuarioLogado,
        nome: document.getElementById('NomOpic').value,
        setor: document.getElementById('reclasetor').value,
        area: document.getElementById('reclaarea').value,
        urgencia: document.getElementById('reclaurge').value,
        tituloDoProblema: document.getElementById('reclatitu').value, 
        descricao: document.getElementById('recladesc').value,
        status: "Pendente"
    }
    
    try {
        const resposta = await axios.post('http://10.110.12.66:1880/reclamacoes', reclamacao);
        console.log('Resposta do servidor:', resposta.data);
        alert('Dados Enviados com sucesso');
        formulario.reset();
    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }
});