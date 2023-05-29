
# Employee review system

This web application allows employees to give and receive feedback on their performance. Users can have either an "employee" or an "admin" role, which determines their access to different dashboard pages. Admins can assign employees to review other employees, while employees can only submit feedback for the assigned reviews. The web application is built with NodeJs, ExpressJs, MongoDB, EJS and JavaScript. It is a useful tool for improving employee engagement and productivity.


## Features
Admin's functions
- Add employee
- Delete employee
- Update employee details
- Assign review to employee
- Update review of employee
Employee's functions
- Submit reviews assigned to it
- View reviews given by others

## Installation
- Fork the project
- Clone the forked repository in your local system
- Create .env file in the root directory and add the following:
  - PORT="Your port number"
  - MONGODB_URL="Your MongoDB URL"
  - SESSION_SECRET_KEY="Your secret session key"
- Install all required packages

Install my-project with npm

```bash
  npm install 
```
- Run project
```bash
npm start
```
The project is running on the port number provided by you.
## Tech Stack

**Client:** EJS , Bootstrap

**Server:** NodeJS, Express MongoDB , ExpressJS

**Libraries:**

- bcryptjs
- passport-local
- passport-jwt
- passport
- mongoose
- express-session
- express-ejs-layout
- express
- ejs
- dotenv
- cookie-parser
- connect-mongo
- connect-flash
## Screenshots

![App Screenshot](https://user-images.githubusercontent.com/35091245/205214105-5b3f7c6d-4baf-4079-acea-076bca8a13c0.png)

![App Screenshot](https://user-images.githubusercontent.com/35091245/205214233-04937a10-2672-423e-b26f-f1d6ba94c485.png)

![App Screenshot](https://user-images.githubusercontent.com/35091245/205214395-61622d49-c4e5-490f-8603-e72559248828.png)
