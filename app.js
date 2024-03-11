const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Armazenamento temporário (pode ser substituído por um banco de dados)
let postagens = [];

app.get('/', (req, res) => {
  res.render('index', { postagens });
});

app.post('/postagens', (req, res) => {
  const { titulo, conteudo } = req.body;
  postagens.push({ titulo, conteudo });
  res.redirect('/');
});

app.get('/postagem/:index', (req, res) => {
  const index = req.params.index;
  const postagem = postagens[index];
  
  if (postagem) {
    res.render('postagem', { postagem });
  } else {
    res.status(404).send('Postagem não encontrada.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
