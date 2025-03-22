# Deck CRUD API  

Este projeto demonstra uma aplicação web simples para gerenciar um baralho de cartas utilizando a abordagem CRUD (Criar, Ler, Atualizar, Excluir). Ele utiliza **HTML**, **CSS**, **JavaScript**, **PHP** e **MariaDB**. O app interage com uma API personalizada para baralhos e realiza chamadas ao servidor local para gerenciar operações no banco de dados.

A api utilizada se chama [deckofcards](https://deckofcardsapi.com/)  

---

# Funcionalidades  

## Cartas do Baralho  
- **Novo Baralho**: Chama um novo baralho na API.  
- **Embaralhar**: Embaralha o baralho atual.  
- **Listar Baralhos**: Lista os baralhos salvos no banco de dados.  
- **Resetar Website**: Descarta o baralho atual e reinicia o estado da aplicação.  
- **Logs API**: Mostra as chamadas feitas à API para novos baralhos, incluindo:  
  - ID do log.  
  - Data e hora da chamada.  
  - Número de registros retornados (sempre 52 cartas).  

## Cartas na Mão do Jogador  
- **Salvar Baralho**: Salva o baralho atual no banco de dados.  
- **Nomear Baralho**: Permite atribuir um nome ao baralho antes de salvá-lo.  
- **Comprar 5 Cartas**: Compra 5 cartas do baralho atual.  
- **Deletar Baralho**: Remove o baralho atual do banco de dados.  

---

# Estrutura do Projeto  

```
cartas_crud/
├── banco.sql         # Arquivo SQL para configurar a estrutura do banco de dados.
├── index.html        # Arquivo HTML principal para a interface do usuário.
├── script.js         # Arquivo JavaScript para interatividade e chamadas à API deckofcards.
├── style.css         # Arquivo CSS para estilizar a interface.
└── back/             # Pasta de backend com a lógica da API interna.
  ├── conn.php      # Configuração da conexão com o banco de dados.
  ├── card/         # Endpoints para gerenciar cartas individuais (API interna entre backend e frontend).
  └── deck/         # Endpoints para gerenciar baralhos (API interna entre backend e frontend).
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

## Sobre o `script.js`  

Toda a lógica em JavaScript foi consolidada em um único arquivo, `script.js`, para simplificar a implementação e evitar reescrever funções várias vezes.  

## Potencial Melhoria  
O script poderia ser dividido em três arquivos separados para uma melhor modularização:  
- **deckAPI.js**: Manipula operações da API de Baralhos.  
- **dbCRUD.js**: Funções para Criar, Ler, Atualizar e Excluir no banco de dados.  
- **uiHandlers.js**: Funções diretamente ligadas às interações da interface (por exemplo, manipuladores de cliques em botões).  

No entanto, ao usar vários arquivos JavaScript, seria necessário torná-los módulos. Módulos impedem que atributos `onclick` no HTML funcionem diretamente, a menos que você exporte e importe funções explicitamente. Para evitar essa complexidade e manter a simplicidade, tudo foi mantido em um único arquivo JavaScript.  

---

# Configurações

## Guia rápido  

1. Instale PHP, MariaDB, Apache e a extensão entre PHP e MariaDB
2. Clone o repositório no diretório na sua máquina.  
3. Crie o banco com o script de `banco.sql`.  
4. Atualize o arquivo `conn.php` com as credenciais do seu banco de dados.  
5. Abra o `index.html` no navegador e interaja com o app.

## Ambiente

Certifique-se de que os seguintes softwares estejam instalados no seu ambiente:  
- **PHP**: Linguagem de programação para o backend.  
- **MariaDB**: Sistema de gerenciamento de banco de dados.  
- **Extensão PHP para MariaDB**: Necessária para que o PHP se conecte ao banco de dados MariaDB.  
- **Apache**: Servidor web para executar o PHP.

Além disso, configure os serviços necessários para garantir que estejam ativos e prontos para uso.  

## Banco de dados

### Usuário

Antes de importar o arquivo `banco.sql`, é necessário criar o usuário do banco de dados que será utilizado na conexão. Certifique-se de criar o banco de dados, o usuário e conceder as permissões necessárias, como `USAGE`, `SELECT`, `INSERT`, `UPDATE` e `DELETE`.  

### Importação do Arquivo  

Como este projeto não tem migração de banco, apenas manualmente, após configurar o usuário, execute os comandos denro de `banco.sql` para criar as tabelas e a estrutura necessária.

### Conexão  

A conexão com o banco de dados é configurada no arquivo `back/conn.php`. Certifique-se de atualizar as credenciais para corresponder ao seu ambiente local (por exemplo, host, usuário, senha, nome do banco de dados).