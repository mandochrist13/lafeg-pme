"use client"

import React, { useState, useEffect } from "react";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export default function AddressAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions :", error);
      }
    };

    const timer = setTimeout(fetchSuggestions, 500); // délai pour éviter trop d'appels

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (suggestion: Suggestion) => {
    setSelected(suggestion);
    setQuery(suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input

        type="text"
        placeholder="Nzeng Ayong, Libreville, Estuaire, Gabon"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border px-4 py-2 rounded-md shadow-sm"
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              className="px-4 py-2 hover:bg-gray-100 text-sm font-medium cursor-pointer"
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="mt-4 hidden text-sm text-gray-700">
          ✅ Adresse sélectionnée : <strong>{selected.display_name}</strong><br />
          🌍 Latitude : {selected.lat} / Longitude : {selected.lon}
        </div>
      )}
    </div>
  );
}
