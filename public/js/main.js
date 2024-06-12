document.getElementById('solicitacao-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const proposta = document.getElementById('proposta').value;
    const urlImagem = document.getElementById('urlImagem').value;

    const anunciante = new Anunciante(nome, proposta, urlImagem);
    anunciante.enviarSolicitacao();

    this.reset();
});

document.getElementById('load-anuncios').addEventListener('click', function () {
    BancoDeDados.carregarAnuncios().then(anuncios => {
        const anunciosList = document.getElementById('anuncios-list');
        anunciosList.innerHTML = '';
        anuncios.forEach((anuncio) => {
            if (!anuncio.ativo) {
                const anuncioDiv = document.createElement('div');
                anuncioDiv.className = 'anuncio';
                anuncioDiv.innerHTML = `
                    <p><strong>Anunciante:</strong> ${anuncio.anunciante}</p>
                    <p><strong>Proposta:</strong> ${anuncio.proposta}</p>
                    <p><strong>URL da Imagem:</strong> <a href="${anuncio.urlImagem}" target="_blank">${anuncio.urlImagem}</a></p>
                    <button onclick="aprovarAnuncio(${anuncio.id})">Aprovar</button>
                `;
                anunciosList.appendChild(anuncioDiv);
            }
        });
    });
});

function aprovarAnuncio(id) {
    BancoDeDados.carregarAnuncios().then(anuncios => {
        const anuncio = anuncios.find(anuncio => anuncio.id === id);
        if (anuncio) {
            anuncio.ativo = true;
            fetch('/api/anuncios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([anuncio])
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                document.getElementById('load-anuncios').click();
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao aprovar o anúncio');
            });
        }
    });
}

function mostrarSeção(seçãoId) {
    const seções = document.querySelectorAll('section');
    seções.forEach(seção => {
        seção.style.display = 'none';
    });
    document.getElementById(seçãoId).style.display = 'block';
}

// Inicializar mostrando a seção de solicitação
mostrarSeção('solicitacao');
