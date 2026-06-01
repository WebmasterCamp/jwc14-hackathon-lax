"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Territory } from "@/lib/types";
import { TERRITORY_COLORS, ANIMAL_EMOJI } from "@/lib/mockData";

// Fix Leaflet default icon paths in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ─── Avatar Pin as DivIcon ────────────────────────────────────────────────────
function createAvatarIcon(territory: Territory): L.DivIcon {
  const colors = TERRITORY_COLORS[territory.color];
  const emoji = territory.owner ? ANIMAL_EMOJI[territory.owner.animal] : "📍";
  const bg = territory.owner ? territory.owner.color : "#1A1A2E";
  const size = territory.owner ? 44 : 32;

  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="
        width:${size}px; height:${size}px;
        border-radius:50%;
        background:${bg};
        border:2.5px solid ${territory.owner ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"};
        box-shadow:0 2px 12px rgba(0,0,0,0.6),0 0 0 1px ${colors.border}40;
        display:flex; align-items:center; justify-content:center;
        font-size:${territory.owner ? "1.3rem" : "1rem"};
        cursor:pointer;
        transition:transform 0.2s;
      ">
        ${emoji}
      </div>
    `,
  });
}

// ─── Unclaimed pin ────────────────────────────────────────────────────────────
function createUnclaimedIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `
      <div style="
        width:28px; height:28px; border-radius:50%;
        background:rgba(240,240,248,0.95);
        border:2px solid rgba(0,0,0,0.2);
        box-shadow:0 2px 8px rgba(0,0,0,0.25);
        display:flex; align-items:center; justify-content:center;
        font-size:0.9rem; cursor:pointer;
      ">📍</div>
    `,
  });
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  territories: Territory[];
  onSelect: (t: Territory) => void;
  selectedId: string | null;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TerritoryMapInner({ territories, onSelect, selectedId }: Props) {
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  return (
    <MapContainer
      center={[13.736, 100.523]}
      zoom={13}
      zoomControl={false}
      style={{ height: "100%", width: "100%", background: "#F0F0F0" }}
      minZoom={11}
      maxZoom={16}
    >
      {/* Light minimal tile layer */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution=""
        subdomains="abcd"
      />

      {/* Territory GeoJSON Polygons */}
      {territories.map((territory) => {
        const colors = TERRITORY_COLORS[territory.color];
        const isSelected = selectedId === territory.id;

        // Build GeoJSON feature from territory polygon
        const geojson: GeoJSON.Feature<GeoJSON.Polygon> = {
          type: "Feature",
          properties: { id: territory.id },
          geometry: {
            type: "Polygon",
            coordinates: [
              // GeoJSON uses [lng, lat] order
              territory.polygon.map(([lat, lng]) => [lng, lat]),
            ],
          },
        };

        return (
          <GeoJSON
            key={`${territory.id}-${isSelected}`}
            data={geojson}
            style={() => ({
              fillColor: territory.owner ? colors.fill : "rgba(0,0,0,0.06)",
              fillOpacity: isSelected ? 0.85 : territory.owner ? 0.65 : 0.2,
              color: territory.owner ? colors.border : "rgba(0,0,0,0.2)",
              weight: isSelected ? 2.5 : 1.5,
              opacity: isSelected ? 1 : 0.8,
              dashArray: territory.owner ? undefined : "4 4",
            })}
            eventHandlers={{
              click: () => onSelect(territory),
              mouseover: (e) => {
                const layer = e.target as L.Path;
                layer.setStyle({
                  fillOpacity: 0.8,
                  weight: 2.5,
                });
              },
              mouseout: (e) => {
                const layer = e.target as L.Path;
                layer.setStyle({
                  fillOpacity: isSelected ? 0.85 : territory.owner ? 0.65 : 0.15,
                  weight: isSelected ? 2.5 : 1.5,
                });
              },
            }}
          />
        );
      })}

      {/* Avatar Markers */}
      {territories.map((territory) => {
        const icon = territory.owner
          ? createAvatarIcon(territory)
          : createUnclaimedIcon();

        const MarkerComp = () => {
          const map = useMap();

          useEffect(() => {
            const marker = L.marker([territory.lat, territory.lng], { icon })
              .addTo(map)
              .on("click", () => onSelect(territory));

            markersRef.current.set(territory.id, marker);
            return () => {
              marker.remove();
              markersRef.current.delete(territory.id);
            };
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [map, territory.id, territory.owner?.username]);

          return null;
        };

        return <MarkerComp key={`marker-${territory.id}`} />;
      })}
    </MapContainer>
  );
}