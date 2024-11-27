# README  

## Project: Deck CRUD API  

This project demonstrates a small web application to manage a deck of cards using a CRUD (Create, Read, Update, Delete) approach. It utilizes **HTML**, **CSS**, **JavaScript**, **PHP**, and **MySQL**. The app interacts with a custom Deck API and uses local server calls to manage database operations.  

---

### Features  

1. **Create**: Add new decks and cards to the database.  
2. **Read**: List existing decks and cards with details.  
3. **Update**: Modify properties of existing decks and cards.  
4. **Delete**: Remove decks or cards from the database.  

---

### Project Structure  

```
cartas_crud/
├── banco.sql         # SQL file to set up the database structure.
├── index.html        # Main HTML file for the user interface.
├── script.js         # JavaScript file for frontend interactivity and API calls.
├── style.css         # CSS file for styling the interface.
└── back/             # Backend folder for API logic.
    ├── conn.php      # Database connection configuration.
    ├── card/         # Endpoints for managing individual cards.
    │   ├── create.php
    │   ├── delete.php
    │   ├── list.php
    │   └── update.php
    └── deck/         # Endpoints for managing decks.
        ├── create.php
        ├── delete.php
        ├── list.php
        └── update.php
```  

---

### About `script.js`  

All JavaScript logic has been consolidated into a single file, `script.js`, to simplify implementation and avoid rewriting functions multiple times.  

#### Potential Improvement  
This script could have been split into three separate files for better modularization:  
- **deckAPI.js**: Handling Deck API operations.  
- **dbCRUD.js**: Functions for database Create, Read, Update, and Delete.  
- **uiHandlers.js**: Functions directly tied to UI interactions (e.g., button click handlers).  

However, using multiple JavaScript files often requires making them modules. Modules prevent inline `onclick` attributes in HTML from functioning unless you explicitly export and import functions. To avoid this complexity and maintain ease of use, everything was kept in a single JavaScript file.  

---

### Database Setup  

Use the `banco.sql` file to create the necessary tables for this project. It includes two tables:  
1. **decks**: Stores information about decks.  
2. **cards**: Stores individual card details linked to specific decks.  

---

### Backend API  

- **Deck API**:  
  Handles operations for decks (`/back/deck`).  
- **Card API**:  
  Handles operations for individual cards (`/back/card`).  

---

### Configuration  

The connection to the database is configured in the `back/conn.php` file. Ensure you update the credentials to match your local environment (e.g., host, username, password, database name).  

---

### How to Run  

1. Clone the repository into your local server directory (e.g., `/var/www/html/`).  
2. Import `banco.sql` into your MySQL server.  
3. Update the `conn.php` file with your database credentials.  
4. Open `index.html` in your browser and interact with the app.  

---

### [Versão em Português Brasil](#versão-em-português-brasil)  

---

## Versão em Português Brasil  

### Projeto: Deck CRUD API  

Este projeto demonstra uma aplicação web simples para gerenciar um baralho de cartas utilizando a abordagem CRUD (Criar, Ler, Atualizar, Excluir). Ele utiliza **HTML**, **CSS**, **JavaScript**, **PHP** e **MySQL**. O app interage com uma API personalizada para baralhos e realiza chamadas ao servidor local para gerenciar operações no banco de dados.  

---

### Funcionalidades  

1. **Criar**: Adicionar novos baralhos e cartas ao banco de dados.  
2. **Ler**: Listar baralhos e cartas existentes com detalhes.  
3. **Atualizar**: Modificar propriedades de baralhos e cartas existentes.  
4. **Excluir**: Remover baralhos ou cartas do banco de dados.  

---

### Estrutura do Projeto  

```
cartas_crud/
├── banco.sql         # Arquivo SQL para configurar a estrutura do banco de dados.
├── index.html        # Arquivo HTML principal para a interface do usuário.
├── script.js         # Arquivo JavaScript para interatividade e chamadas à API.
├── style.css         # Arquivo CSS para estilizar a interface.
└── back/             # Pasta de backend com a lógica da API.
    ├── conn.php      # Configuração da conexão com o banco de dados.
    ├── card/         # Endpoints para gerenciar cartas individuais.
    │   ├── create.php
    │   ├── delete.php
    │   ├── list.php
    │   └── update.php
    └── deck/         # Endpoints para gerenciar baralhos.
        ├── create.php
        ├── delete.php
        ├── list.php
        └── update.php
```  

---

### Sobre o `script.js`  

Toda a lógica em JavaScript foi consolidada em um único arquivo, `script.js`, para simplificar a implementação e evitar reescrever funções várias vezes.  

#### Potencial Melhoria  
O script poderia ser dividido em três arquivos separados para uma melhor modularização:  
- **deckAPI.js**: Manipula operações da API de Baralhos.  
- **dbCRUD.js**: Funções para Criar, Ler, Atualizar e Excluir no banco de dados.  
- **uiHandlers.js**: Funções diretamente ligadas às interações da interface (por exemplo, manipuladores de cliques em botões).  

No entanto, ao usar vários arquivos JavaScript, seria necessário torná-los módulos. Módulos impedem que atributos `onclick` no HTML funcionem diretamente, a menos que você exporte e importe funções explicitamente. Para evitar essa complexidade e manter a simplicidade, tudo foi mantido em um único arquivo JavaScript.  

---

### Configuração do Banco de Dados  

Use o arquivo `banco.sql` para criar as tabelas necessárias para este projeto. Ele inclui duas tabelas:  
1. **decks**: Armazena informações sobre os baralhos.  
2. **cards**: Armazena detalhes individuais das cartas vinculadas a um baralho específico.  

---

### API do Backend  

- **Deck API**:  
  Gerencia operações relacionadas a baralhos (`/back/deck`).  
- **Card API**:  
  Gerencia operações relacionadas a cartas individuais (`/back/card`).  

---

### Configuração  

A conexão com o banco de dados é configurada no arquivo `back/conn.php`. Certifique-se de atualizar as credenciais para corresponder ao seu ambiente local (por exemplo, host, usuário, senha, nome do banco de dados).  

---

### Como Executar  

1. Clone o repositório no diretório do seu servidor local (por exemplo, `/var/www/html/`).  
2. Importe o arquivo `banco.sql` no seu servidor MySQL.  
3. Atualize o arquivo `conn.php` com as credenciais do seu banco de dados.  
4. Abra o `index.html` no navegador e interaja com o app.  
