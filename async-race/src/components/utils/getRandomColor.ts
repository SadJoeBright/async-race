function getRandomColor(): string {
  const red: number = Math.floor(Math.random() * 256);
  const green: number = Math.floor(Math.random() * 256);
  const blue: number = Math.floor(Math.random() * 256);

  const redHex: string = red.toString(16).padStart(2, '0');
  const greenHex: string = green.toString(16).padStart(2, '0');
  const blueHex: string = blue.toString(16).padStart(2, '0');

  return `#${redHex}${greenHex}${blueHex}`;
}

export default getRandomColor;
