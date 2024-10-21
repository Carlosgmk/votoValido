import { useEffect } from 'react'; // Importar useEffect
import HeaderAndNav from '../../components/header/HeaderAndNav';
import FooterContact from '../../components/footerContact/footerContact';
import { ContentForum } from './style';
import ForumBody from '../../components/ForumBody/ForumBody';
import { SobreContainer, SobreContent, SobreText } from '../../components/ForumBody/style';
import SesionMap from '../../components/MapaForum/mapa';
import Foto from '../../components/logoForum/index';

export default function Forum() {
  // useEffect para scrollar para a seção "Sobre" se o hash estiver presente
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#sobre') {
      const element = document.getElementById(hash.substring(1)); // Remove o '#' para pegar o id
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);
  
  return (
    <ContentForum>
      <HeaderAndNav />
      <Foto></Foto>
      <ForumBody />
      <SobreContainer id='sobre'> {/* Certifique-se de que o id é igual ao hash que você quer usar */}
        <SobreContent>
          <SobreText>
            <h2 style={{ color: '#FFDF2B', fontWeight: 'bold', fontSize: '1.7rem' }}>Quem Somos</h2>
            <p style={{ color: '#00000', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
              <span style={{ color: '#FFDF2B', fontWeight: 'bold' }}>VOTO VÁLIDO</span> é uma comunidade online que capacita os cidadãos a se envolverem ativamente na vida urbana. Uma rede social onde você pode não apenas compartilhar fotos dos acontecimentos na sua cidade, mas também discutir e influenciar os eventos que moldam ela. <br />
              Nosso objetivo é promover a transparência, a participação cívica e a responsabilidade governamental, capacitando os moradores a se tornarem agentes de mudança positiva em suas comunidades.
            </p>
          </SobreText>
        </SobreContent>
      </SobreContainer>
      <SesionMap />
      <FooterContact id='contato' />
    </ContentForum>
  );
}
