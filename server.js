const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/anuncios', (req, res) => {
    fs.readFile('./public/data/anuncios.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo');
        }
        try {
            const anuncios = JSON.parse(data);
            res.send(anuncios);
        } catch (error) {
            res.send([]);
        }
    });
});

app.post('/api/anuncios', (req, res) => {
    fs.readFile('./public/data/anuncios.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo');
        }
        let anuncios;
        try {
            anuncios = JSON.parse(data);
        } catch (error) {
            anuncios = [];
        }

        // Verifica se é um array de anúncios ou um único anúncio
        if (Array.isArray(req.body)) {
            req.body.forEach(newAnuncio => {
                const index = anuncios.findIndex(anuncio => anuncio.id === newAnuncio.id);
                if (index !== -1) {
                    anuncios[index] = newAnuncio;
                } else {
                    anuncios.push(newAnuncio);
                }
            });
        } else {
            const newAnuncio = req.body;
            const index = anuncios.findIndex(anuncio => anuncio.id === newAnuncio.id);
            if (index !== -1) {
                anuncios[index] = newAnuncio;
            } else {
                anuncios.push(newAnuncio);
            }
        }

        fs.writeFile('./public/data/anuncios.json', JSON.stringify(anuncios, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar o arquivo');
            }
            res.send('Anúncio salvo com sucesso');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
