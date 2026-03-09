export const isInvalidText = (text: string) => {
  return !text || text.trim() === "";
};

export const inputTooBig = (text: string) => {
  return text.trim().length > 50;
};

export const inputTooSmall = (text: string) => {
  return text.trim().length < 3;
};

export const smallInputTooBig = (text: string) => {
  return text.trim().length > 10;
};

export const textAreaInputTooBig = (text: string) => {
  return text.trim().length > 500;
};
