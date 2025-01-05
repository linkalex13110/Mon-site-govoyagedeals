export const getCategoryWithEmoji = (category: string): string => {
  switch (category) {
    case 'SÉJOURS':
      return 'SÉJOURS ✈️🌴';
    case 'VOLS':
      return 'VOLS ✈️';
    case 'HÔTELS':
      return 'HÔTELS 🏨';
    default:
      return category;
  }
};