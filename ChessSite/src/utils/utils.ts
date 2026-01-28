

export function getRandomInt(min:number, max:number) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("min and max must be integers");
  }

  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}