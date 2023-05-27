<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Sobre o projeto
O projeto tem como objetivo criar uma equação que determine a área de um painel solar, a sua voltagem e o número de painéis solares necessário para suprir a demanda de voltagem exigida.

Após isso projeto calcula e cadastra no banco de dados o resultado, assim gerando uma API para se conectar ao Front-End.

## Importante
Para poder cadastrar um cálculo é necessário estar autenticado na API.

Para isso se deve efetuar o cadastro/login e pegar o token gerado e colocar no ```Bearer Token``` do software no qual você usa para fazer requisições.

# Tecnologias utilizadas
- NodeJS
- NestJS
- TypeORM
- MySQL

# Como executar o projeto
Pré-requisitos: 
- NodeJS https://nodejs.org/en

Clone o repositório
```
git clone https://github.com/E3ND/painel-solar
```

Execute no terminal o seguinte comando:
```npm install``` para instalar todas as dependências necessárias para rodar o projeto.

Na raiz do projeto crie um arquivo chamado ```.env``` e preencha da seguinte forma:
```
HOST=seu host
PORT=sua porta
USERNAMEE=nome
PASSWORD=senha
DATABASE=nome da databse
```
Neste bloco vai ser colocado os arquivos de configuração do seu banco de dados para assim efetuar a conexão. 

É importante que o banco que vai ser utilizado tenha compatibilidade com o TypeORM.

https://typeorm.io/data-source-options

Após isso, no terminal do projeto rode o comando ```npm run start:dev``` para rodar a aplicação.

Documentação utilizada para a realização do projeto:

https://docs.nestjs.com/

https://typeorm.io/

Nest is [MIT licensed](LICENSE).
