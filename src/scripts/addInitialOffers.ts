import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const initialOffers = [
  {
    title: "Week-end magique à Manchester 🎉",
    description: "3 jours de fête dans un hôtel très bien noté avec vols A/R directs inclus",
    price: 184,
    image_url: "https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&q=80&w=1600",
    category: "SÉJOURS",
    status: "active",
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    title: "Vols A/R vers Rio de Janeiro 🏖️",
    description: "Profitez de ces vols A/R à destination de Rio de Janeiro à moins de 500€ !",
    price: 485,
    image_url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=1600",
    category: "VOLS",
    status: "active",
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    title: "Escapade romantique à Istanbul 🕌",
    description: "4 jours dans un hôtel 4* très bien situé avec vue panoramique, petits déjs et vols A/R inclus",
    price: 233,
    image_url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1600",
    category: "SÉJOURS",
    status: "active",
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    title: "Hôtel de luxe près du Vatican ⛪",
    description: "Séjour dans un hôtel 4* avec vue panoramique et petit-déjeuner inclus",
    price: 125,
    image_url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1600",
    category: "HÔTELS",
    status: "active",
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export async function addInitialOffers() {
  const offersRef = collection(db, "offers");
  
  for (const offer of initialOffers) {
    try {
      await addDoc(offersRef, offer);
      console.log(`Added offer: ${offer.title}`);
    } catch (error) {
      console.error(`Error adding offer ${offer.title}:`, error);
    }
  }
}

// Uncomment and run this function once to add the initial offers
// addInitialOffers();