import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { fetchUsers, User } from "@/pages/api/api";
import Link from "next/link";
import Image from "next/image";

const ITEMS_PER_PAGE = 5; // Number of users per page

const UserList = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]); // Store all users fetched from the API
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]); // Users to display after filtering
  const [activePage, setActivePage] = useState(1);
  const [genderFilter, setGenderFilter] = useState(() => {
    // Retrieve gender filter from local storage only on the client-side
    if (typeof window !== "undefined") {
      return localStorage.getItem("genderFilter") || "";
    } else {
      return "";
    }
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsersList();
  }, [activePage, genderFilter, searchQuery]);

  useEffect(() => {
    // Store gender filter in local storage when it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("genderFilter", genderFilter);
    }
  }, [genderFilter]);

  const fetchUsersList = async () => {
    const data = await fetchUsers(activePage, genderFilter);
    setAllUsers(data);
    applyFilters(data);
  };

  const applyFilters = (data: User[]) => {
    // Filter users based on gender
    let filteredUsers = data;
    if (genderFilter) {
      filteredUsers = filteredUsers.filter(
        (user) => user.gender === genderFilter,
      );
    }
    // Filter users based on search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive regex
      filteredUsers = allUsers.filter((user) =>
        regex.test(`${user.name.first} ${user.name.last}`),
      );
    }
    // Update displayed users
    setDisplayedUsers(filteredUsers);
  };

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const handleGenderFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedGender = event.target.value;
    setGenderFilter(selectedGender);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const searchValue = event.target.value;
    setSearchQuery(searchValue);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">User Listing</h1>

      <div className="flex items-center mb-4">
        <label htmlFor="genderFilter" className="mr-2">
          Filter by Gender:
        </label>
        <select
          id="genderFilter"
          className="border border-gray-300 rounded-md px-3 py-1 text-black"
          value={genderFilter}
          onChange={handleGenderFilterChange}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="mb-4 text-right">
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 rounded-md px-3 py-1 text-black"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Profile
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayedUsers.map((user) => (
            <tr key={user.login.uuid}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={user.picture.thumbnail}
                      alt={user.name.first}
                      height="10"
                      width="10"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {`${user.name.first} ${user.name.last}`}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.gender}</div>
              </td>
              <td>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    <Link
                      href={{
                        pathname: "/profile",
                        query: { user: JSON.stringify(user) },
                      }}
                    >
                      <div>View Profile</div>
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={ITEMS_PER_PAGE}
          totalItemsCount={ITEMS_PER_PAGE * 10} // Assuming there are 10 pages available
          onChange={handlePageChange}
          itemClass="relative inline-block px-4 py-2 border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
          activeClass="bg-blue-500 text-white"
          linkClassFirst="ml-0 rounded-l-full"
          linkClassPrev="rounded-l-full"
          linkClassNext="rounded-r-full"
          linkClassLast="rounded-r-full"
        />
      </div>
    </div>
  );
};

export default UserList;
