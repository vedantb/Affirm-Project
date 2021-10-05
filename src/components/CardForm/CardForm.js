import { useState } from "react";
import "./CardForm.css";
import InputField from "../InputField/InputField";
import { AMEX, VISA } from "../../constants";
import {
  formatCreditcardNumber,
  validateAmex,
  validateVisa
} from "../../utils/card-utils";
import amex from "../../icons/amex.svg";
import visa from "../../icons/visa.svg";

function CardForm() {
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cvv, setCVV] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [disbled, setDisabled] = useState(true);
  const [cardType, setCardType] = useState("");
  const [validFields, setValidField] = useState({
    name: false,
    cardNum: false,
    cvv: false,
    date: false
  });

  const validateName = (name) => {
    setValidField({ ...validFields, name: false });
    if (name.length) {
      setValidField({ ...validFields, name: true });
      return true;
    }
    return false;
  };

  const validateCardNum = (num) => {
    setValidField({ ...validFields, cardNum: false });
    if (num.length === 0) {
      setCardType("");
      return false;
    }

    let isValid = false;

    if (parseInt(num[0]) === 4) {
      setCardType(VISA);
      isValid = validateVisa(num);
    } else {
      const substr = num.substring(0, 2);
      if (substr === "37" || substr === "34") {
        setCardType(AMEX);
        isValid = validateAmex(num);
      }
    }

    if (isValid) {
      setValidField({ ...validFields, cardNum: true });
      return true;
    }
    return false;
  };

  const validateCVV = (cvv) => {
    setValidField({ ...validFields, cvv: false });
    if (
      (cardType === VISA && cvv.length === 3) ||
      (cardType === AMEX && cvv.length === 4)
    ) {
      setValidField({ ...validFields, cvv: true });
      return true;
    }
    return false;
  };

  const validateMonth = (month) => {
    setValidField({ ...validFields, date: false });
    month = Number(month);
    if (isNaN(month)) return false;
    if (month > 12 || month < 1) return false;
    if (!expYear) return;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (expYear === currentYear && month <= currentMonth) return false;
    setValidField({ ...validFields, date: true });
    return true;
  };

  const validateYear = (year) => {
    setValidField({ ...validFields, date: false });
    year = Number(year);
    if (isNaN(year)) return false;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (year < currentYear) return false;
    if (!expMonth) return;
    if (year === currentYear && expMonth <= currentMonth) return false;
    setValidField({ ...validFields, date: true });
    return true;
  };

  const isSubmittable = (type, isValid) => {
    let areAllValid = true;
    Object.keys(validFields).forEach((key) => {
      if (key === type) {
        if (!isValid) areAllValid = false;
      } else if (!validFields[key]) areAllValid = false;
    });
    setDisabled(!areAllValid);
  };

  const validateField = (val, type) => {
    let isValid = false;
    switch (type) {
      case "name":
        isValid = validateName(val);
        break;
      case "cardNum":
        isValid = validateCardNum(val);
        break;
      case "cvv":
        isValid = validateCVV(val);
        break;
      case "month":
        isValid = validateMonth(val);
        break;
      case "year":
        isValid = validateYear(val);
        break;
      default:
        break;
    }
    isSubmittable(type === "year" || type === "month" ? "date" : type, isValid);
    return isValid;
  };

  return (
    <div className="credit-card-form-container">
      <strong className="credit-card-form-title">
        Enter your credit card information
      </strong>
      <form className="credit-card-form">
        <InputField
          value={name}
          onChange={(val) => setName(val)}
          validateField={(val) => validateField(val, "name")}
          type="text"
          className="input-field name"
          placeholder="Name"
          errorMessage="Please enter a name"
        />
        <InputField
          type="text"
          value={formatCreditcardNumber(cardNum)}
          onChange={(num) => setCardNum(num)}
          validateField={(val) => validateField(val, "cardNum")}
          className="input-field card-num"
          placeholder="Card Number"
          errorMessage="Please enter a valid card number"
        />
        <InputField
          onChange={(cvv) => setCVV(cvv)}
          validateField={(val) => validateField(val, "cvv")}
          type="number"
          value={cvv}
          className="input-field cvv"
          placeholder="CVV2"
          errorMessage="Invalid CVV"
        />
        <div className="expiry-container">
          <InputField
            onChange={(month) => setExpMonth(Number(month) || "")}
            validateField={(val) => validateField(val, "month")}
            type="number"
            className="input-field exp-month"
            placeholder="Exp. Month"
            errorMessage="Invalid Date"
          />
          <InputField
            onChange={(year) => setExpYear(Number(year) || "")}
            validateField={(val) => validateField(val, "year")}
            type="number"
            className="input-field exp-year"
            placeholder="Exp. Year"
            errorMessage="Invalid Date"
          />
        </div>
        <div className="icons-container">
          <img
            src={visa}
            height="40"
            className={`${cardType === VISA ? "enabled" : ""} logo`}
            alt="Visa logo"
          />
          <img
            src={amex}
            height="40"
            className={`${cardType === AMEX ? "enabled" : ""} logo`}
            alt="Visa logo"
          />
        </div>
        <button disabled={disbled} type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CardForm;
