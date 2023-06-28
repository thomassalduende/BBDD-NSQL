import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import Swal from 'sweetalert2';

import { getAllAirports } from '../../services/getAllAirports';
import { deleteAirports } from '../../services/deleteAirports';

import { Modal } from '../Modal/modal';
import { FormUpdate } from '../FormUpdate';

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
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedIataFaa, setSelectedIataFaa] = useState('');

  const markerIcons = {
    America: redMarkerIcon,
    Europe: blueMarkerIcon,
    Asia: greenMarkerIcon,
    Australia: orangeMarkerIcon,
    Indian: violetMarkerIcon,
    Atlantic: yellowMarkerIcon,
    Pacific: grayMarkerIcon,
    Africa: blackMarkerIcon,
  };

  const getMarkerIcon = (continent) => {
    return markerIcons[continent] || grayMarkerIcon; // Icono predeterminado para continentes desconocidos
  };

  useEffect(() => {
    getAllAirports().then((res) => {
      setAirports(res);
      setFilteredAirports(res);
    });
  }, []);

  const handleOpenModal = (airport) => {
    setSelectedAirport(airport);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDelete = (airportId) => {
    deleteAirports(airportId)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Airport eliminado con éxito!',
          showConfirmButton: false,
          timer: 1500,
        });

        const updatedAirports = airports.filter((airport) => airport._id !== airportId);
        setAirports(updatedAirports);
        setFilteredAirports(updatedAirports);
      })
      .catch((error) => {
        console.error('Error al eliminar el aeropuerto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar el aeropuerto',
          text: 'Ocurrió un error al eliminar el aeropuerto. Por favor, intenta nuevamente.',
        });
      });
  };

  const filterAirportsByCityAndIataFaa = (city, iataFaa) => {
    let filtered = airports;

    if (city !== '') {
      filtered = filtered.filter((airport) =>
        airport.city && airport.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (iataFaa !== '') {
      filtered = filtered.filter(
        (airport) =>
          airport.iata_faa && airport.iata_faa.toLowerCase().includes(iataFaa.toLowerCase())
      );
    }

    setFilteredAirports(filtered);
  };

  useEffect(() => {
    const map = L.map('map').setView(santoriniCoordinates, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    const markers = L.markerClusterGroup();

    filteredAirports.forEach((marker) => {
      const markerIcon = L.icon({
        iconUrl: getMarkerIcon(marker.tz.split('/')[0]),
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });

      const markerElement = L.marker([marker.lat, marker.lng], {
        icon: markerIcon,
      }).bindPopup(
        `<strong>${marker.name}</strong><br>
        City: ${marker.city}<br>
        IATA/FAA Code: ${marker.iata_faa}<br>
        ICAO Code: ${marker.icao}<br>
        Latitude: ${marker.lat}<br>
        Longitude: ${marker.lng}<br>
        Altitude: ${marker.alt}<br>
        TZ: ${marker.tz}<br>
        <a href="/${marker._id}">
        <button class='bg-orange-500 mr-2 text-white w-10 rounded-sm shadow-sm' data-edit="${marker._id}">Editar</button>
        <button class='bg-orange-700 text-white w-13 rounded-sm shadow-sm' data-delete="${marker._id}">Eliminar</button>
        </a>
        `
      );

      markerElement.on('popupopen', () => {
        const editButton = document.querySelector(`button[data-edit="${marker._id}"]`);
        if (editButton) {
          editButton.addEventListener('click', (e) => {
            e.preventDefault()
            handleOpenModal(marker);
          });
        }

        const deleteButton = document.querySelector(`button[data-delete="${marker._id}"]`);
        if (deleteButton) {
          deleteButton.addEventListener('click', () => {
            handleDelete(marker._id);
          });
        }
      });

      markers.addLayer(markerElement);
    });

    map.addLayer(markers);

    if (filteredAirports.length > 0) {
      const position = [filteredAirports[0].lat, filteredAirports[0].lng];
      map.panTo(position);
    }

    return () => {
      map.remove();
    };
  }, [filteredAirports]);

  const handleCityFilterChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    filterAirportsByCityAndIataFaa(selectedCity, selectedIataFaa);
  };

  const handleIataFaaFilterChange = (event) => {
    const selectedIataFaa = event.target.value;
    setSelectedIataFaa(selectedIataFaa);
    filterAirportsByCityAndIataFaa(selectedCity, selectedIataFaa);
  };

  return (
    <>
    <div className="relative z-[0] mt-5">
      <div className="flex items-center justify-center mb-4">
        <label htmlFor="cityFilter" className="text-lg font-medium mb-2 ml-3">
          City:
        </label>
        <select
          id="cityFilter"
          name="cityFilter"
          className="font-medium bg-orange-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-orange-600"
          value={selectedCity}
          onChange={handleCityFilterChange}
        >
          <option value="">Todas</option>
          {airports.map((airport) => (
            <option value={airport.city} key={airport.city}>
              {airport.city}
            </option>
          ))}
        </select>
        <label htmlFor="iataFaaFilter" className="text-lg font-medium mb-2 ml-3">
          IATA/FAA:
        </label>
        <select
          id="iataFaaFilter"
          name="iataFaaFilter"
          className="font-medium bg-orange-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-orange-600"
          value={selectedIataFaa}
          onChange={handleIataFaaFilterChange}
        >
          <option value="">Todas</option>
          {airports.map((airport) => (
            <option value={airport.iata_faa} key={airport.iata_faa}>
              {airport.iata_faa}
            </option>
          ))}
        </select>
      </div>

      <div
          id="map"
          className="h-screen w-screen mb-20"
          style={{ position: 'relative', zIndex: '0' }}
        >
      </div>
    </div>


      {modalOpen && (
        <Modal title="Editar Airport" show={modalOpen} onHide={handleCloseModal}>
          <FormUpdate aiport={selectedAirport} />
        </Modal>
      )}
    </>
  );
};
