import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FollowersList from "./FollowersList";
import axios from "axios";

jest.mock("axios");

const mockResponse = {
  data: {
    results: [
      {
        name: {
          first: "Laith",
          last: "Harb",
        },
        picture: {
          large: "https://randomuser.me/api/portraits/men/59.jpg",
        },
        login: {
          username: "ThePhonyGOAT",
        },
      },
    ],
  },
};
beforeEach(() => {
  axios.get.mockImplementation(() => Promise.resolve(mockResponse));
});

describe("FollowersList", () => {
  it("should fetch and render input element", async () => {
    render(
      <BrowserRouter>
        <FollowersList />
      </BrowserRouter>
    );
    const followerDivElement = await screen.findByTestId(`follower-item-0`);
    expect(followerDivElement).toBeInTheDocument();
    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(
        "https://randomuser.me/api/?results=5"
      )
    );
  });

  it("should fetch and render input element with debug", async () => {
    render(
      <BrowserRouter>
        <FollowersList />
      </BrowserRouter>
    );

    const followerDivElement = await screen.findByTestId(`follower-item-0`);
    expect(followerDivElement).toBeInTheDocument();
  });
});
