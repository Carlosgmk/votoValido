import { useEffect, useState } from 'react';
import { MapaContent, DescMapaContent, MapStyled} from './style';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { fetchLocationsAndConvertToCoordinates } from './LogicaLocalizacao';

export default function SesionMap() {
  const [coordenadas, setCoordenadas] = useState([]); // Estado para armazenar as coordenadas

  useEffect(() => {
    const fetchCoordenadas = async () => {
      const coords = await fetchLocationsAndConvertToCoordinates();
      console.log('Coordenadas obtidas:', coords); // Verifique as coordenadas aqui
      setCoordenadas(coords);
    };

    fetchCoordenadas();
  }, []);

  // Define o centro do mapa na primeira coordenada ou em São Paulo como fallback
  const position = coordenadas.length > 0
    ? [parseFloat(coordenadas[0].latitude), parseFloat(coordenadas[0].longitude)]
    : [-23.55052, -46.633308]; // São Paulo

  return (
    <MapaContent>
       
      <DescMapaContent> 
        <h1>Veja os Pontos no Mapa Interativo.</h1>
        <span>Esses são os pontos que contêm as Denúncias</span>

        <p>O<strong> MAPA INTERATIVO</strong> é uma ferramenta digital inovadora que permite<br /> aos cidadãos explorar e interagir com sua cidade de maneira intuitiva.<br />Neste espaço virtual, você pode visualizar pontos de interesse e características geográficas.</p>
      </DescMapaContent>
      
      <MapStyled>
        <MapContainer
          center={position} // Define o centro do mapa
          zoom={5}         // Define o nível de zoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Adiciona marcadores para cada coordenada obtida */}
          {coordenadas.map((coord, index) => (
            <Marker
              key={index}
              position={[parseFloat(coord.latitude), parseFloat(coord.longitude)]} // Converte para número
            >
             
            </Marker>
          ))}      
        </MapContainer>
      </MapStyled>
    </MapaContent>
  );
}
