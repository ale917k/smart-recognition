# SmartBrain
This project contains the FrontEnd of the Smart Brain App.

What The App Does:
- Form with Register and Login
- Face Recognition made with Machine Learning
- Keeps track of Users Profile Detections


What It Uses:
- Flexbox
- React
- Node.js / Express.js using RESTful API
- JSON
- AJAX
- Relational Database built with PostgreSQL

What Is Implemented:
- tachyons - framework for fast loading and fully responsive CSS
- Clarifai API - Face Recognition API (AI company)
- particles.js - Library for background animation
- body-parser.js - Node.js body parsing middleware
- cors.js - Configures the Access-Control-Allow-Origin to make a safe communication FrontEnd - Server
- knex.js - "Batteries included" SQL query builder for Relational Databases
- bcrypt.js - To encrypt sensitive information (such as psw) for a better user experience

To run the server:

1. Clone this repo
2. Run `npm install`
3. Run `npm start`
4. You must add your own API key in the `controllers/image.js` file to connect to Clarifai API.

You can grab Clarifai API key here: (https://www.clarifai.com/)

** Make sure you use postgreSQL instead of mySQL for this code base.
