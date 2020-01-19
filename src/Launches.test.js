import React from "react";
import axios from "axios";
import sinon from "sinon";

import { createMount } from "@material-ui/core/test-utils";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Launches from "./Launches";

import mock from "./Launches.mock.json";

Enzyme.configure({ adapter: new Adapter() });

describe("<Launches />", () => {
  let mount;

  const promise = Promise.resolve(mock);

  beforeAll(() => {
    mount = createMount();
    sinon
      .stub(axios, "get")
      .withArgs("https://api.spacexdata.com/v3/launches?limit=6")
      .returns(promise);
  });

  afterAll(() => {
    mount.cleanUp();
    axios.get.restore();
  });

  it("stores data in local state", done => {
    // shallow/.get is a HOC workaround
    const wrapper = mount(shallow(<Launches />).get(0));

    promise.then(() => {
      wrapper.update();

      expect(wrapper.state().data).toEqual(mock.data);

      done();
    });
  });

  it("renders data when fetched successfully", done => {
    const wrapper = mount(<Launches />);

    expect(wrapper.find("p").text()).toEqual("Loading");

    promise.then(() => {
      wrapper.update();

      expect(wrapper.find("h2")).toHaveLength(6);

      done();
    });
  });
});
