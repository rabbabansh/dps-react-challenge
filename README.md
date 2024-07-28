# DPS Frontend Coding Challenge

## Overview

This project is a Customer Relationship Management (CRM) application built with React, TypeScript, and Tailwind CSS. It showcases a searchable and filterable list of users, demonstrating modern web development practices and UI/UX considerations.

![App Screenshot](/images/image.png)

## Live Demo

You can view a live demo of this application deployed on Vercel:

[https://dps-react-challenge-fbdjyv8el-rabbabanshs-projects.vercel.app/](https://dps-react-challenge-fbdjyv8el-rabbabanshs-projects.vercel.app/)

Feel free to explore the application's features and functionality before proceeding with the local installation.

## Features

-   **User Search:** Dynamic search functionality for filtering users by name.
-   **City Filter:** Dropdown menu to filter users by city.
-   **Oldest User Highlight:** Option to highlight the oldest user in each city.
-   **Responsive Design:** Fully responsive layout that works on various screen sizes.
-   **Dark Mode Support:** Toggle between light and dark modes for user preference.
-   **Performance Optimization:** Debounced search input for improved performance.

## Technologies Used

-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui components
-   Custom hooks (useDebounce)

## Getting Started

### Prerequisites

-   Node.js (v14.x or later)
-   npm (v6.x or later)

### Installation

1. Clone the repository:

    ```
    git clone https://github.com/rabbabansh/dps-react-challenge
    ```

2. Navigate to the project directory:

    ```
    cd dps-react-challenge
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Start the development server:

    ```
    npm run dev
    ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Project Structure

```
└── 📁src
    └── App.css
    └── App.tsx
    └── 📁assets
        └── DPS-dark.svg
        └── DPS-light.svg
    └── 📁components
        └── SkeletonLoading.tsx
        └── UserSearch.tsx
        └── 📁theme
            └── mode-toggle.tsx
            └── theme-provider.tsx
        └── 📁ui
            └── button.tsx
            └── checkbox.tsx
            └── dropdown-menu.tsx
            └── input.tsx
            └── label.tsx
            └── select.tsx
            └── skeleton.tsx
            └── table.tsx
    └── 📁hooks
        └── useDebounce.tsx
    └── index.css
    └── 📁lib
        └── utils.ts
    └── main.tsx
    └── 📁types
        └── index.tsx
    └── vite-env.d.ts
```

## Key Components

### UserSearch

The main component of the application, `UserSearch`, handles the display and filtering of user data. It includes:

-   Search input for filtering by name
-   City selection dropdown
-   Checkbox for highlighting the oldest users
-   Table display of filtered users

### SkeletonLoading

A component that displays a loading skeleton while data is being fetched.

### useDebounce Hook

A custom hook that debounces the search input, improving performance by reducing the number of filter operations.

```typescript
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
```

## Dark Mode

The application supports both light and dark modes. The mode can be toggled using a selector in the UI. The custom DPS logo SVG adapts to the current mode, ensuring visibility in both light and dark themes.

## API Integration

The application fetches user data from the `https://dummyjson.com/users` endpoint. The data is then processed and filtered client-side based on user interactions.

## Performance Considerations

-   The search input is debounced to reduce unnecessary API calls or filtering operations.
-   React's `useMemo` hook is utilized to optimize expensive calculations, such as filtering the user list.

Happy coding!
