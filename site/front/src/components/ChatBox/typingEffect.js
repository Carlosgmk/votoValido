export const digitacao = (elemento) => {
  const textoOriginal = elemento.textContent;

  // Substitui \n por <br> para as quebras de linha
  const textoComQuebras = textoOriginal.replace(/\n/g, '<br>');

  // Cria um array onde as partes do texto são quebradas
  const textoArray = textoComQuebras.split(/(\/start|\/consulta|Relatar um novo problema|Consultar atualizações da minha cidade)/);

  elemento.innerHTML = ''; // Limpa o conteúdo

  let totalDelay = 0; // Variável para calcular o atraso total

  textoArray.forEach((part) => {
    if (part === '/start') {
      // Adiciona o "/start" com o estilo desejado
      setTimeout(() => {
        elemento.innerHTML += `<span style="color: #002776; font-weight: bold;">/start</span>`;
        elemento.scrollTop = elemento.scrollHeight; // Para rolar até o final
      }, totalDelay);
      totalDelay += 30; // Atualiza o atraso total
    } else if (part === '/consulta') {
      // Adiciona o "/consulta" com o estilo desejado
      setTimeout(() => {
        elemento.innerHTML += `<span style="color: #002776; font-weight: bold;">/consulta</span>`;
        elemento.scrollTop = elemento.scrollHeight; // Para rolar até o final
      }, totalDelay);
      totalDelay += 30; // Atualiza o atraso total
    } else if (part.trim() === "Relatar um novo problema" || part.trim() === "Consultar atualizações da minha cidade") {
      // Apenas adiciona os botões sem animação
      setTimeout(() => {
        elemento.innerHTML += part; // Adiciona o texto dos botões diretamente
        elemento.scrollTop = elemento.scrollHeight; // Para rolar até o final
      }, totalDelay);
      totalDelay += 0; // Não adiciona atraso para botões
    } else {
      // Adiciona texto normal, incluindo <br> para quebras de linha
      if (part.includes('<br>')) {
        // Se a parte contém <br>, trata isso como uma quebra de linha
        const partesComQuebras = part.split('<br>');
        partesComQuebras.forEach((subparte, i) => {
          subparte.split('').forEach((letra, j) => {
            setTimeout(() => {
              elemento.innerHTML += letra; // Adiciona letra por letra
              elemento.scrollTop = elemento.scrollHeight; // Para rolar até o final
            }, totalDelay + (j * 30));
          });
          // Após adicionar todas as letras, adiciona a quebra de linha
          totalDelay += subparte.length * 30; // Atualiza o atraso total
          setTimeout(() => {
            if (i < partesComQuebras.length - 1) { // Adiciona <br> somente se não for a última parte
              elemento.innerHTML += '<br>'; // Adiciona a quebra de linha após o texto
              elemento.scrollTop = elemento.scrollHeight; // Para rolar até o final
            }
          }, totalDelay);
          totalDelay += 30; // Atraso para a quebra de linha
        });
      } else {
        // Se não houver quebras de linha, adiciona normalmente
        part.split('').forEach((letra, i) => {
          setTimeout(() => {
            elemento.innerHTML += letra; // Adiciona letra por letra
            elemento.scrollTop = elemento.scrollHeight; // Para rolar até o final
          }, totalDelay + (i * 30));
        });
        totalDelay += part.length * 30; // Atualiza o atraso total
      }
    }
  });

  // Adiciona um atraso para que a animação de digitação termine
  setTimeout(() => {
    elemento.innerHTML += ''; // Força a atualização do elemento
    elemento.scrollTop = elemento.scrollHeight; // Para rolar até o final
  }, totalDelay);
};
