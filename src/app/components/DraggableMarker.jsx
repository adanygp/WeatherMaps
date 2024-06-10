"use client";
import { useState, useCallback, useRef, useMemo } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import marker from "../../../public/pointer.svg";

export default function DraggableMarker({ cordinates, changeCordinates }) {
  const iconPerson = new L.Icon({
    iconUrl: marker.src,
    iconRetinaUrl: marker.src,
    popupAnchor: [-0, -0],
    iconSize: [30, 30],
  });

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log("marker.getLatLng()", marker.getLatLng());
          changeCordinates(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={cordinates}
      ref={markerRef}
      icon={iconPerson}
    ></Marker>
  );
}
