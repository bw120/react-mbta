// import { render, screen } from "@testing-library/react";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route, MemoryRouter } from "react-router-dom";
import StopSelector from "./StopSelector";
import { getStopsByRoute } from "../helpers/api";

const mockLines = [
  {
    attributes: {
      color: "DA291C",
      description: "Rapid Transit",
      direction_destinations: ["Ashmont/Braintree", "Alewife"],
      direction_names: ["South", "North"],
      fare_class: "Rapid Transit",
      long_name: "Red Line",
      short_name: "",
      sort_order: 10010,
      text_color: "FFFFFF",
      type: 1,
    },
    id: "Red",
    links: { self: "/routes/Red" },
    relationships: {
      line: { data: { id: "line-Red", type: "line" } },
      route_patterns: {},
    },
    type: "route",
  },
  {
    attributes: {
      color: "DA291C",
      description: "Rapid Transit",
      direction_destinations: ["Mattapan", "Ashmont"],
      direction_names: ["Outbound", "Inbound"],
      fare_class: "Rapid Transit",
      long_name: "Mattapan Trolley",
      short_name: "",
      sort_order: 10011,
      text_color: "FFFFFF",
      type: 0,
    },
    id: "Mattapan",
    links: { self: "/routes/Mattapan" },
    relationships: {
      line: { data: { id: "line-Mattapan", type: "line" } },
      route_patterns: {},
    },
    type: "route",
  },
  {
    attributes: {
      color: "ED8B00",
      description: "Rapid Transit",
      direction_destinations: ["Forest Hills", "Oak Grove"],
      direction_names: ["South", "North"],
      fare_class: "Rapid Transit",
      long_name: "Orange Line",
      short_name: "",
      sort_order: 10020,
      text_color: "FFFFFF",
      type: 1,
    },
    id: "Orange",
    links: { self: "/routes/Orange" },
    relationships: {
      line: { data: { id: "line-Orange", type: "line" } },
      route_patterns: {},
    },
    type: "route",
  },
  {
    attributes: {
      color: "00843D",
      description: "Rapid Transit",
      direction_destinations: ["Boston College", "Park Street"],
      direction_names: ["West", "East"],
      fare_class: "Rapid Transit",
      long_name: "Green Line B",
      short_name: "B",
      sort_order: 10032,
      text_color: "FFFFFF",
      type: 0,
    },
    id: "Green-B",
    links: { self: "/routes/Green-B" },
    relationships: {
      line: { data: { id: "line-Green", type: "line" } },
      route_patterns: {},
    },
    type: "route",
  },
  {
    attributes: {
      color: "00843D",
      description: "Rapid Transit",
      direction_destinations: ["Cleveland Circle", "North Station"],
      direction_names: ["West", "East"],
      fare_class: "Rapid Transit",
      long_name: "Green Line C",
      short_name: "C",
      sort_order: 10033,
      text_color: "FFFFFF",
      type: 0,
    },
    id: "Green-C",
    links: { self: "/routes/Green-C" },
    relationships: {
      line: { data: { id: "line-Green", type: "line" } },
      route_patterns: {},
    },
    type: "route",
  },
  {
    attributes: {
      color: "00843D",
      description: "Rapid Transit",
      direction_destinations: ["Riverside", "Government Center"],
      direction_names: ["West", "East"],
      fare_class: "Rapid Transit",
      long_name: "Green Line D",
      short_name: "D",
      sort_order: 10034,
      text_color: "FFFFFF",
      type: 0,
    },
    id: "Green-D",
    links: { self: "/routes/Green-D" },
    relationships: {
      line: { data: { id: "line-Green", type: "line" } },
      route_patterns: {},
    },
    type: "route",
  },
  {
    attributes: {
      color: "00843D",
      description: "Rapid Transit",
      direction_destinations: ["Heath Street", "North Station"],
      direction_names: ["West", "East"],
      fare_class: "Rapid Transit",
      long_name: "Green Line E",
      short_name: "E",
      sort_order: 10035,
      text_color: "FFFFFF",
      type: 0,
    },
    id: "Green-E",
    links: { self: "/routes/Green-E" },
    relationships: {
      line: { data: { id: "line-Green", type: "line" } },
      route_patterns: {},
    },
    type: "route",
  },
  {
    attributes: {
      color: "003DA5",
      description: "Rapid Transit",
      direction_destinations: ["Bowdoin", "Wonderland"],
      direction_names: ["West", "East"],
      fare_class: "Rapid Transit",
      long_name: "Blue Line",
      short_name: "",
      sort_order: 10040,
      text_color: "FFFFFF",
      type: 1,
    },
    id: "Blue",
    links: { self: "/routes/Blue" },
    relationships: {
      line: { data: { id: "line-Blue", type: "line" } },
      route_patterns: {},
    },
    type: "route",
  },
];

function renderWithProviders(
  ui,
  {
    path = "/line/:mbtaLine",
    route = "/line/Red",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(
      <Router history={history}>
        <Route path="/line/:mbtaLine">{ui}</Route>
      </Router>
    ),
    history,
  };
}

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    mbtaLine: "Red",
  }),
  useRouteMatch: () => ({ path: "/line/:mbtaLine" }),
}));

test("StopSelector renders with a headline", () => {
  const { container } = renderWithProviders(<StopSelector lines={mockLines} />);

  const headline = container.querySelector("h1");
  expect(headline.textContent).toBe("Red Line");
});
