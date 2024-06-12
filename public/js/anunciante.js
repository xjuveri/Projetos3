import Conteudo from './conteudo.js';

class Anuncio extends Conteudo {
    constructor(nome, proposta, urlImagem) {
        super(nome);  // Chama o construtor da classe base
        this.id = Date.now();  // Usar timestamp como ID único
        this.proposta = proposta;
        this.urlImagem = urlImagem;
        this.ativo = false;
    }

    enviarSolicitacao() {
        const anuncio = {
            id: this.id,
            anunciante: this.titulo,  // Usando 'titulo' da classe base
            proposta: this.proposta,
            urlImagem: this.urlImagem,
            ativo: this.ativo
        };

        fetch('/api/anuncios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(anuncio)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar a solicitação');
        });
    }
}

export default Anuncio;
