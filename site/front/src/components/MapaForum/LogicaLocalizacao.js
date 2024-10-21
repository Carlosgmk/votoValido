// LogicaLocalizacao.js

import { getMessageToAPI } from '../../../../../Api/api.js';

export async function fetchLocationsAndConvertToCoordinates() {
  const coordenadas = [];
  try {
    const data = await getMessageToAPI();

    if (data && Array.isArray(data)) {
      for (const item of data) {
        const locationInput = item.localizacao;
        const [estado, cidade, rua] = locationInput.split(",").map(item => item.trim()).reverse();
        const address = `${rua}, ${cidade}, ${estado}`;
        const apiKey = 'pk.ddacdac981d0c27a478e935f8558a272';

        try {
          // Faz a requisição para a API LocationIQ com o endereço formatado
          const response = await fetch(`https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`);
          
          // Verifica se a requisição foi bem-sucedida
          if (!response.ok) {
            console.error("Erro ao fazer requisição:", response.statusText);
            continue; // Passa para a próxima iteração se houver erro
          }

          // Analisa a resposta da API
          const geocodeData = await response.json();

          // Verifica se o array de resultados não está vazio e possui coordenadas
          if (geocodeData.length > 0 && geocodeData[0].lat && geocodeData[0].lon) {
            const { lat, lon } = geocodeData[0];

            const location = {
              rua: rua,
              cidade: cidade,
              estado: estado,
              latitude: lat,
              longitude: lon
            };

            coordenadas.push(location); // Adiciona o objeto com coordenadas ao array
          } else {
            console.error("Nenhuma coordenada encontrada para o endereço:", address);
          }
        } catch (error) {
          console.error("Erro ao fazer requisição:", error);
        }

        // Pausa entre requisições para evitar 429 (Too Many Requests)
        await sleep(500);
      }
    } else {
      console.error("Dados não encontrados ou formato inválido.");
    }
  } catch (error) {
    console.error("Erro ao buscar locais:", error);
  }
  return coordenadas; 
}

// Função auxiliar para pausar o código entre requisições
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}