const apiDeckUrl = 'https://deckofcardsapi.com/api/deck';
var deckData = {};
var deck = [];
var hand = [];
var savedDB = false;
var deckNameElement = document.getElementById('deckName');
const deckContainer = document.getElementById('deckContainer');
const deckTableContainer = document.getElementById('deckTableContainer');
const deckIdContainer = document.getElementById('deckIdContainer');

async function novoBaralho() {
    deckNameElement.value = '';
    savedDB = false;
    deck = [];
    hand = [];
    const response = await axios.get(`${apiDeckUrl}/new/shuffle/`);
    deckData = response.data;
    deckIdContainer.textContent = deckData.deck_id;

    //console.log(response);
    embaralharCartas();
    //console.log("Novo baralho gerado!");
}

function exibirCartasNoBaralho() {
    deckContainer.innerHTML = deckTableContainer.innerHTML = '';
    deck.forEach(carta => {
        const img = document.createElement('img');
        img.src = carta.image;
        img.classList.add('card');
        deckContainer.appendChild(img);
    });
}

function comprarCincoCartas() {
    if (deck.length < 5) {
        alert('Não há cartas suficientes no baralho!');
        return;
    }
    const cartasCompradas = deck.splice(0, 5);
    hand.push(...cartasCompradas);
    hand = hand.map((card) => {
        card.on_hand = true;
        return card;
    });
    console.log(hand);

    exibirCartasNoBaralho();
    exibirCartasNaMão();
}

function exibirCartasNaMão() {
    const handContainer = document.getElementById('handContainer');
    handContainer.innerHTML = '';
    hand.forEach(carta => {
        const img = document.createElement('img');
        img.src = carta.image;
        img.classList.add('card');
        handContainer.appendChild(img);
    });
}

async function embaralharCartas() {
    const response = await axios.get(`${apiDeckUrl}/${deckData.deck_id}/shuffle/`);
    //console.log(response);
    if (response.data.success){
        const deckResponse = await axios.get(`${apiDeckUrl}/${deckData.deck_id}/draw/?count=${deck.length > 0 ? deck.length : 52}`);
        //console.log(deckResponse);
        deck = deckResponse.data.cards;
        console.log('Cartas embaralhadas');
        exibirCartasNoBaralho();
    }
}

//Banco

async function salvarBaralho() {
    if (!deckData.deck_id) {
        alert("Não há um baralho válido para salvar.");
        return;
    }

    deckData.name = deckNameElement.value;

    let cards = deck.concat(hand);
    cards = cards.map((card) => {
        card.deck_id = deckData.deck_id;
        return card;
    });

    //console.log(deckData);
    if (savedDB) {
        console.log('Deck atualizado: ' + await updateDB(deckData, 'deck'));
        console.log('Cartas atualizadas: ' + await updateDB(cards, 'card'));
    } else {
        savedDB = await createDB(deckData, 'deck');
        console.log('Deck cadastrado: ' + savedDB);
        console.log('cartas cadastradas: ' + await createDB(cards, 'card'));
    }
}

async function listarBaralhos() {
    deckContainer.innerHTML = deckTableContainer.innerHTML = '';
    let decks = await listDB('deck');
    if (decks.length > 0) {
        createTableFromObjects(decks, 'deckTableContainer');
    } else {
        alert('Nenhum deck cadastrado');
    }
}
function deletarBaralho() {
    if (!currentDeckName) {
        alert("Não há baralho para deletar.");
        return;
    }

    const confirmation = confirm(`Tem certeza de que deseja deletar o baralho "${currentDeckName}"?`);
    if (confirmation) {
        localStorage.removeItem(currentDeckName);
        currentDeckName = '';
        deckId = null;
        deck = [];
        hand = [];
        document.getElementById('deckName').value = '';
        exibirCartasNoBaralho();
        exibirCartasNaMão();
        alert("Baralho deletado com sucesso!");
    }
}

async function createDB(data, type) {
    // Define allowed resource types in an array
    const allowedTypes = ['card', 'deck'];

    // Validate if the type is included in the allowedTypes array
    if (!allowedTypes.includes(type)) {
        throw new Error("Tipo invalido, deve ser um destes: 'card', 'deck'.");
    }

    // Set the appropriate endpoint based on the type
    const endpoint = `back/${type}/create.php`;

    // Send the data to the server via POST
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    //console.log(response);

    // Parse the response as JSON
    const result = await response.json();
    //console.log(result);

    // Handle the response from the server
    if (!result.ok) console.log(result);
    return result.ok;
}

