import React from "react";
import { render, fireEvent, getByDisplayValue } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("renders without crashing", function () {
  render(<Carousel />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("When on 2nd image, will go back to 1st image when left arrow is clicked", function () {
  const { queryByAltText, getByTestId } = render(<Carousel />);
  // click right arrow to get to 2nd image.
  fireEvent.click(getByTestId("right-arrow"));

  // click left arrow to get to 1st image. Test that first image is rendered.
  fireEvent.click(getByTestId("left-arrow"));
  expect(queryByAltText("Richard Pasquarella", { exact: false })).toBeInTheDocument();
});

it("When on 1st image, no left arrow is present", function () {
  const { queryByTestId } = render(<Carousel />);
  //Renders on first image. no Events necessary
  expect(queryByTestId("left-arrow")).toBe(null);
});

it("When on last image, no right arrow is present", function () {
  const { queryByTestId, getByTestId } = render(<Carousel />);
  // Renders first image, must click right arrow twice to get to last image
  fireEvent.click(getByTestId("right-arrow"));
  fireEvent.click(getByTestId("right-arrow"));
  expect(queryByTestId("right-arrow")).toBe(null);
});