const formulario = document.getElementById("InfoRecla")

document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault();


    const reclamacao = {
        nomeopc: document.getElementById('NomOpic').value,
        setor: document.getElementById('reclasetor').value,
        area: document.getElementById('reclaarea').value,
        urgencia: document.getElementById('reclaurge').value,
        tituloDoProblema: document.getElementById('reclatitu').value, 
        descricao: document.getElementById('recladesc').value,
        status: "Pendente"
    }
    console.log('funciona')
    try{
        const resposta = await axios.post ('http://10.110.12.77:1880/reclamacoes', reclamacao)
        console.log('Resposta do servidor:', resposta.data)
        alert('Dados Enviados com sucesso')
        formulario.reset();
    }
    catch (erro) {
        // No Axios, se o servidor responder com erro (ex: 400 ou 500), ele cai direto aqui
        if (erro.response) {
            // O servidor respondeu com um status fora da faixa 2xx
            console.error('Erro do Servidor:', erro.response.data);
        } else {
            // Aconteceu algo na configuração ou rede
            console.error('Erro na requisição:', erro.message);
        }
        alert('Erro ao enviar os dados.');
    }
});
