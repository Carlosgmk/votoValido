
import logoForum from '../../assets/logoForum.png'; // Importação da imagem

const Foto = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      
      <img 
        src={logoForum}  // Usando a imagem importada
        alt="Logo do Fórum" 
        style={{ width: '100px', height: '100px', borderRadius: '10px', marginBottom:'50px' }} 
      />
    </div>
  );
};

export default Foto;
