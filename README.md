# Full_Stack_School_App
 Provide a way for users to administer a school database containing information about courses
 
 * Hosted using firbase - [https://school-courses-app.firebaseapp.com](https://school-courses-app.firebaseapp.com)

## About the Project

I have used React to create a client for the existing school database REST API (that I created in a previous project [rest_api_for_School_Database](https://github.com/anilvarma-kav/rest_api_for_School_Database). 
The full stack application will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.

In addition, the project will require users to create an account and sign in to make changes to the database. 


## Used Technologies
* JavaScript and JSX to build the components in a modular fashion
* Create React App tool to se up initial project
* React Router to set up routes
* Fetch API to fetch data from my REST API
* Basic Authentication to support users signing in

## To Use the Project

1. Clone or download the repository
2. Open a Terminal or Command Prompt for REST API
3. Navigate to api folder from project root 
4. Install dependencies for api 

    ```$xslt
    $ cd api
    $ npm install
    ```
5. Start the REST Server

    ```$xslt
    $ npm start
    ```
6. The Server will be running on PORT 5000
7. Open new terminal for client
8. Navigate to client folder from project root
9. Install dependencies for client
    ```$xslt
    $ cd client
    $ npm install
    ```
10. Start the client
    ```$xslt
        $ npm start
    ```
11. The Client will be running on PORT 3000 [http://localhost:3000/](http://localhost:3000/)


