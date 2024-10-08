"use client";
import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { Agent, Prisma } from "@prisma/client";

const containerStyle = {
  width: "100%",
  height: "calc(100svh - 4rem)",
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
  const { isLoaded } = useLoadScript({
    id: process.env.GOOGLE_MAPS_ID,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
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
        if (
          agent?.latitude &&
          agent?.longitude &&
          typeof agent?.latitude === "number" &&
          typeof agent?.longitude === "number"
        )
          return (
            <MarkerF
              key={agent.agentId}
              position={{
                lat: agent.latitude,
                lng: agent.longitude,
              }}
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
