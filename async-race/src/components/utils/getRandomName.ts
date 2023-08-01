import { CarNames } from '../../types/types';

function getRandomName(carNames: CarNames): string {
  const brandIndex: number = Math.floor(Math.random() * carNames.brand.length);
  const modelIndex: number = Math.floor(Math.random() * carNames.model.length);
  return `${carNames.brand[brandIndex]} ${carNames.model[modelIndex]}`;
}
export default getRandomName;
