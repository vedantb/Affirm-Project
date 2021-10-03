import React from "react";
import { mount } from "enzyme";

import InputField from "./InputField";

it("renders the input field wirh default props", () => {
  const wrapper = mount(<InputField placeholder="Name" />);
  const input = wrapper.find("input");
  expect(input.prop("placeholder")).toEqual("Name");
  expect(input.prop("type")).toEqual("text");
});

it("renders the input field wirh custom props", () => {
  const wrapper = mount(
    <InputField className="input-field" placeholder="Test" type="num" />
  );
  const input = wrapper.find("input");
  expect(input.prop("placeholder")).toEqual("Test");
  expect(input.prop("type")).toEqual("num");
  expect(input.prop("className")).toEqual("input-field ");
});

it("validates the input field with error message", () => {
  const wrapper = mount(
    <InputField
      className="input-field"
      onChange={() => true}
      validateField={() => false}
      placeholder="Test"
      type="num"
    />
  );

  wrapper.find("input").simulate("change", {
    target: { value: "Test" }
  });
  expect(wrapper.find(".error-message")).toHaveLength(1);
});

it("validates the input field with no error message", () => {
  const wrapper = mount(
    <InputField
      className="input-field"
      onChange={() => true}
      validateField={() => true}
      placeholder="Test"
      type="num"
    />
  );

  wrapper.find("input").simulate("change", {
    target: { value: "Test" }
  });
  expect(wrapper.find(".error-message")).toHaveLength(0);
});
