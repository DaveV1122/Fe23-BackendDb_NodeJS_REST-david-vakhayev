# Endpoint Dokumentation - GritAcademy API

Detta dokument beskriver REST API endpoints för projektet GritAcademy.

Base URL:

```txt
http://localhost:3000
```

## Studenter

### Hämta alla studenter

```http
GET /api/students
```

Returnerar alla studenter i JSON-format.

### Hämta student via id och studentens kurser

```http
GET /api/students/id/:id
```

Exempel:

```http
GET /api/students/id/1
```

Returnerar en specifik student och de kurser som studenten är kopplad till.

### Hämta studenter via förnamn

```http
GET /api/students/fname/:fname
```

Exempel:

```http
GET /api/students/fname/David
```

Returnerar alla studenter med ett specifikt förnamn och deras kurser.

### Hämta studenter via efternamn

```http
GET /api/students/lname/:lname
```

Exempel:

```http
GET /api/students/lname/Vakhayev
```

Returnerar alla studenter med ett specifikt efternamn och deras kurser.

### Hämta studenter via stad

```http
GET /api/students/town/:town
```

Exempel:

```http
GET /api/students/town/Malmö
```

Returnerar alla studenter från en specifik stad och deras kurser.

### Lägg till student

```http
POST /api/students
```

Body JSON:

```json
{
  "fName": "David",
  "lName": "Vakhayev",
  "town": "Malmö"
}
```

Skapar en ny student.

### Ta bort student via id

```http
DELETE /api/students/:id
```

Exempel:

```http
DELETE /api/students/1
```

Tar bort en student via id.

## Kurser

### Hämta alla kurser

```http
GET /api/courses
```

Returnerar alla kurser i JSON-format.

### Hämta kurs via id och kursens studenter

```http
GET /api/courses/id/:id
```

Exempel:

```http
GET /api/courses/id/1
```

Returnerar en specifik kurs och de studenter som är kopplade till kursen.

### Hämta kurs via exakt namn

```http
GET /api/courses/name/:name
```

Exempel:

```http
GET /api/courses/name/NodeJS Backend
```

Returnerar kurs med specifikt namn och dess studenter.

### Sök kurs via ord i kursnamn

```http
GET /api/courses/search/name/:word
```

Exempel:

```http
GET /api/courses/search/name/Node
```

Returnerar kurser där ordet finns i kursnamnet.

### Sök kurs via ord i beskrivning

```http
GET /api/courses/search/description/:word
```

Exempel:

```http
GET /api/courses/search/description/server
```

Returnerar kurser där ordet finns i beskrivningen.

### Lägg till kurs

```http
POST /api/courses
```

Body JSON:

```json
{
  "name": "NodeJS Backend",
  "description": "Serverutveckling med NodeJS och Express"
}
```

Skapar en ny kurs.

### Ta bort kurs via id

```http
DELETE /api/courses/:id
```

Exempel:

```http
DELETE /api/courses/1
```

Tar bort en kurs via id.

## Relationer mellan studenter och kurser

### Hämta alla relationer

```http
GET /api/relations
```

Returnerar alla relationer mellan studenter och kurser.

### Lägg till relation

```http
POST /api/relations
```

Body JSON:

```json
{
  "students_id": 1,
  "courses_id": 2
}
```

Skapar en relation mellan en student och en kurs.

### Ta bort relation via id

```http
DELETE /api/relations/:id
```

Exempel:

```http
DELETE /api/relations/1
```

Tar bort en relation via id.

## Motivering av URL-struktur

URL:erna är organiserade efter datastrukturen i databasen. Studenter hanteras under `/api/students`, kurser under `/api/courses`, och relationstabellen under `/api/relations`. Sökningar efter id, namn och stad placeras som tydliga underresurser, till exempel `/api/students/id/:id` och `/api/courses/search/name/:word`. Det gör API:t lättare att läsa, testa och dokumentera.
