import React from 'react';
import {  memo, useCallback,useState,useRef, useEffect} from 'react';
import { digitacao } from './typingEffect';
import PropTypes from 'prop-types';
import FotoContainer from '../FotoChatbot/fotoContainer';
import { CustomButton,StartMessage } from './style';


const MensagensChat = memo(({ 
  mensagem,
  indice, 
  selectedFile,
  fotoCarregada,
  mensagens, 
  setMensagens, 
  handleRelatarProblema,
  handleConsultarProblema, 
  handleButtonClick, 
  handleCompartilharLocalizacao, 
  handleEnviarManualmente, 
  handleSubcategoriaClick,
  handleGetEstados,
  handleEstadoClick,
  handleEstadoClickCidade,
  
  
}) => {

  
  const [estados, setEstados] = useState([]);
  const mensagemRef = useRef(null);
  

  const handleConsultarEstados = useCallback(async () => {
    const estadosUnicos = await handleGetEstados; // Chama a função para obter os estados
    setEstados(estadosUnicos); // Atualiza os estados
  }, [handleGetEstados]);

  const handleCompartilharLocalizacaoAtual = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.ddacdac981d0c27a478e935f8558a272&lat=${latitude}&lon=${longitude}&format=json`)
          .then(response => response.json())
          .then(data => {
            console.log('Resposta da API:', JSON.stringify(data, null, 2));
            handleCompartilharLocalizacao();
          })
          .catch(error => console.error(error));
      },
      (error) => console.error(error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, [handleCompartilharLocalizacao]);


  useEffect(() => {
    if (mensagemRef.current && mensagem.from === 'bot') {
        digitacao(mensagemRef.current);
       
    }
  }, [mensagem, mensagem.from]);

 

  return (
    <div key={indice} className={`chat-message ${mensagem.from === 'bot' ? 'bot' : 'user'}`}>
    {mensagem.from === 'user' && mensagem.text === 'Foto adicionada' ? (
      <FotoContainer selectedFile={selectedFile} fotoCarregada={fotoCarregada} mensagens={mensagens} />
    ) : (
      <div >
        {mensagem.from === 'bot' ? (
          <>
            {mensagem.text && (
              <p  ref={mensagemRef} className={`eftTyping ${indice === mensagens.length - 2 ? 'last-bot-message' : ''}`}>
                {mensagem.text.split(/(\/start|\/consulta)/).map((part, index) => (
                  <React.Fragment key={index}>
                    {part && part.trim() !== '' && part.trim() !== '/start' && part.trim() !== '/consulta' ? (
                      <span>{part}</span>
                    ) : null}
                    {part.trim() === '/start' && <StartMessage key={index}>/start</StartMessage>}
                    {part.trim() === '/consulta' && <StartMessage key={index}>/consulta</StartMessage>}
                  </React.Fragment>
                ))}
              </p>
            )}
  
            {/* Renderizando botões */}
            {mensagem.text === 'Muito bem, com qual das opções você deseja seguir:' &&  (
              <div className="button-group">
                <CustomButton onClick={handleRelatarProblema}>Relatar um novo problema</CustomButton>
                <CustomButton onClick={handleConsultarProblema}>Consultar atualizações da minha cidade</CustomButton>
              </div>
            )}
  
            {mensagem.text === 'Agora compartilhe sua localização:' && (
              <div className="button-group">
                <CustomButton onClick={handleCompartilharLocalizacaoAtual}>Compartilhar a Localização Atual</CustomButton>
                <CustomButton onClick={() => {
                  handleEnviarManualmente();
                  setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: 'Enviar Manualmente' }]);
                }}>
                  Enviar Manualmente
                </CustomButton>
              </div>
            )}
  
            {mensagem.opcoes && (
              <div className="button-group">
                {mensagem.opcoes.map((opcao, index) => (
                  <CustomButton key={index} onClick={() => mensagem.isSubcategory ? handleSubcategoriaClick(opcao) : handleButtonClick(opcao)}>
                    {opcao}
                  </CustomButton>
                ))}
              </div>
            )}
  
            {mensagem.estado && (
              <div className="button-group">
                {mensagem.estado.map((estado, index) => (
                  <CustomButton key={index} onClick={() => { handleConsultarEstados(estados); handleEstadoClick(estado); }}>
                    {estado}
                  </CustomButton>
                ))}
              </div>
            )}
  
            {mensagem.cidades && (
              <div className="button-group">
                {mensagem.cidades.map((cidade, index) => (
                  <CustomButton key={index} onClick={() => { handleEstadoClickCidade(cidade); }}>
                    {cidade}
                  </CustomButton>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>{mensagem.text}</p>
        )}
      </div>
    )}
  </div>
  
  );
});

MensagensChat.displayName = 'MensagensChat';

MensagensChat.propTypes = {
  mensagem: PropTypes.shape({
    from: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    opcoes: PropTypes.arrayOf(PropTypes.string),
    estado: PropTypes.arrayOf(PropTypes.string),
    cidades: PropTypes.arrayOf(PropTypes.string),
    ruas: PropTypes.arrayOf(PropTypes.string),
    subcategorias: PropTypes.arrayOf(PropTypes.string),
    isSubcategory: PropTypes.bool,
  }).isRequired,
  indice: PropTypes.number.isRequired,
  selectedFile: PropTypes.object,
  fotoCarregada: PropTypes.bool,
  mensagens: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    opcoes: PropTypes.arrayOf(PropTypes.string),
    estado: PropTypes.arrayOf(PropTypes.string),
    cidades: PropTypes.arrayOf(PropTypes.string),
    ruas: PropTypes.arrayOf(PropTypes.string),
    subcategorias: PropTypes.arrayOf(PropTypes.string),
    isSubcategory: PropTypes.bool,
  })).isRequired,
  setMensagens: PropTypes.func.isRequired,
  handleRelatarProblema: PropTypes.func.isRequired,
  handleConsultarProblema: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleSubcategoriaClick: PropTypes.func,
  handleCompartilharLocalizacao: PropTypes.func,
  handleEnviarManualmente: PropTypes.func,
  handleGetEstados: PropTypes.func,
  handleEstadoClick: PropTypes.func,
  handleEstadoClickCidade: PropTypes.func,
  handleselCidade: PropTypes.func,
  handleConsultarProblemaRua: PropTypes.func,
};

export default MensagensChat;