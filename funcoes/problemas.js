// problemas.js
const problemasList = {
  "Pavimentação": [
    "Buracos no Asfalto",
    "Rachaduras e Ondulações",
    "Asfalto Desgastado",
    "Falta de Sinalização Horizontal (Marcações no Chão)",
    "Sinalização Viária Apagada ou Danificada"
  ],
  "Obras": [
    "Desvios mal Sinalizados",
    "Faixas Interditadas Sem Aviso Prévio",
    "Sinalização de Obras Incompleta ou Inadequada",
    "Atraso na Conclusão das Obras"
  ],
  "Drenagem": [
    "Pontos de Alagamento",
    "Elevação/Depressão de Bueiros",
    "Valetas Entupidas",
    "Bueiro com Tampa Quebrada"
  ],
  "Pontes e Passarelas": [
    "Pontes Danificadas",
    "Passarelas em Mau Estado",
    "Falta de Iluminação em Pontes e Passarelas",
    "Risco de Queda"
  ],
  "Transporte Público": [
    "Falta de Linhas de Ônibus",
    "Ônibus em Mau Estado",
    "Frota Insuficiente",
    "Falta de Segurança nos Ônibus",
    "Ponto de Ônibus em Mau Estado"
  ],
  "Praças e Parques": [
    "Falta de Manutenção",
    "Equipamentos de Lazer Danificados",
    "Falta de Iluminação",
    "Presença de Moradores de Rua",
    "Presença de Usuários de Drogas",
    "Mato Alto",
    "Árvores Encostando em Fios Elétricos"
  ],
  "Calçadas": [
    "Desníveis e Buracos",
    "Falta de Rampas de Acessibilidade",
    "Calçadas Estreitas",
    "Ocupação por Vendedores Ambulantes"
  ],
  "Áreas Verdes": [
    "Falta de Cuidado e Manutenção",
    "Risco de Incêndios",
    "Invasão por Construções Irregulares",
    "Árvores Muito Próximas de Fiação Elétrica"
  ],
  "Iluminação Pública": [
    "Lâmpadas Queimadas",
    "Postes de Iluminação Danificados",
    "Falta de Iluminação em Áreas Periféricas",
    "Fios de Poste/Alta Tensão Furtados"
  ],
  "Segurança Pública": [
    "Falta de Policiamento",
    "Iluminação Pública Precária",
    "Presença de Pontos de Drogas",
    "Vandalismo",
    "Veículos Executando Manobras Perigosas"
  ],
  "Outros": [
    "Falta de Coleta de Lixo",
    "Rede de Esgoto Precária"
  ],
  "Prédios do Governo/Prefeitura": [
    "Mau Estado",
    "Funcionários Mal Educados",
    "Falta de Profissionais",
    "Falta de Professores",
    "Bebedouros/Banheiros em Más Condições"
  ]
};

export const carregar_problemas = () => {
  return problemasList;
};
