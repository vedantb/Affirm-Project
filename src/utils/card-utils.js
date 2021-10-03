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
