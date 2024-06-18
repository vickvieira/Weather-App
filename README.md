# Projeto de Desenvolvimento Mobile 
## Aplicativo de condições atuais e previsão do tempo
Aplicativo desenvolvido para a disciplina de **Desenvolvimento *Mobile*** ministrada pelo prof. Roberson Cesar Alves de Araujo, do curso de Tecnologia em Análise e Desenvolvimento de Sistemas da Universidade Federal do Paraná (UFPR).
**Alunos: Lucas Vinicius, Ruan Sergio Cunha Brito, Victoria Kunz Vieira**

### Tecnologias utilizadas
Para o desenvolvimento do trabalho foram utilizadas as seguintes tecnologias:
1. React Native
2. TypeScript
3. Plataforma Expo p/ o desenvolvimento em React Native
4. StyleSheets para os estilos
5. Axios para requisições às APIs
6. API Current Weather Data, do OpenWeather
7. API 5 Day / 3 Hour Forecast, do OpenWeather
8. API Weather Maps 1.0, do OpenWeather
9. API de imagens do Unsplash
10. SpringBoot
11. ProstgreSQL

### Funcionamento
#### Tela Principal
A tela principal do aplicativo possui os dados do clima atual, com detalhes, e uma previsão de 3hrs em 3hrs por 5 dias.
Inicialmente, ao usuário autorizar o uso de sua localização, os dados da localidade do usuário são mostrados.
Há uma barra de pesquisa para que, se o usuário desejar, procure pelo tempo de qualquer localidade do mundo.

#### Tela Mapas
Por meio de navegação *Drawer* podemos acessar a tela de mapas, onde o usuário pode visualizar o mapa mundi com diferentes opções de visualização do clima global: precipitação; temperatura; nuvens; e vento.
O usuário pode aproximar, afastar e mover a localização do mapa livremente.

### Rodando o projeto
1. Pré-requisitos:
- Node.js: Baixe e instale a versão LTS do site oficial.
- Git: Baixe e instale do site oficial.
- Expo CLI: Execute **npm install -g expo-cli** para instalar globalmente.
2. Clonar o repositório
3. Navegar até o Diretório do Projeto **cd \app-tempo**
4. Instalar Dependências: Dentro do diretório do projeto, execute o seguinte comando para instalar todas as dependências necessárias: **npm install**
5. Iniciar o Projeto com Expo: **npm run start**
6. Visualizar o projeto rodando por meio do aplicativo **Expo go**
