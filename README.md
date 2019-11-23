# nodemailer
*React II. mandatory assignment*

##Back-end

Cd to the 'server' directory, and run:

node server.js

It will run the app in development mode on http://localhost:8080.

##Front-end

Cd to the 'client' directory, and run:

npm start

It will run the app in development mode on http://localhost:3000.

##Notes

If you want to try out the application, create a file in the server folder, call it 'credentials.js' and add the following lines:

```javascript
const user = 'thisisyouremail@email.com'
const password = 'ThisIsYourPassword'

module.exports = {user, password}
```

Rita! Don't forget, that you have to restart the server (node) every time, when you make changes, so don't freak out if something doesn't work!
