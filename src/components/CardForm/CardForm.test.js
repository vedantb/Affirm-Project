import React from "react";
import { mount } from "enzyme";

import CardForm from "./CardForm";

it("renders the cardform with all input fields", () => {
  const wrapper = mount(<CardForm />);
  const cardNumInput = wrapper.find("input.card-num");
  expect(cardNumInput.prop("placeholder")).toEqual("Card Number");
  expect(cardNumInput.prop("type")).toEqual("text");

  const nameInput = wrapper.find("input.name");
  expect(nameInput.prop("placeholder")).toEqual("Name");
  expect(nameInput.prop("type")).toEqual("text");

  const cvvInput = wrapper.find("input.cvv");
  expect(cvvInput.prop("placeholder")).toEqual("CVV2");
  expect(cvvInput.prop("type")).toEqual("number");

  const expMonthInput = wrapper.find("input.exp-month");
  expect(expMonthInput.prop("placeholder")).toEqual("Exp. Month");
  expect(expMonthInput.prop("type")).toEqual("number");

  const expYearInput = wrapper.find("input.exp-year");
  expect(expYearInput.prop("placeholder")).toEqual("Exp. Year");
  expect(expYearInput.prop("type")).toEqual("number");

  const submitButton = wrapper.find(".submit-button");
  expect(submitButton.prop("disabled")).toBe(true);
});

it("should enable submit button after all fields are valid with a VISA card", () => {
  const wrapper = mount(<CardForm />);
  const cardNumInput = wrapper.find("input.card-num");
  cardNumInput.simulate("change", { target: { value: "4888 8888 8888 8888" } });

  const nameInput = wrapper.find("input.name");
  nameInput.simulate("change", { target: { value: "Vedant" } });

  const cvvInput = wrapper.find("input.cvv");
  cvvInput.simulate("change", { target: { value: "123" } });

  const expMonthInput = wrapper.find("input.exp-month");
  expMonthInput.simulate("change", { target: { value: "10" } });

  const expYearInput = wrapper.find("input.exp-year");
  expYearInput.simulate("change", { target: { value: "2025" } });

  const submitButton = wrapper.find(".submit-button");
  expect(submitButton.prop("disabled")).toBe(false);
});

it("should enable submit button after all fields are valid with an AMEX card", () => {
  const wrapper = mount(<CardForm />);
  const cardNumInput = wrapper.find("input.card-num");
  cardNumInput.simulate("change", { target: { value: "3729 299402 04023" } });

  const nameInput = wrapper.find("input.name");
  nameInput.simulate("change", { target: { value: "Vedant" } });

  const cvvInput = wrapper.find("input.cvv");
  cvvInput.simulate("change", { target: { value: "1234" } });

  const expMonthInput = wrapper.find("input.exp-month");
  expMonthInput.simulate("change", { target: { value: "10" } });

  const expYearInput = wrapper.find("input.exp-year");
  expYearInput.simulate("change", { target: { value: "2025" } });

  const submitButton = wrapper.find(".submit-button");
  expect(submitButton.prop("disabled")).toBe(false);
});
