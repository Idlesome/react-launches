import React from "react";

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import TextFilter from "./TextFilter";

Enzyme.configure({ adapter: new Adapter() });

// TODO: test onChange function is called
describe("<LaunchCard />", () => {
  it("should render component", () => {
    const wrapper = mount(
      <TextFilter label="Text filter" onChange={() => {}} />
    );
    expect(wrapper.find("input")).toMatchSnapshot();
  });
});
