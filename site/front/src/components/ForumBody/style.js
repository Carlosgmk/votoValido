import styled from "styled-components";
import fundoSobre from '../../assets/Predio.jpg';

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centraliza os cards no container */
  gap: 20px;
  padding: 20px; /* Adiciona um padding ao container para espaçamento */
  background-color: #f9f9f9; /* Fundo mais claro para o container */
`;

export const Card = styled.div`
  width: 300px;
  padding: 20px;
  margin-bottom:50px;
  background-color: #ffffff; /* Cor de fundo branco para contraste */
  border: 1px solid #ddd; /* Borda cinza clara */
  border-radius: 8px; /* Bordas arredondadas */
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra mais intensa */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transição suave para hover */

  &:hover {
    transform: translateY(-5px); /* Efeito de elevação ao hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra mais forte ao passar o mouse */
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px; /* Bordas arredondadas para a imagem */
  margin-bottom: 10px;
`;

export const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: #333; /* Cor mais escura para título */
  margin-bottom: 10px;
  text-align: center;
`;

export const CardContent = styled.p`
  font-size: 1rem;
  color: #555; /* Cor de texto secundária */
  line-height: 1.5;
  text-align: center;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out; /* Animação de fade */

   h3{
    margin: 30px 0px 20px 0px;
    font-size: 1.1rem;
    
   }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 600px;
  max-height: 90vh;
  overflow-y: auto; /* Permite scroll no modal se o conteúdo exceder */
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-in-out; /* Animação de entrada */

   

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  

  h4 {
    font-size: 1.4rem;
    color: #333;
  }

  .close {

     margin-bottom: 10px;
    background-color: transparent; /* Exemplo de fundo transparente */
    color: #ffff; /* Cor do texto */
    border: none; /* Sem borda */
    cursor: pointer; /* Cursor de ponteiro */
    font-size: 1.1rem; /* Tamanho da fonte */
    padding: 2px 12px 2px 12px; /* Padding */
    background-color:red;
    transition: color 0.3s; /* Transição suave para a cor */
    
    &:hover {
      color: #ffff;
      background-color:#FF0011;
    }
  }

  
`;

export const ModalBody = styled.div`
  margin-top: 10px;
  text-align: left;

  img {
    max-width: 100%;
    max-height: 400px;
    margin: 0px 0px 0px 0px 0px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para a imagem */
  }

  p {
    font-size: 1rem;
    color: #666; /* Cor de texto do conteúdo */
    line-height: 1.6;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      background-color: #f4f4f4;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      font-size: 1rem;
      color: #555;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      &:hover {
        background-color: #ebebeb; /* Mudança de cor no hover dos comentários */
      }
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: #002776;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

 
`;

export const FilterInput = styled.input`
  display: inline-block;
  padding: 10px 15px;
  border: 1px solid #ddd; /* Borda cinza clara */
  border-radius: 5px; /* Bordas arredondadas */
  font-size: 1rem; /* Tamanho da fonte */
  color: #333; /* Cor do texto */
  margin-bottom: 20px; /* Espaçamento inferior */
  width: 100%; /* Largura completa */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve */

  &:focus {
    outline: none; /* Remove a borda padrão ao focar */
    border-color: #007bff; /* Borda azul ao focar */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Sombra ao focar */
  }
`;

export const SobreContainer = styled.div`
  position: relative;
  height: 400px; /* Altura do componente */
  overflow: hidden; /* Esconde o que excede o tamanho do componente */
  background-image: url(${fundoSobre}); /* Substitua pela URL da sua imagem */
  background-size: cover; /* Faz a imagem cobrir todo o fundo */
  background-attachment: fixed; /* Efeito parallax */
  background-position: center; /* Centraliza a imagem */
`;

export const SobreContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centraliza o conteúdo */
  color: white; /* Cor do texto */
  text-align: center; /* Alinhamento do texto */
  padding: 20px;
  backdrop-filter: blur(5px); /* Blur no fundo para destacar o texto */
  border-radius: 10px; /* Bordas arredondadas */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Sombra para o conteúdo */
`;

export const SobreText = styled.div`
  h2 {
    font-size: 2rem; /* Tamanho do título */
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem; /* Tamanho do texto */
    line-height: 1.5;
  }
`;