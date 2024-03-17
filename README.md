## Installation

```bash
$ npm install (Node.js version >= v18.17.0 is required.)
# or
yarn 
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# User Listing Application

This application fetches a list of users from the randomuser API and provides functionalities such as filtering by
gender, searching by name, and viewing detailed user profiles.

## Component Structure:

### UserList:

- This component fetches user data from the randomuser API.
- It applies filters (such as gender) and handles search functionality.
- Displays the list of users in a table format.

### UserProfileCard:

- Displays detailed information about a single user.
- Includes their name, email, profile picture, nationality, and location on a map.

## Thought Process:

### Separation of Concerns:

- Each component has a specific responsibility, making the codebase modular and easier to maintain.
- Reusable Components: Components like UserProfileCard can be reused in other parts of the application if needed,
  promoting code reusability.

### API Interaction:

- Utilizes client-based filtering and searching since calling the randomuser API returns different users each time.
- Client-based approach ensures users can filter and search through the currently fetched list of users without making
  additional API calls.

### Regex Search:

- Implements regex search for flexibility and efficiency.
- Allows users to search for partial matches in both first and last names.

### Componentization:

- Breaks down the UI into smaller, reusable components for easier maintenance and scalability.
- Each component focuses on a specific task, making it easier to understand and test.

## Search Functionality:

- Utilizes regular expressions (regex) to match the user's input against the first and last names of the users.
- Supports partial matches for more flexible and intuitive search behavior.
- Operates on the currently fetched list of users without making additional API calls, ensuring a smoother user
  experience.

Overall, the component structure and implementation approach prioritize maintainability, reusability, and a seamless
user experience.
