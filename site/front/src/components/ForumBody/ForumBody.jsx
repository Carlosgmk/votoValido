import  { useState, useEffect, useRef } from 'react';
import { 
  Card, CardImage, CardTitle, CardContent, CardContainer, 
  Modal, ModalContent, ModalHeader, ModalBody,  Button, 
  FilterInput,
} from './style'; 

const ForumBody = () => {
  const [cardsData, setCardsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [selectedCard, setSelectedCard] = useState(null);
  const [filterText, setFilterText] = useState(''); 
  const modalRef = useRef(null); 

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/messages');
        if (!response.ok) {
          throw new Error('Erro ao buscar mensagens');
        }
        const data = await response.json();
        const formattedData = data.map((message) => ({
          id: message._id,
          title: `Reclamação de ${message.localizacao}`,
          content: ` Problema relatado: ${message.subcategoria}`,
          expandedContent: `Foto: ${message.foto}`,
          imageUrl: message.foto ? `http://localhost:3333${message.foto}` : 'default-image.jpg',
          likes: message.likes || 0,
          comments: message.comments || [],
        }));
        setCardsData(formattedData);
        setFilteredData(formattedData); // Inicialmente, os dados filtrados são todos os dados
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  // Função para filtrar os dados com base no texto do filtro
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterText(value);
    const filtered = cardsData.filter(card => 
      card.title.toLowerCase().includes(value.toLowerCase()) ||
      card.content.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered); // Atualiza os dados filtrados
  };

  const handleCardClick = (card) => {
    setSelectedCard(card); 
  };

  const handleCloseModal = () => {
    setSelectedCard(null); 
  };

  const handleLike = async () => {
    if (selectedCard) {
      try {
        const response = await fetch(`http://localhost:3333/api/messages/${selectedCard.id}/like`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Erro ao curtir a mensagem');
        }
  
        const updatedMessage = await response.json();
        const updatedCardsData = cardsData.map((card) =>
          card.id === updatedMessage._id ? { ...card, likes: updatedMessage.likes } : card
        );
        setCardsData(updatedCardsData);
        setFilteredData(updatedCardsData.filter(card => 
          card.title.toLowerCase().includes(filterText.toLowerCase()) ||
          card.content.toLowerCase().includes(filterText.toLowerCase())
        )); // Atualiza os dados filtrados
        setSelectedCard((prevCard) => ({ ...prevCard, likes: updatedMessage.likes }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleComment = async (comment) => {
    if (selectedCard) {
      try {
        const response = await fetch(`http://localhost:3333/api/messages/${selectedCard.id}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }),
        });
  
        if (!response.ok) {
          throw new Error('Erro ao adicionar comentário');
        }
  
        const updatedMessage = await response.json();
        const updatedCardsData = cardsData.map((card) =>
          card.id === updatedMessage._id ? { ...card, comments: updatedMessage.comments } : card
        );
        setCardsData(updatedCardsData);
        setFilteredData(updatedCardsData.filter(card => 
          card.title.toLowerCase().includes(filterText.toLowerCase()) ||
          card.content.toLowerCase().includes(filterText.toLowerCase())
        )); // Atualiza os dados filtrados
        setSelectedCard((prevCard) => ({ ...prevCard, comments: updatedMessage.comments }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  const getOrGenerateUserName = () => {
    let userName = localStorage.getItem('userName');
    if (!userName) {
      const randomNumber = Math.floor(Math.random() * 10000);
      userName = `User${randomNumber}`;
      localStorage.setItem('userName', userName);
    }
    return userName;
  };

  const userName = getOrGenerateUserName();

  return (
    <CardContainer>
      <FilterInput  
        type="text" 
        placeholder="Filtrar reclamações..." 
        value={filterText}
        onChange={handleFilterChange}
        style={{ marginBottom: '50px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
      />
      {filteredData.map((card) => (
        <Card key={card.id} onClick={() => handleCardClick(card)}>
          <CardImage src={card.imageUrl} alt={`Imagem da ${card.title}`} />
          <CardTitle>{card.title}</CardTitle>
          <CardContent>{card.content}</CardContent>
        </Card>
      ))}

      {selectedCard && (
        <Modal onClick={handleModalClick}>
          <ModalContent ref={modalRef}>
            <ModalHeader>
              <h4>{selectedCard.title}</h4>
              <Button className="close" onClick={handleCloseModal}>x</Button>
            </ModalHeader>
            <ModalBody>
              <p>{selectedCard.content}</p>
              {selectedCard.imageUrl && (
                <img 
                  src={selectedCard.imageUrl} 
                  alt={`Foto da ${selectedCard.title}`} 
                  style={{ width: '100%', height: 'auto' }} 
                />
              )}
            

              <div style={{ display: 'flex',  justifyContent:'space-between', margin: '10px 0px 20px 0px',  }}>
              <div className='areaL'>
              <img 
                  src="data:image/png;base64,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" 
                  alt="Curtir" 
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }} 
                  onClick={handleLike}
                />
                <span style={{ margin: '7px' }}>{selectedCard.likes}</span>
              </div>
                <div>
                <input type="text" placeholder="Adicionar comentário..." id="commentInput" />
                <Button onClick={() => {
                  const commentInput = document.getElementById('commentInput');
                  if (commentInput.value.trim()) {
                    handleComment(commentInput.value);
                    commentInput.value = '';
                  }
                }}>Comentar</Button>
              </div>
              </div>
             
              <h3>Comentários:</h3>
              <ul>
                {selectedCard.comments.map((comment, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/17/17004.png" 
                      alt="Foto do usuário" 
                      style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} 
                    />
                    <div>
                      <strong>{userName}</strong>
                      <p>{comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </CardContainer>
    
  );
};

export default ForumBody;

