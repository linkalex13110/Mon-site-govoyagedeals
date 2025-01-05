/*
  # Add Initial Offers

  1. Initial Data
    - Add 4 initial offers:
      - Weekend in Manchester
      - Rio de Janeiro Flights
      - Istanbul Romantic Escape
      - Vatican Luxury Hotel
*/

INSERT INTO offers (title, description, price, image_url, category, status, featured) 
VALUES 
  (
    'Week-end magique à Manchester 🎉',
    '3 jours de fête dans un hôtel très bien noté avec vols A/R directs inclus',
    184.00,
    'https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&q=80&w=1600',
    'SÉJOURS',
    'active',
    true
  ),
  (
    'Vols A/R vers Rio de Janeiro 🏖️',
    'Profitez de ces vols A/R à destination de Rio de Janeiro à moins de 500€ !',
    485.00,
    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=1600',
    'VOLS',
    'active',
    true
  ),
  (
    'Escapade romantique à Istanbul 🕌',
    '4 jours dans un hôtel 4* très bien situé avec vue panoramique, petits déjs et vols A/R inclus',
    233.00,
    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1600',
    'SÉJOURS',
    'active',
    true
  ),
  (
    'Hôtel de luxe près du Vatican ⛪',
    'Séjour dans un hôtel 4* avec vue panoramique et petit-déjeuner inclus',
    125.00,
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1600',
    'HÔTELS',
    'active',
    true
  );