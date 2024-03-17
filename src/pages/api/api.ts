import axios from "axios";

const ITEMS_PER_PAGE = 5; // Number of users per page

export const fetchUsers = async (
  page: number,
  gender: string,
): Promise<User[]> => {
  try {
    const response = await axios.get(
      `https://randomuser.me/api/?page=${page}?inc=login,name,email,gender,nat,location&&results=${ITEMS_PER_PAGE}${
        gender ? `&gender=${gender}` : ""
      }`,
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export interface User {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    thumbnail: string;
    large: string;
  };
  gender: string;
  nat: string;
  location: {
    city: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}
