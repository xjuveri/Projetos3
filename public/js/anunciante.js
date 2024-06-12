class Anunciante {
    constructor(nome, proposta, urlImagem) {
        this.id = Date.now();  // Usar timestamp como ID único
        this.nome = nome;
        this.proposta = proposta;
        this.urlImagem = urlImagem;
    }

    enviarSolicitacao() {
        const anuncio = {
            id: this.id,
            anunciante: this.nome,
            proposta: this.proposta,
            urlImagem: this.urlImagem,
            ativo: false
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
