# Entry Level Positions

**Entry Level Positions** is a web application designed to help graduates find their first software engineering role.

## Features

### 1. Job Search & Filtering
- **Search**: Users can search for jobs by title or keyword.
- **Filters**:
    - **Level**: Entry Level, No Experience, Junior.
    - **Posted Date**: Today, Past Week, Past Month.
    - **Remote**: Toggle for remote-only positions.
- **Real Data**: Integrated with the **JSearch API** to fetch live job listings.

### 2. Bookmarking
- Users can **save jobs** they are interested in.
- Bookmarks are persisted using `localStorage`, so they remain available after refreshing the page.
- A dedicated **Saved Jobs** page allows users to review their bookmarks.

### 3. Premium UI/UX
- **Design**: Clean, modern interface using a blue/indigo color palette (`Inter` font).
- **Responsive**: Fully responsive layout that works on mobile and desktop.
- **Feedback**: Loading states and error messages provide clear feedback to the user.

## How to Run

Since this is a client-side application using vanilla HTML/CSS/JS, you can run it easily:

1.  **Open `index.html`** directly in your browser.
    *   *Note: For the best experience and to avoid CORS issues (though JSearch usually supports CORS), it's recommended to use a local development server.*
    *   If you have VS Code, use the **Live Server** extension.
    *   Or run `npx serve .` in the project root.

## User Guide / Verification

### Flow 1: Find Entry-Level Jobs
1.  Go to the **Home** page.
2.  Click **Start Search**.
3.  Enter "Software Engineer" and select "Entry Level".
4.  Click **Search**.
5.  Verify that job cards appear with titles, company names, and locations.

### Flow 2: Filter by Remote
1.  On the search page, check the **Remote Only** box.
2.  Click **Search** again.
3.  Verify that the results (or the "Remote" tag on cards) reflect the filter.

### Flow 3: Bookmark a Job
1.  Click the **Star (☆)** icon on any job card.
2.  Navigate to the **Saved** page via the header.
3.  Verify the job is listed there.

### Flow 4: Error Handling
1.  Disconnect your internet or use an invalid query.
2.  Verify that a user-friendly error message appears instead of the app crashing.

## Project Structure
- `src/components`: (Conceptually separated in `app.js` for simplicity in this vanilla implementation, but styles are separated)
- `src/scripts`: Contains `app.js`, `api.js`, `router.js`, `store.js`.
- `src/styles`: Modular CSS with `base`, `components`, `layout`, and `sections`.
