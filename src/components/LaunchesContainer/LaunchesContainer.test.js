import React from "react";
import axios from "axios";
import sinon from "sinon";

import { createMount } from "@material-ui/core/test-utils";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LaunchesContainer from "./LaunchesContainer";

import mock from "./launches.mock.json";

Enzyme.configure({ adapter: new Adapter() });

describe("<LaunchesContainer />", () => {
  let mount;

  const promise = Promise.resolve(mock);

  beforeAll(() => {
    mount = createMount();
    sinon
      .stub(axios, "get")
      .withArgs("https://api.spacexdata.com/v3/launches", { limit: 6 })
      .returns(promise);
  });

  afterAll(() => {
    mount.cleanUp();
    axios.get.restore();
  });

  it("stores data in local state", done => {
    // shallow/.get is a HOC workaround for state
    const wrapper = mount(shallow(<LaunchesContainer />).get(0));

    promise.then(() => {
      wrapper.update();

      expect(wrapper.state("launches")).toEqual(mock.data);

      done();
    });
  });

  it("renders data when fetched successfully", done => {
    // shallow/.get is a HOC workaround for state
    const wrapper = mount(shallow(<LaunchesContainer />).get(0));

    expect(wrapper.state("loading")).toEqual(true);

    promise.then(() => {
      wrapper.update();

      expect(wrapper.find("h2")).toHaveLength(6);

      done();
    });
  });
});
