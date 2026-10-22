# About this project

This Animal Adoption Board continues my [Assignment 3 project](https://github.com/marthaschool987-png/inf255-assignment3). It loads eight animals from JSON and lets visitors filter, sort, adopt, and return animals. Adoption changes last until the page is refreshed.

## How to run it

Install Node.js 22.12 or newer. After cloning the repository, run:

```sh
cd inf255-assignment4
npm install
npm run dev
```

Open the localhost address printed in the terminal. `npm install` downloads the dependencies and uses package-lock.json to reproduce the installed versions because node_modules is not stored in Git.

To build and preview the finished site:

```sh
npm run build
npm run preview
```

## Dependency check

Day.js formats intake dates and calculates whole days since arrival. It also compares dates for newest-arrival sorting. Day.js is a browser dependency; Vite is a development dependency.

The successful production build reports a JavaScript bundle of **11.08 kB**, or **4.61 kB gzipped**. This includes the app and Day.js, rather than measuring Day.js alone. Build output goes into the ignored dist folder.

JavaScript Date and Intl.DateTimeFormat could do the same work without Day.js. Day.js is worthwhile here because its formatting and day-difference methods make the date code easier to read, although native APIs would remove the extra dependency.

## Extra credit and verification

- **Try again:** retries a failed load without refreshing and preserves filter/sort choices.
- **Newest arrival:** orders animals by intake date, most recent first, with every filter.
- Browser checks passed for all required orders, newest-arrival filters, adoption/return, counts, empty state, and arrival dates.
- Delayed responses displayed loading. HTTP 503 and invalid JSON displayed the required error and logged the expected error. Retry recovered. Normal operation had no console errors.
- public/animals.json is unchanged. package.json and package-lock.json are tracked; node_modules and dist are ignored.
