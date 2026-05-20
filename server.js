import express from 'express';
import dotenv from 'dotenv';
import methodOverride from 'method-override';

import apiStudentsRoutes from './routes/api.students.routes.js';
import apiCoursesRoutes from './routes/api.courses.routes.js';
import apiRelationsRoutes from './routes/api.relations.routes.js';

import webStudentsRoutes from './routes/web.students.routes.js';
import webCoursesRoutes from './routes/web.courses.routes.js';
import webRelationsRoutes from './routes/web.relations.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

// API routes
app.use('/api/students', apiStudentsRoutes);
app.use('/api/courses', apiCoursesRoutes);
app.use('/api/relations', apiRelationsRoutes);

// Web GUI routes
app.use('/students', webStudentsRoutes);
app.use('/courses', webCoursesRoutes);
app.use('/relations', webRelationsRoutes);

app.use((req, res) => {
  res.status(404).send('404 - Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});