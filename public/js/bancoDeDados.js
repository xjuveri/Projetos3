class BancoDeDados {
    static carregarAnuncios() {
        return fetch('/api/anuncios')
            .then(response => response.json())
            .catch(error => {
                console.error('Erro:', error);
                return [];
            });
    }
}
