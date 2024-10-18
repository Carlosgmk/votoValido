// api.js
const sendMessageToAPI = async (dados) => {
  try {
    const response = await fetch('http://localhost:3333/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados), // Corpo da requisição para POST
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar os dados');
    }

    const result = await response.json();
    console.log('Dados enviados com sucesso:', result);
  } catch (error) {
    console.error('Erro:', error);
  }
};

const getMessageToAPI = async () => {
  try {
    const response = await fetch('http://localhost:3333/api/messages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar os dados');
    }

    const result = await response.json();
    console.log('Dados buscados com sucesso:', result);
    return result;
  } catch (error) {
    console.error('Erro:', error);
  }
};

export { sendMessageToAPI, getMessageToAPI };
