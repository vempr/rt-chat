# rt-chat

rt-chat is a full-stack application built for real-time blogging and user management. It features a React frontend coupled with a Node.js/Express backend, utilizing MongoDB (Mongoose) for data storage. Authentication is handled using Passport.js with local strategy. This project is what I decided to take on, after learning some backend basics with [Anson the Dev's Course on Express.js](https://www.youtube.com/watch?v=nH9E25nkk3I).

## Installation
1. Clone the repository:
```
git clone https://github.com/vempr/rt-chat
cd rt-chat
```
2. Install dependencies:
```
npm install
```
3. Create a MongoDB project with a free shared M0 cluster and create a database called `rt-chat`

4. Create .env file in root folder of app (...../rt-chat):
```
MONGODB_URI=mongodb+srv://<username>:<password>@<project-name>.bdatxt6.mongodb.net/rt-chat?retryWrites=true&w=majority&appName=<project-name>
SECRET=<your-secret>
```
5. Run `npm run dev`

6. Have fun!

## Screenshots

### Home Page
![](https://github.com/vempr/rt-chat/blob/main/screenshots/home-page-empty.png)
![](https://github.com/vempr/rt-chat/blob/main/screenshots/home-page.png)

### Create Blog Page
![](https://github.com/vempr/rt-chat/blob/main/screenshots/create-page.png)

### Blog Page
![](https://github.com/vempr/rt-chat/blob/main/screenshots/blog-page.png)

### Sign In/Sign Up Page
![](https://github.com/vempr/rt-chat/blob/main/screenshots/signin-page.png)
![](https://github.com/vempr/rt-chat/blob/main/screenshots/signin-page-failed.png)
![](https://github.com/vempr/rt-chat/blob/main/screenshots/signup-page.png)
![](https://github.com/vempr/rt-chat/blob/main/screenshots/signup-page-error.png)

### Account Details Page
![](https://github.com/vempr/rt-chat/blob/main/screenshots/accountdetails-page.png)
![](https://github.com/vempr/rt-chat/blob/main/screenshots/accountdetails-page-model.png)

## Dependencies
- Frontend: React, React Router, Redux Toolkit, Tailwind CSS
- Backend: Express, MongoDB, Mongoose, Passport.js
- Development: TypeScript, ESLint, Prettier, Vite

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit). Feel free to use, modify, and distribute the code according to the terms of the license.
