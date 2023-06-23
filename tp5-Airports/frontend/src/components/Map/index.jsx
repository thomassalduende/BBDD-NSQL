import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAllAirports } from '../../services/getAllAirports';
import { Aiport } from '../Aiport';
import { Link } from 'react-router-dom';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import redMarkerIcon from '../../assets/iconRed.png';
import blueMarkerIcon from '../../assets/iconBlue.png';
import greenMarkerIcon from '../../assets/iconGreen.png';
import orangeMarkerIcon from '../../assets/iconOrange.png';
import violetMarkerIcon from '../../assets/iconViolet.png';
import yellowMarkerIcon from '../../assets/iconYellow.png';
import grayMarkerIcon from '../../assets/iconGrey.png';
import blackMarkerIcon from '../../assets/iconBlack.png';


export const Map = () => {
  const santoriniCoordinates = [36.3932, 25.4615];

  const [airports, setAirports] = useState([]);

  const markerIcons = {
    America: redMarkerIcon,
    Europe: blueMarkerIcon,
    Asia: greenMarkerIcon,
    Australia: orangeMarkerIcon,
    Indian: violetMarkerIcon,
    Atlantic: yellowMarkerIcon,
    Pacific: grayMarkerIcon,
    Africa: blackMarkerIcon
  };

  const getMarkerIcon = continent => {
    return markerIcons[continent] || grayMarkerIcon; // Icono predeterminado para continentes desconocidos
  };

  useEffect(() => {
    getAllAirports().then(res => {
      setAirports(res);
    });
  }, []);

  return (
    <div className="relative z-[0]">
      <MapContainer
        center={santoriniCoordinates}
        zoom={13}
        className="h-screen w-screen mb-20"
        style={{ position: 'relative', zIndex: '0' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
        />
        {airports.map((marker, index) => {
          const markerIcon = L.icon({
            iconUrl: getMarkerIcon(marker.tz.split("/")[0]),
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          });

          return (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={markerIcon}
            >
              <Popup>
                <Link to={`/${marker._id}`}>
                  <h3 className='text-black/100 font-medium grid justify-center mb-4'>{marker.name}</h3>
                  <button
                    className='bg-black text-white w-[100px] h-[25px] rounded-sm shadow-md hover:bg-black/75 transition'
                  >
                    Ver detalles
                  </button>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
