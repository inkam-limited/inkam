"use client";
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Agent } from "@prisma/client";

const containerStyle = {
  width: "100%",
  height: "90svh",
};

const center = {
  lat: 23.777176,
  lng: 90.399452,
};

function MapsComponent({
  agents,
}: {
  agents: Pick<
    Agent,
    "AgentType" | "name" | "latitude" | "longitude" | "agentId"
  >[];
}) {
  const { isLoaded } = useJsApiLoader({
    id: process.env.GOOGLE_MAPS_ID,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {agents.map((agent) => {
        if (agent.latitude === null || agent.longitude === null) return null;
        return (
          <Marker
            key={agent.agentId}
            position={{ lat: agent.latitude, lng: agent.longitude }}
            title={agent.name}
            label={agent.name}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapsComponent);
