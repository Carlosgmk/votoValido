import styled from "styled-components";


 const MapaContent = styled.main`
  display: flex;

  align-items: start;
   height: 70vh;
   
`

const DescMapaContent = styled.main`
  
 margin-top:5%;
 margin-left:5%;
 
 display: flex;
 justify-content: start;
 flex-direction: column;
//  border:1px solid red;

 h1{
    font-weight: bold;
    font-size: 2.3rem;
 }
  
 span {
    color: #AAD3DF;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 50px;

 }

 strong{
   font-weight: bold;
 }

 p {
      font-size: 1rem;
 }

`




const MapStyled = styled.div`
  
  height: 75%; /* Ajuste o tamanho do mapa aqui */
  width: 50%;
   margin-top:5%;
   margin-bottom:5%;
   margin-right:5%;
   margin-left:5%;
`;


export {MapaContent,DescMapaContent,MapStyled}