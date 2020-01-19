import React from "react";

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LaunchCard from "./LaunchCard";

Enzyme.configure({ adapter: new Adapter() });

const launch = {
  links: {
    mission_patch_small: "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
    flickr_images: ["test"]
  },
  mission_name: "FalconSat",
  launch_year: "2006",
  details: "Lorem ipsum"
};

describe("<LaunchCard />", () => {
  it("should render component", () => {
    const wrapper = mount(<LaunchCard {...launch} />);
    expect(wrapper.find("div")).toMatchSnapshot();
  });
});
