import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage{
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap(){

  const [orphanages, SetOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      SetOrphanages(response.data);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato do mapa</h2>
          <p>Muitas crianças estão esperando sua visita :D </p>
        </header>

        <footer>
          <strong>Palmitos</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>
      <Map 
        center={[-27.0996239,-52.6288118]}
        zoom={13.75}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        {orphanages.map(orphanages => {
          return (
            <Marker 
              key={orphanages.id}
              icon={mapIcon}
              position={[orphanages.latitude, orphanages.longitude]}
            >
              <Popup 
                closeButton={false} 
                minWidth={248}
                maxWidth={240}
                className="map-popup"
              >
                {orphanages.name}
                <Link to={`/orphanages/${orphanages.id}`}>
                  <FiArrowRight size={20} color="#FFF"/>
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;