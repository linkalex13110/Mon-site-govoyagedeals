export const formatPrice = (price: number): string => {
  // Vérifier si le prix est un nombre entier
  if (Number.isInteger(price)) {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }
  
  // Si le prix a des décimales, afficher 2 décimales
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};