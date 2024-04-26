<div id="inicio">
    <h1 id="titulo" align="center"> Desafio Backend BGC Brasil - API, Web Scrapping e AWS</h1>
	<h2 id="titulo" align="center"> Por Evelyn Suzarte Fernandes</h1>
	<p id="descricao" align="justify"></p>	
    <p align ="center"><img src="http://img.shields.io/static/v1?label=STATUS&message=Concluido&color=GREEN&style=for-the-badge"/>
</div>



<div id="sumario">
    <h1>Sumário</h1>
	<ul>
        <li><a href="#objetivos"> <b>Objetivos</b></li>
        <li><a href="#tecnologias"> <b>Tecnologias</b></li>
		<li><a href="#requisitos"> <b>Requisitos</b></li>
        <li><a href="#acessar-api"> <b>Acessar API</b></li>
        <li><a href="#conclusao"> <b>Conclusão</b> </a> </li>
	</ul>	
</div>


<div id="objetivos">
	<h1>Objetivos</h1>
	<p>O objetivo desse projeto é desenvolver um projeto Web Scrapping de um ecommerce que serve para exibir os três produtos mais vendidos e interagir com uma API criada com os serviços da AWS e NodeJs. O ecommerce utilizado para essa aplicação foi do Mercado Livre.</p>
</div>


<div id="tecnologias">
	<h1>Tecnologias utilizadas</h1>
	<ul>        
		<li><a href="https://code.visualstudio.com/download">Visual Studio Code</a></li>
        <li><a href="https://pptr.dev/">Puppeteer </a></li>
        <li><a href="https://aws.amazon.com/pt/?nc2=h_lg">Serverless Framework</a></li>
        <li><a href="https://aws.amazon.com/pt/?nc2=h_lg">NodeJS</a></li>
        <li><a href="https://aws.amazon.com/pt/?nc2=h_lg">AWS API Gateway</a></li>
        <li><a href="https://aws.amazon.com/pt/?nc2=h_lg">AWS DynamoDB</a></li>
        <li><a href="https://aws.amazon.com/pt/?nc2=h_lg">AWS Lambda</a></li>
        <h5>Ecommerce utilizado</h5>
        <li><a href="https://www.mercadolivre.com.br/mais-vendidos">Mercado Livre - Mais vendidos</a></li>
	</ul>
</div>


<div id="requisitos">
    <h1>Requisitos</h1>
	<ul>
		<li>Retorne os três primeiros produtos da página de mais vendidos :heavy_check_mark:</li>
		<li>Utilizar Lambda para computação, API Gateway para gestão da API e DynamoDB para banco de dados :heavy_check_mark:</li>
        <li>Utilizar Pupperteer para Web Scrapping :heavy_check_mark:</li>
		<li>Criar endpoints :heavy_check_mark:</li>
</div>

<div id="acessar-api">
    <h1>API</h1>
	<li><a href="https://82qunkwy1e.execute-api.us-east-1.amazonaws.com/">Acesse clicando aqui</a></li>
    <p>O teste pode ser feito através do navegador ou de um programa para teste de API, como o Postman ou Insomnia.</p> 
    <p></p>
    <h4>Endpoints:</h4>
    <table border="1" align="center">
    <tr>
        <td>Endpoint</td>
        <td>Método</td>
        <td>Descrição</td>
        <td>Link</td>
        <td>Exemplo de entrada</td>
    </tr>
    <tr>
        <td>/produtos</td>
        <td>GET</td>
        <td>Retorna todos os produtos cadastrados no banco de dados</td>
        <td>https://82qunkwy1e.execute-api.us-east-1.amazonaws.com/produtos</td>
        <td>-</td>
    </tr>
    <tr>
        <td>/produtos/adicionar</td>
        <td>POST</td>
        <td>Adiciona produtos no banco de dados através da entrada de dados via JSON</td>
        <td>https://82qunkwy1e.execute-api.us-east-1.amazonaws.com/adicionar</td>
        <td>  {
            "productId": "10_Eletrônicos",
            "name": "Notebook Dell Inspiron 15 3000",
            "valor": "3499.00",
            "category": "Eletrônicos"
        }
        </td>
    </tr>
        <tr>
        <td>/produtos/adicionar-pupper</td>
        <td>POST</td>
        <td>Adiciona no banco de dados os produtos extraídos através do web scrapping da página.</td>
        <td>https://82qunkwy1e.execute-api.us-east-1.amazonaws.com/produtos/adicionar-pupper</td>
        <td>-</td>
    </tr>
    <tr>
        <td>/produtos/categoria/{category}</td>
        <td>GET</td>
        <td>Busca os produtos por categoria.</td>
        <td>https://82qunkwy1e.execute-api.us-east-1.amazonaws.com/produtos/categoria/{category}</td>
        <td>https://82qunkwy1e.execute-api.us-east-1.amazonaws.com/produtos/categoria/CELULARES E TELEFONES</td>
    </tr>
    <tr>
        <td>/produtos/id/{productId}</td>
        <td>GET</td>
        <td>Busca os produtos através do ID.</td>
        <td>https://82qunkwy1e.execute-api.us-east-1.amazonaws.com/produtos/id/{productId}</td>
        <td>https://82qunkwy1e.execute-api.us-east-1.amazonaws.com/produtos/id/2_ACESSÓRIOS </td>
    </tr>
</table>


<div id="conclusao">
	<h1>Conclusão</h1>
	<p>A API funciona como esperado, cumprindo todos os requisitos. Foi utilizado o Mercado Livre como ecommerce para o Web Scrapping. Todas as ferramentas propostas para uso foram utilizadas com sucesso.</p>
</div>

</div>