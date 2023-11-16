export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`);
}

export function sanitizeInput(obj: Record<string, any>) {
  return Object.entries(obj).reduce(
    (acc, [key, val]) => ({
      ...acc,
      [camelToSnake(key)]: val,
    }),
    {},
  );
}
