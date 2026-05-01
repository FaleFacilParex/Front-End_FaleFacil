import axios from "axios";

async function enviarReclamacao(dados) {
    try {
        const response = await axios.post(
            "http://localhost:1880/reclamacoes",
            dados
        );

        console.log(response.data);

    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}