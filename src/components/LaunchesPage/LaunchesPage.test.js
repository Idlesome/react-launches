import React from "react";

import { createMount } from "@material-ui/core/test-utils";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LaunchesPage from "./LaunchesPage";

Enzyme.configure({ adapter: new Adapter() });

describe("<LaunchesPage />", () => {
  let mount;

  const mockLoadLaunches = jest.fn();

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it("attempts to load launches on mount", done => {
    const wrapper = mount(
      <LaunchesPage dispatchLoadLaunches={mockLoadLaunches} launches={[]} />
    );

    wrapper.update();

    expect(mockLoadLaunches.mock.calls.length).toBe(1);

    done();
  });

  it("should render component", () => {
    const wrapper = mount(
      <LaunchesPage dispatchLoadLaunches={mockLoadLaunches} launches={[]} />
    );
    expect(wrapper.find("div")).toMatchSnapshot();
  });
});