async function updateDB(data, type) {
    // Validando o tipo para garantir que seja 'card' ou 'deck'
    const validTypes = ['card', 'deck'];
    if (!validTypes.includes(type)) {
        throw new Error("Tipo de recurso inválido. Deve ser 'card' ou 'deck'.");
    }

    // Definindo a URL de acordo com o tipo do recurso
    const url = `back/${type}/update.php`;

    // Configurando as opções para a requisição
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Enviando os dados como JSON
    };

    // Enviando a requisição para o servidor
    const response = await fetch(url, options);

    const result = await response.json();

    if (!result.ok) console.log(result);
    return result.ok;
}

async function listDB(tipo, deck_id = null) {
    // Valida se o tipo fornecido é válido
    const tiposPermitidos = ['deck', 'card'];
    if (!tiposPermitidos.includes(tipo)) {
        throw new Error("Tipo inválido. Deve ser 'deck' ou 'hand'.");
    }

    // Define o endpoint com base no tipo
    const endpoint = `back/${tipo}/list.php`;

    if (deck_id) endpoint += `?deck_id=${deck_id}`;

    // Envia uma requisição GET para o servidor para listar o recurso
    const response = await fetch(endpoint, {
        method: 'GET'
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
        console.log(response);
    }

    // Parseia a resposta como JSON
    const result = await response.json();

    if (!result.ok) {
        console.log(result);
        return [];
    } else {
        return result.data;
    }
}

async function deleteDB(tipo, id) {
    try {
        // Valida se o tipo fornecido é válido
        const tiposPermitidos = ['deck', 'hand'];
        if (!tiposPermitidos.includes(tipo)) {
            throw new Error("Tipo inválido. Deve ser 'deck' ou 'hand'.");
        }

        // Verifica se o ID foi fornecido
        if (!id) {
            throw new Error("O ID é necessário para deletar o recurso.");
        }

        // Define o endpoint com base no tipo e no ID
        const endpoint = `/back/${tipo}/delete.php?id=${id}`;

        // Envia uma requisição DELETE para o servidor
        const response = await fetch(endpoint, {
            method: 'DELETE',
            // Não é necessário o header 'Content-Type' já que não estamos enviando corpo com dados
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao tentar deletar o recurso');
        }

        // Parseia a resposta como JSON
        const result = await response.json();

        // Verifica se a requisição foi bem-sucedida
        if (result.ok) {
            console.log(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} deletado com sucesso!`);
            console.log(result.message);
        } else {
            console.error(`Erro ao deletar o ${tipo}: ${result.message}`);
            if (result.details) {
                console.error("Detalhes:", result.details);
            }
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}

function createTableFromObjects(objectsList, containerId, actionsList = []) {
    // Ensure there's data to create the table
    if (!objectsList || objectsList.length === 0) {
        console.error('No data available to create the table.');
        return;
    }

    // Get the container to insert the table
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    // Clear existing content in the container
    container.innerHTML = '';

    // Create the table
    const table = document.createElement('table');
    table.border = "1"; // Optional: Add border for better visibility
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';

    // Create the table header row
    const headerRow = document.createElement('tr');
    const headers = Object.keys(objectsList[0]); // Get headers from the first object
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.charAt(0).toUpperCase() + header.slice(1); // Capitalize headers
        th.style.padding = '8px';
        th.style.backgroundColor = '#f2f2f2';
        th.style.textAlign = 'left';
        headerRow.appendChild(th);
    });

    // Add "Actions" column header if actions are provided
    if (actionsList.length > 0) {
        const actionsTh = document.createElement('th');
        actionsTh.textContent = 'Actions';
        actionsTh.style.padding = '8px';
        actionsTh.style.backgroundColor = '#f2f2f2';
        actionsTh.style.textAlign = 'center';
        headerRow.appendChild(actionsTh);
    }
    table.appendChild(headerRow);

    // Create rows for each object
    objectsList.forEach((obj, index) => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = obj[header];
            td.style.padding = '8px';
            row.appendChild(td);
        });

        // Add "Actions" column with buttons if actions are provided
        if (actionsList.length > 0) {
            const actionsTd = document.createElement('td');
            actionsTd.style.padding = '8px';
            actionsTd.style.textAlign = 'center';

            actionsList.forEach(action => {
                const button = document.createElement('button');
                button.textContent = action.text;
                button.className = action.class || '';
                button.style.marginRight = '5px';
                // Bind the callback function to the button, passing the row's data if needed
                button.onclick = () => action.callback(obj, index);
                actionsTd.appendChild(button);
            });

            row.appendChild(actionsTd);
        }

        table.appendChild(row);
    });

    // Append the table to the container
    container.appendChild(table);
}
