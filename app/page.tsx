'use client';
import { useState } from 'react';
import { loader } from './google.maps';

export default function Home() {
  const [address, setAddress] = useState('');

  const onClick = () => {
    navigator.geolocation.getCurrentPosition(async (v) => {
      loader.importLibrary('geocoding').then(async (google) => {
        const geocoder = new google.Geocoder();
        const latlng = {
          lat: v.coords.latitude,
          lng: v.coords.longitude,
        };

        geocoder.geocode({ location: latlng }).then((response) => {
          if (response.results[0]) {
            setAddress(response.results[0].formatted_address);
          }
        });
      });
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-24">
        <button
          onClick={onClick}
          className="px-4 py-2 bg-white text-black rounded"
        >
          Geolocalisation
        </button>
      </div>
      <div>
        <textarea
          rows={3}
          className="w-[400px] text-black"
          value={address}
        ></textarea>
      </div>
    </main>
  );
}
