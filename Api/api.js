// api.js
const sendMessageToAPI = async (dados) => {
  try {
    const response = await fetch('http://localhost:3333/api/messages', { // Ajuste a URL conforme sua API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
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

export { sendMessageToAPI };
