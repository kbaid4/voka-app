import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// --- CATEGORY DATA ---
const categories = [
  {
    key: "home_life",
    label: "Home Life",
    words: [
      { english: "Home", dutch: "Huis" },
      { english: "Living Room", dutch: "Woonkamer" },
      { english: "Bedroom", dutch: "Slaapkamer" },
      { english: "Bathroom", dutch: "Badkamer" },
      { english: "Toilet", dutch: "Toilet" },
      { english: "Kitchen", dutch: "Keuken" },
      { english: "Cleaning", dutch: "Schoonmaken" },
      { english: "Laundry", dutch: "Wassen" },
      { english: "Furniture", dutch: "Meubels" },
      { english: "Appliances", dutch: "Apparaten" },
      { english: "Utilities", dutch: "Nutsvoorzieningen" },
      { english: "Maintenance", dutch: "Onderhoud" },
      { english: "Internet", dutch: "Internet" },
    ],
  },
  {
    key: "shopping",
    label: "Shopping",
    words: [
      { english: "Supermarket", dutch: "Supermarkt" },
      { english: "Groceries", dutch: "Boodschappen" },
      { english: "Bakery", dutch: "Bakkerij" },
      { english: "Butcher", dutch: "Slagerij" },
      { english: "Fish Market", dutch: "Viswinkel" },
      { english: "Drinks", dutch: "Dranken" },
      { english: "Pharmacy", dutch: "Apotheek" },
      { english: "Clothing", dutch: "Kleding" },
      { english: "Shoes", dutch: "Schoenen" },
      { english: "Accessories", dutch: "Accessoires" },
      { english: "Furniture", dutch: "Meubels" },
      { english: "Electronics", dutch: "Elektronica" },
      { english: "Toy Store", dutch: "Speelgoedwinkel" },
      { english: "Pet Store", dutch: "Dierenwinkel" },
      { english: "Market", dutch: "Markt" },
    ],
  },
  {
    key: "transport",
    label: "Transport",
    words: [
      { english: "Bicycle", dutch: "Fiets" },
      { english: "Train", dutch: "Trein" },
      { english: "Bus", dutch: "Bus" },
      { english: "Tram", dutch: "Tram" },
      { english: "Car", dutch: "Auto" },
      { english: "Parking", dutch: "Parkeren" },
      { english: "Gas Station", dutch: "Tankstation" },
      { english: "Driving School", dutch: "Rijschool" },
    ],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate("/learn", { state: { category } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            VOKA
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Profile</Button>
            <Button variant="outline" size="sm">Change Language</Button>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8">Choose a Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {categories.map((cat) => (
            <Card
              key={cat.key}
              className="cursor-pointer hover:shadow-lg transition p-8 flex flex-col items-center bg-white"
              onClick={() => handleCategoryClick(cat)}
            >
              <span className="text-2xl font-semibold mb-2">{cat.label}</span>
              <span className="text-gray-500 text-center text-sm">{cat.words.map(w => w.english).join(", ")}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
