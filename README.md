# Async Race

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-8A2BE2?logo=redux)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

A modern single-page application built with **React**, **TypeScript**, and **Redux Toolkit** that simulates car races using a REST API. Users can manage a garage of cars, control engines, run races, and track winners with sorting and pagination.

## Live Demo

**Frontend:** https://async-race-beryl.vercel.app/

> **Note**
>
> This repository contains the frontend application.
> To use all functionality, the official Async Race backend must be running locally on:
>
> ```
> http://localhost:3000
> ```

---

# Features

## Garage

- Create, update and delete cars
- Choose custom car colors
- Generate 100 random cars
- Display 7 cars per page
- Automatic pagination
- Empty garage handling
- Automatic return to the previous page after deleting the last car
- Persistent create/edit form state
- Persistent pagination state

## Race

- Start and stop individual engines
- Start race for all visible cars
- Reset race
- Responsive car animation
- Winner detection
- Winner announcement
- Engine failure handling
- Disable unsafe actions while a race is running

## Winners

- Winner statistics table
- Car icon and name
- Wins counter
- Best race time
- Pagination
- Sorting by wins
- Sorting by best time
- Ascending and descending sorting

---

# Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Router
- Vite
- Fetch API
- CSS
- ESLint
- Prettier
- Vercel

---

# Project Structure

```text
src/
├── api/
├── app/
├── components/
├── constants/
├── features/
│   ├── garage/
│   ├── race/
│   └── winners/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/zhanerkemy/async-race.git
cd async-race
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_API_BASE_URL=http://localhost:3000
```

A sample configuration is available in:

```text
.env.example
```

---

# Running the Project

Start the frontend

```bash
npm run dev
```

Build production version

```bash
npm run build
```

Run ESLint

```bash
npm run lint
```

Format project

```bash
npm run format
```

Preview production build

```bash
npm run preview
```

---

# Backend

Clone and start the official Async Race backend:

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

The backend should be available at:

```
http://localhost:3000
```

---

# Screenshots

## Garage

> <img width="1270" height="718" alt="image" src="https://github.com/user-attachments/assets/9fa5a017-a635-4391-a9ad-1659312d0e50" />


## Winners

> <img width="1286" height="442" alt="image" src="https://github.com/user-attachments/assets/f9e663ff-0489-4ca3-9eba-1b27fbbe1d5d" />


---

# RS School Self-Assessment

**Estimated score:** **390 / 400**

## UI Deployment

- [x] Frontend deployed on Vercel

## Repository

- [x] Meaningful commits
- [x] README included
- [x] Deployment link included
- [x] Estimated score included

## Basic Structure (80 / 80)

- [x] Garage page
- [x] Winners page
- [x] Persistent application state

## Garage (90 / 90)

- [x] CRUD operations
- [x] Color picker
- [x] Generate 100 cars
- [x] Pagination
- [x] Empty state
- [x] Previous-page handling after deletion

## Winners (50 / 50)

- [x] Winners table
- [x] Pagination
- [x] Sorting
- [x] Correct winner updates

## Race (170 / 170)

- [x] Engine control
- [x] Race animation
- [x] Reset
- [x] Winner detection
- [x] Responsive animation
- [x] Safe actions during race

## Tooling (10 / 10)

- [x] ESLint
- [x] Prettier

---

# Author

**Zhanerke Myrzabekova**

GitHub: https://github.com/zhanerkemy

---

# 📄 License

This project was developed for the **RS School Async Race** assignment and is intended for educational purposes.
