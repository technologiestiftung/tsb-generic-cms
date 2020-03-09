import React from 'react';
import styled from 'styled-components';
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import { useField } from 'formik';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

import FormInputWrapper from '../FormInputWrapper';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapWrapper = styled.div`
  height: 250px;

  .leaflet-pane {
    z-index: 5;
  }
  .leaflet-top,
  .leaflet-bottom {
    z-index: 6;
  }
`;

export default ({ name }) => {
  const [field] = useField({ name });

  if (
    !field.value ||
    !field.value.coordinates ||
    !field.value.coordinates.length
  ) {
    return null;
  }

  const [lng, lat] = field.value.coordinates;

  return (
    <FormInputWrapper>
      <MapWrapper>
        <LeafletMap
          center={[lat, lng]}
          zoom={12}
          minZoom={5}
          maxZoom={18}
          boxZoom={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          dragging={false}
          keyboard={false}
          tap={false}
          touchZoom={false}
          style={{ height: '100%' }}
        >
          <TileLayer
            url={config.map.tilelayer}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lng]} />
        </LeafletMap>
      </MapWrapper>
    </FormInputWrapper>
  );
};
