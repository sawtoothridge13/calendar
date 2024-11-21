# Sportradar Coding Academy - Frontend Coding Exercise

## Overview

This project is a sports event calendar app that allows users to view events, check event details, add & delete new events during runtime. It demonstrates understanding of basic frontend programming concepts, responsive design, and user interaction handling.

---

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Tasks Breakdown](#tasks-breakdown)
4. [Additional Features](#additional-features)
5. [Submission Guidelines](#submission-guidelines)

---

## Features

- Calendar view for sports events
- Event detail page with full event information
- Add new events functionality
- Responsive design for mobile, tablet, and desktop
- Navigation between calendar and event creation views

---

## Getting Started

### Installing the Latest Version of React

1. **Ensure Node.js is Installed**:

   - Download and install [Node.js](https://nodejs.org/), which includes npm (Node Package Manager).
   - Verify installation by running:
     ```bash
     node -v
     npm -v
     ```

2. **Create a New React App**:

   - Use the `npx` tool (included with npm 5.2+ and higher) to create a React app with the latest version:
     ```bash
     npx create-react-app my-app
     ```
   - Replace `my-app` with your desired project name.

3. **Navigate to the Project Directory**:

   - Move into your new app’s directory:
     ```bash
     cd my-app
     ```

4. **Start the Development Server**:
   - Run the following command to start your app:
     ```bash
     npm start
     ```
   - The app will open in your browser at `http://localhost:3000`.

For more details, refer to the [React documentation](https://reactjs.org/docs/getting-started.html).

---

## Tasks Breakdown

### Task 1: Calendar View

**Objective:** Implement a calendar view that displays sports events.

- Create a calendar interface for the current month.
- Display the days of the month in a grid format.
- Indicate days with scheduled sports events (e.g., with a marker or dot).
- Optionally, show brief event information (e.g., event name on the day cell).

### Task 2: Event Detail Page

**Objective:** Provide a way to view the full details of a specific event.

- When a user clicks on an event marker, navigate to a detail page.
- Display relevant event details, including:
  - Date and time
  - Sport type
  - Teams or participants
  - Additional details if available

### Task 3: Add Event Functionality

**Objective:** Allow users to add new events during runtime.

- Create a form for inputting event details:
  - Date
  - Time
  - Sport
  - Teams/participants
- Dynamically add the new event to the calendar view (runtime only, no persistence).

### Task 4: Responsiveness

**Objective:** Ensure full responsiveness on mobile, tablet, and desktop.

- Adapt layouts for smaller screens using responsive design techniques.
- Test usability and touch interactions on various devices and screen sizes.

### Task 5: Navigation

**Objective:** Create a navigation system for the application.

- Implement a navigation bar/menu to switch between:
  - Calendar view
  - "Add Event" page
- Ensure navigation is accessible from all pages.

---

## Additional Features Added

- **Styling and Enhancements:** Add CSS styling, Delete Event button, toggle button functionality to be able to hide the Add Event Form.
- **Persistent Storage:** Use local storage to retain events between sessions.

---

## Submission Guidelines

- **Code Hosting:**
  - Upload the code to a public GitHub repository.
- **Documentation:**
  - Include a README.md with:
    - Overview of the project
    - Instructions to run the application
    - Any assumptions or decisions made
- **Version Control:**
  - Commit regularly with clear, descriptive messages.

---

## Assumptions

1. I assumed it was alright to alter the provided json file (e.g. adding a key-value pair such as "sport": "Soccer")

---
