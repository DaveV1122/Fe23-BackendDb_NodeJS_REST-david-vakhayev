# GritAcademy Backend DB - NodeJS REST API

Detta projekt är ett slutprojekt i Backend DB där en NodeJS REST API och Web GUI skapas för databasen GritAcademy.

Projektet använder:

- Node.js
- Express
- MySQL
- EJS
- HTML Forms
- CSS

## Funktioner

- REST API som returnerar JSON-data
- Web GUI för CRUD-operationer
- MySQL-databas med tre tabeller
- Studenter
- Kurser
- Relationer mellan studenter och kurser

## Databas

Databasen heter:

`GritAcademy`

Tabeller:

- `students`
- `courses`
- `students_courses`

## Installation

Installera paket:

```bash
npm install
```

Importera databasen i MySQL/phpMyAdmin:

```txt
sql/gritacademy.sql
```

Starta servern:

```bash
npm run dev
```

Öppna sidan:

```txt
http://localhost:3000
```

## Web GUI

- `/students`
- `/courses`
- `/relations`

## API

- `/api/students`
- `/api/courses`
- `/api/relations`

## Skapad av

David Vakhayev
