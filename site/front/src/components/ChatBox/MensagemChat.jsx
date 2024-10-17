import {  memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import FotoContainer from '../FotoChatbot/fotoContainer';
import { CustomButton } from './style';

const formatarMensagem = (mensagem) => {
  if (typeof mensagem === 'string') {
    return mensagem.split('').map((char, index) => (
      `<span style="animation-delay: ${index * 50}ms">${char}</span>`
    )).join('');
  }
  return mensagem;
}

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
  handleSubcategoriaClick 
}) => {

  const handleCompartilharLocalizacaoAtual = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.ddacdac981d0c27a478e935f8558a272&lat=${latitude}&lon=${longitude}&format=json`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
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

  return (
    <div key={indice} className={`chat-message ${mensagem.from === 'bot' ? 'bot' : 'user'}`}>
      {mensagem.from === 'user' && mensagem.text === 'Foto adicionada' ? (
        <FotoContainer selectedFile={selectedFile} fotoCarregada={fotoCarregada} mensagens={mensagens} />
      ) : (
        mensagem.from === 'bot' ? (
          <div>
            {mensagem.text && (
              <p
                className={`eftTyping ${indice === mensagens.length - 1 ? 'last-bot-message' : ''}`}
                dangerouslySetInnerHTML={{ __html: formatarMensagem(mensagem.text) }}
              />
            )}
            {mensagem.text === 'Muito bem, com qual das opções você deseja seguir:' && (
              <div className="button-group">
                <br />
                <CustomButton onClick={handleRelatarProblema}>Relatar um novo problema</CustomButton>
                <CustomButton onClick={handleConsultarProblema}>Consultar atualizações da minha cidade</CustomButton>
              </div>
            )}
            {mensagem.text === 'Agora compartilhe sua localização:' && (
              <div className="button-group">
                <br />
                <CustomButton onClick={handleCompartilharLocalizacaoAtual}>Compartilhar a Localização Atual</CustomButton>
                <CustomButton onClick={() => {
                  handleEnviarManualmente();
                  setMensagens(prevMensagens => [...prevMensagens, { from: 'user', text: 'Enviar Manualmente' }]);
                }}>Enviar Manualmente</CustomButton>
              </div>
            )}
            {mensagem.opcoes && (
              <div className="button-group">
                {mensagem.text ? <br /> : null}
                {mensagem.opcoes.map((opcao, index) => (
                  <CustomButton key={index} onClick={() => mensagem.isSubcategory ? handleSubcategoriaClick(opcao) : handleButtonClick(opcao)}>{opcao}</CustomButton>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p>{mensagem.text}</p>
        )
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
};

export default MensagensChat;