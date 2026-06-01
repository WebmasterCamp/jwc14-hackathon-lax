"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import type { Territory } from "@/lib/types";
import { fetchTerritories } from "@/lib/mockApi";

// Load Leaflet only on client side — no SSR
const TerritoryMapInner = dynamic(
  () => import("./TerritoryMapInner"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center"
        style={{ background: "#08080F" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "rgba(255,138,0,0.3)", borderTopColor: "#FF8A00" }} />
          <span className="text-white/40 text-sm">Loading map…</span>
        </div>
      </div>
    ),
  }
);

interface Props {
  onSelectTerritory: (t: Territory | null) => void;
  selectedId: string | null;
}

export default function TerritoryMap({ onSelectTerritory, selectedId }: Props) {
  const [territories, setTerritories] = useState<Territory[]>([]);

  useEffect(() => {
    fetchTerritories().then(setTerritories);
  }, []);

  return (
    <div className="w-full h-full">
      <TerritoryMapInner
        territories={territories}
        onSelect={onSelectTerritory}
        selectedId={selectedId}
      />
    </div>
  );
}