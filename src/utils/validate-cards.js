export const validateVisa = (num) => {
  const cardNumArr = num.split(" ");
  if (cardNumArr.length !== 4) return false;
  for (const cardVal of cardNumArr) {
    if (!isNumeric(cardVal)) return false;
    if (cardVal.length !== 4) return false;
  }
  return true;
};

export const validateAmex = (num) => {
  const cardNumArr = num.split(" ");
  if (cardNumArr.length !== 3) return false;

  if (!isNumeric(cardNumArr[0]) || cardNumArr[0].length !== 4) return false;
  if (!isNumeric(cardNumArr[1]) || cardNumArr[1].length !== 6) return false;
  if (!isNumeric(cardNumArr[2]) || cardNumArr[2].length !== 5) return false;

  return true;
};

function isNumeric(value) {
  return /^\d+$/.test(value);
}
