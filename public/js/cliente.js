document.getElementById('pause-button').addEventListener('click', function () {
    fetch('/api/anuncios')
        .then(response => response.json())
        .then(anuncios => {
            const anunciosAtivos = anuncios.filter(anuncio => anuncio.ativo);
            if (anunciosAtivos.length > 0) {
                const anuncio = anunciosAtivos[Math.floor(Math.random() * anunciosAtivos.length)];
                const anuncioDiv = document.getElementById('anuncio-exibido');
                anuncioDiv.innerHTML = `
                    <p><a href="${anuncio.urlImagem}" target="_blank">${anuncio.urlImagem}</a></p>
                    <button id="skip-ad-button">Pular Anúncio</button>
                `;
                anuncioDiv.style.display = 'flex';
                document.getElementById('pause-button').style.display = 'none';
                document.getElementById('video-placeholder').style.display = 'none';

                document.getElementById('skip-ad-button').addEventListener('click', function () {
                    document.getElementById('anuncio-exibido').style.display = 'none';
                    document.getElementById('pause-button').style.display = 'block';
                    document.getElementById('video-placeholder').style.display = 'flex';
                });
            } else {
                alert('Nenhum anúncio ativo disponível');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar anúncios');
        });
});
