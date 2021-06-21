// import { render, screen } from "@testing-library/react";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route, MemoryRouter } from "react-router-dom";
import Predictions from "./Predictions";

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

const mockStops = [
  {
    attributes: {
      address: "Alewife Brook Pkwy and Cambridge Park Dr, Cambridge, MA 02140",
      at_street: null,
      description: null,
      latitude: 42.395428,
      location_type: 1,
      longitude: -71.142483,
      municipality: "Cambridge",
      name: "Alewife",
      on_street: null,
      platform_code: null,
      platform_name: null,
      vehicle_type: null,
      wheelchair_boarding: 1,
    },
    id: "place-alfcl",
    links: { self: "/stops/place-alfcl" },
    relationships: {
      child_stops: {},
      connecting_stops: {},
      facilities: {
        links: { related: "/facilities/?filter[stop]=place-alfcl" },
      },
      parent_station: { data: null },
      recommended_transfers: {},
      zone: { data: null },
    },
    type: "stop",
  },
  {
    attributes: {
      address: "College Ave and Elm St, Somerville, MA",
      at_street: null,
      description: null,
      latitude: 42.39674,
      location_type: 1,
      longitude: -71.121815,
      municipality: "Somerville",
      name: "Davis",
      on_street: null,
      platform_code: null,
      platform_name: null,
      vehicle_type: null,
      wheelchair_boarding: 1,
    },
    id: "place-davis",
    links: { self: "/stops/place-davis" },
    relationships: {
      child_stops: {},
      connecting_stops: {},
      facilities: {
        links: { related: "/facilities/?filter[stop]=place-davis" },
      },
      parent_station: { data: null },
      recommended_transfers: {},
      zone: { data: null },
    },
    type: "stop",
  },
];

function renderWithProviders(
  ui,
  {
    path = "/line/:mbtaLine/:stopId",
    route = "/line/Red/place-knncl",
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
    stopId: "place-davis",
  }),
  useRouteMatch: () => ({ path: "/line/:mbtaLine" }),
}));

test("Predictions renders with a headline", () => {
  const { container } = renderWithProviders(
    <Predictions lineDetails={mockLines} stops={mockStops} />
  );

  const headline = container.querySelector("h2");
  expect(headline.textContent).toBe("Davis");
});

test("Predictions renders with a table", () => {
  const { container } = renderWithProviders(
    <Predictions lineDetails={mockLines} stops={mockStops} />
  );

  const table = container.querySelector("table");
  expect(table).toBeTruthy();
});

test("Predictions table renders with column headers", () => {
  const { container } = renderWithProviders(
    <Predictions lineDetails={mockLines} stops={mockStops} />
  );

  const tableHeaers = container.querySelectorAll("table thead td");
  expect(tableHeaers.length).toBe(3);
  expect(tableHeaers[0].textContent).toBe("Predictions");
  expect(tableHeaers[1].textContent).toBe("Minutes to departure");
  expect(tableHeaers[2].textContent).toBe("Destination");
});
