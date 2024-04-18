

document.addEventListener('DOMContentLoaded', async function() {

  async function carregarNoticias() {
    try {
      const res = await fetch(`https://v2.jokeapi.dev/joke/Programming`);
      const data = await res.json();

      console.log(data);

      const bloco02Titulo = document.getElementById('bloco02').querySelector('#titulo');
      const bloco01Titulo = document.getElementById('bloco01').querySelector('#titulo');
      const noticiaElement = document.createElement('div');
      const noticiaElement2 = document.createElement('div');

      if (data.joke != null) {
        noticiaElement.textContent = data.joke;
        noticiaElement2.textContent = data.joke;
        bloco02Titulo.appendChild(noticiaElement2);
        bloco01Titulo.appendChild(noticiaElement);
      } else {
        noticiaElement.textContent = data.setup;
        noticiaElement2.textContent = data.setup;
        bloco02Titulo.appendChild(noticiaElement2);
        bloco01Titulo.appendChild(noticiaElement);
      }
    } catch (error) {
      console.error('Erro ao carregar notícia:', error);
    }
  }

  carregarNoticias();
});

document.addEventListener('DOMContentLoaded', async function() {
  const servicoBloco04 = document.getElementById("servicoBloco04");
  const tituloBloco04 = document.getElementById("tituloBloco04");
  async function carregarDadosPais() {
    try{
      const result = await fetch(`https://restcountries.com/v3.1/name/brasil`)
      .then((res) => res.json())
      .then((data)=>{
  
        const nomeComum = data[0].name.common;
        const flast = data[0].flags.alt;

        servicoBloco04.textContent = nomeComum;
        tituloBloco04.textContent = flast;


      });

    } catch (error) {
      console.error('Erro ao carregar notícia:', error);
    }
  }
  carregarDadosPais();

});