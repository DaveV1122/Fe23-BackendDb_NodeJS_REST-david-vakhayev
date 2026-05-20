# Projektrapport - GritAcademy Backend DB

I detta projekt skapades en NodeJS REST API och ett Web GUI för databasen GritAcademy. Databasen byggdes i MySQL och innehåller tre tabeller: `students`, `courses` och `students_courses`. Tabellen `students_courses` används som relationstabell för att koppla studenter till kurser.

Det mest intressanta med projektet var att kombinera backend, databas och frontend i samma applikation. REST API:t returnerar JSON-data medan Web GUI:t använder EJS och HTML-formulär för att visa, skapa, redigera och ta bort data i databasen. Detta gjorde projektet mer verklighetsnära eftersom samma databas används både av API endpoints och webbgränssnittet.

Det som var lättast var att skapa de grundläggande tabellerna och visa data från databasen i HTML-tabeller. Express gör det enkelt att skapa routes och MySQL2 gör det tydligt att skicka SQL-frågor från Node.js till databasen.

Det som var mest utmanande var relationstabellen mellan studenter och kurser. Eftersom relationstabellen använder foreign keys behövde applikationen hämta data från flera tabeller samtidigt med JOIN-frågor. Detta löstes genom att använda SQL JOIN i både API-routes och GUI-routes. I Web GUI:t används dropdown-menyer när man skapar eller redigerar relationer, vilket gör det enklare att välja rätt student och kurs.

Designen är enkel och tydlig. Hemsidan innehåller länkar till studenter, kurser, relationer och API. Varje tabell har sin egen CRUD-sida där användaren kan lägga till, redigera och ta bort data. CSS används för att göra sidan renare och mer lättläst.

URL-strukturen valdes för att följa datastrukturen i projektet. Därför finns studentdata under `/api/students`, kursdata under `/api/courses` och relationer under `/api/relations`. Mer specifika sökningar, till exempel efter id, förnamn, efternamn, stad eller kursnamn, ligger som tydliga under-URL:er. Detta gör API:t enkelt att förstå och testa.
