import "./setupTests";

import React from "react";
import { mount } from "enzyme";

import { DateTimePicker } from "./";
import { TriggerComponent } from "./TriggerComponent";

import { getMonthName } from "./utils";

describe("<DateTimePicker />", () => {
  let wrapper;

  // cleanup
  afterEach(() => {
    wrapper && wrapper.unmount();
    wrapper = null;
  });

  it("should mount", done => {
    wrapper = mount(<DateTimePicker />);
    expect(wrapper.exists()).toBe(true);
    done();
  });

  // AC 1: If using a trigger component, then hide the date time picker by default.
  it("should be hidden by default if a trigger component is used.", done => {
    wrapper = mount(<DateTimePicker trigger={<TriggerComponent />} />);
    expect(wrapper.find(TriggerComponent).length).toBe(1);
    expect(wrapper.find(".dtp").length).toBe(0);
    done();
  });

  // AC 2: If no trigger component it used, the display the date time picker.
  it("should display the date time picker by default if not trigger is used.", done => {
    wrapper = mount(<DateTimePicker />);
    expect(wrapper.find(".dtp").length).toBe(1);
    done();
  });

  // AC 3: When clicking a tigger component it should display the DateTimePicker.
  it("should display the date time picker when clicking on a trigger component.", done => {
    wrapper = mount(<DateTimePicker trigger={<TriggerComponent />} />);
    wrapper.find(TriggerComponent).simulate("click");
    expect(wrapper.find(".dtp").length).toBe(1);
    done();
  });

  // AC 4: The display of the Date Time Picker should be toggled by the trigger element.
  it("should display the date time picker when clicking on a trigger component.", done => {
    wrapper = mount(<DateTimePicker trigger={<TriggerComponent />} />);

    // click the TriggerComponent to display the Date Time Picker
    wrapper.find(TriggerComponent).simulate("click");
    expect(wrapper.find(".dtp").length).toBe(1);

    // click the TriggerComponent to hide the Date Time Picker
    wrapper.find(TriggerComponent).simulate("click");
    expect(wrapper.find(".dtp").length).toBe(0);

    done();
  });

  // AC 5: The Date Picker should always display the current month by default
  it("should display the current month by default", done => {
    const date = new Date();
    wrapper = mount(<DateTimePicker />);
    expect(wrapper.render().text()).toEqual(
      getMonthName({ monthIndex: date.getMonth() })
    );
    done();
  });

  // AC 6: If needing to display a range (from August to September) then, display the next month along with the current month.
  it("should display both the current and next month if a range is needed", done => {
    const date = new Date();
    wrapper = mount(<DateTimePicker hasRange />);
    expect(wrapper.render().text()).toMatch(
      new RegExp(getMonthName({ monthIndex: date.getMonth() }))
    );
    expect(wrapper.render().text()).toMatch(
      new RegExp(getMonthName({ monthIndex: date.getMonth() + 1 }))
    );
    done();
  });
});
