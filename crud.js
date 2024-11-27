/**
 * Creates a card or a deck depending on the provided parameters.
 * @param {Object} data - The data to be sent to the server.
 * @param {string} type - The type of resource to create: "card" or "deck".
 */
async function createDB(data, type) {
    try {
        // Define allowed resource types in an array
        const allowedTypes = ['card', 'deck'];

        // Validate if the type is included in the allowedTypes array
        if (!allowedTypes.includes(type)) {
            throw new Error("Tipo invalido, deve ser um destes: 'card', 'deck'.");
        }

        // Set the appropriate endpoint based on the type
        const endpoint = `/back/${type}/create.php`;

        // Send the data to the server via POST
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Parse the response as JSON
        const result = await response.json();

        // Handle the response from the server
        if (result.ok) {
            console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`);
            console.log(result.message);
        } else {
            console.error(`Error creating ${type}: ${result.message}`);
            if (result.details) {
                console.error("Details:", result.details);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

/**
 * Função para atualizar um recurso (carta ou deck) no servidor.
 * 
 * @param {string} type - Tipo do recurso ('card' ou 'deck').
 * @param {object} data - Dados a serem atualizados no recurso.
 * @returns {Promise<void>} - Retorna uma promessa que resolve quando a atualização for concluída.
 */
async function updateDB(type, data) {
    // Validando o tipo para garantir que seja 'card' ou 'deck'
    const validTypes = ['card', 'deck'];
    if (!validTypes.includes(type)) {
        throw new Error("Tipo de recurso inválido. Deve ser 'card' ou 'deck'.");
    }

    try {
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

        // Verificando se a resposta foi bem-sucedida
        if (response.ok) {
            const result = await response.json();

            // Verificando o status da resposta
            if (result.ok) {
                alert('Recurso atualizado com sucesso!');
            } else {
                alert(`Erro ao atualizar o recurso: ${result.message}`);
            }
        } else {
            // Caso a resposta não seja OK, exibe uma mensagem de erro
            alert('Erro ao se comunicar com o servidor.');
        }
    } catch (error) {
        // Caso ocorra algum erro durante a requisição, exibe uma mensagem de erro
        alert(`Ocorreu um erro ao tentar atualizar o recurso: ${error.message}`);
    }
}

/**
 * Lista todos os decks ou mãos, dependendo do tipo especificado.
 * @param {string} tipo - O tipo de recurso a ser listado: "deck" ou "hand".
 * @returns {Promise} Retorna uma promessa com os resultados da requisição.
 */
async function listDB(tipo) {
    try {
        // Valida se o tipo fornecido é válido
        const tiposPermitidos = ['deck', 'hand'];
        if (!tiposPermitidos.includes(tipo)) {
            throw new Error("Tipo inválido. Deve ser 'deck' ou 'hand'.");
        }

        // Define o endpoint com base no tipo
        const endpoint = `/back/${tipo}/list.php`;

        // Envia uma requisição GET para o servidor para listar o recurso
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao tentar listar os dados');
        }

        // Parseia a resposta como JSON
        const result = await response.json();

        // Verifica se a requisição foi bem-sucedida
        if (result.ok) {
            console.log(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} listados com sucesso!`);
            console.log(result.data); // Exibe os dados retornados
            return result.data; // Retorna os dados
        } else {
            console.error(`Erro ao listar os ${tipo}s: ${result.message}`);
            if (result.details) {
                console.error("Detalhes:", result.details);
            }
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}

/**
 * Deleta um deck ou uma mão, dependendo do tipo especificado.
 * @param {string} tipo - O tipo de recurso a ser deletado: "deck" ou "hand".
 * @param {string} id - O ID do recurso a ser deletado.
 * @returns {Promise} Retorna uma promessa com o resultado da requisição.
 */
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