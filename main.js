

const express = require('express');
const app = express();
const port = 3000;

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', './views')

// Middleware to check working hours
function checkWorkingHours(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const hour = now.getHours(); // Hour in 24-hour format

    // Check if it's Monday to Friday and between 9 AM and 5 PM
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Allow access
    } else {
        res.send('Sorry! The website is only accessible from Monday to Friday, from 9 AM to 5 PM.');
    }
}

// Use the middleware for all routes
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
    res.render('home'); // Make sure 'home.pug' exists in the 'views' directory
});

app.get('/contact', (req, res) => {
    res.render('contact'); // Make sure 'contact.pug' exists
});

app.get('/services', (req, res) => {
    res.render('services'); // Make sure 'services.pug' exists
});

// Catch 404 errors
app.use((req, res) => {
    res.status(404).send('404 - Page not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
