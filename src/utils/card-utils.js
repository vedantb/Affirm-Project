import { AMEX, VISA } from "../constants";

export function formatCreditcardNumber(value) {
  if (!value) return value;

  let issuer;
  if (value[0] === "4") issuer = VISA;
  if (value.substring(0, 2) === "34" || value.substring(0, 2) === "37")
    issuer = AMEX;

  if (!issuer) return value;
  const clearValue = value.replace(/\D+/g, "");
  let nextValue;

  if (issuer === AMEX) {
    nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
      4,
      10
    )} ${clearValue.slice(10, 15)}`;
  }
  if (issuer === VISA) {
    nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
      4,
      8
    )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 16)}`;
  }

  return nextValue.trim();
}

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
