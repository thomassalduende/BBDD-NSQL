import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

import { getAllAirports } from '../../services/getAllAirports';
import { deleteAirports } from '../../services/deleteAirports'

import { Modal } from '../Modal/modal'
import { FormUpdate } from '../FormUpdate'

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
  const [open, setOpen] = useState(false)

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
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteAirports(id)
      .then(() =>{
        Swal.fire({
          icon: 'success',
          title: 'Aiport eliminado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }


  useEffect(() => {
    const map = L.map('map').setView(santoriniCoordinates, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    const markers = L.markerClusterGroup();

    airports.forEach((marker) => {
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
        <button class='bg-orange-500 mr-2 text-white w-10 rounded-sm shadow-sm' data-edit="${marker._id}>Editar</button>
        <button class='bg-orange-700 text-white w-13 rounded-sm shadow-sm' data-delete="${marker._id}">Eliminar</button>`
      );
      const editButton = document.querySelector(`button[data-edit="${marker._id}"]`);
        if (editButton) {
          editButton.addEventListener("click", () => {
            // deleteAirport(marker._id, markerClusterGroup);
          });
        }

        const deleteButton = document.querySelector(`button[data-delete="${marker._id}"]`);
        if (deleteButton) {
          deleteButton.addEventListener("click", () => {
            // deleteAirport(marker._id, markerClusterGroup);
          });
        }

      markers.addLayer(markerElement);
    });

    map.addLayer(markers);

    return () => {
      map.remove();
    };
  }, [airports]);

  return (
    <>
    <div className="relative z-[0]">
      <div
        id="map"
        className="h-screen w-screen mb-20"
        style={{ position: 'relative', zIndex: '0' }}
      ></div>
    </div>
    {
      open 
        ? <Modal
            title='Editar Airport'
            show={open}
            onHide={handleClose}
          >
            <FormUpdate aiport={airports}/>
          </Modal>
        : null
    }
    </>
  );
};
