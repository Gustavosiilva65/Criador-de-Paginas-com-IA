/* 
Lógica de Programação

Algoritmo - Receita de BOLO

[x] Saber quando o botão foi clicado
[x] Pegar o texto do TextArea
[x] Enviar para a IA(servidor)
[x] Pegar a resposta da IA
[ ] Colocar na tela
    [x] Código
    [x] Resultado do Código     
[ ] Refinar nosso resultado        

    querySelector - pega um elemento que eu escolher
    HTML - document
    JavaScript - script
*/
/* querySelector é um método do JavaScript que permite selecionar elementos HTML usando seletores CSS. Ele retorna o primeiro elemento que corresponde ao seletor especificado. Por exemplo, document.querySelector('.caixa_entrada') seleciona o primeiro elemento com a classe 'caixa_entrada'. */


let endereco = "https://api.groq.com/openai/v1/chat/completions"

    let prompt =  `Você e um designer web premiado e programador.
            Regras de resposta : 
            - responda somente com o código html e css puros
            - não use crases, markdown ou explicações
            - não use tags de <img> ou <script>

            Indentidade visual (capriche e supreenda) : 

            - invente uma paleta de cores unica que combine com a essencia do site
            - escolha uma google font marcante via @import
            - use emojis grandes no lugar de imagens
            - use css moderno: gradientes, sombras, animações, sutis, layout generoso, tipogradia grande e impactante
            
            Estrutura do site : 
            - header com um titulo e um subtitulo
            - header com noeme do negocio e slogan
            - seção de serviços com 3 cards, cada um com um emoji, um titulo e uma descrição
            - secãõ de diferencias com emojis 
            - depoimentos de clientes, cada um com um emoji, uma frase e o nome do cliente
            - footer com informações de contato e redes sociais

            
Conteudo em português, seja criativo e surpreenda, e especifico para negocios.`



async function gerarcodigo() {

    let textarea = document.querySelector (".texto_pagina").value
    let resposta = await fetch(endereco, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": /* Substitua "Escreva sua chave de API aqui" pela sua chave de API real para autenticar a solicitação. */
        }, 
            
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [

                {
            
                    "role": "user",
                    "content": textarea

                }, 

                {

                    "role": "system",
                    "content": prompt, 
                }  
            ],
        })
    })


    let dados = await resposta.json() /* Converte a resposta da API para um formato JSON. */
    let resultado = dados.choices[0].message.content /* Acessa o conteúdo da resposta da IA, que deve conter o código HTML e CSS gerado. */

    let espacocodigo =  document.querySelector(".bloco-codigo") /* Seleciona o elemento onde o código gerado será exibido. */
    let espacosite = document.querySelector(".bloco-site") /* Seleciona o elemento onde o resultado do código (a página gerada) será exibido. */

    espacocodigo.textContent = resultado /* Exibe o código gerado pela IA no elemento selecionado. */
    espacosite.srcdoc = resultado /* Exibe a página gerada pela IA no elemento iframe, usando a propriedade srcdoc para renderizar o código HTML diretamente. */
}



