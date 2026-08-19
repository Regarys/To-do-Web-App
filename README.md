Hello! In this project i made a simple to-do app, you can try it actually!

I made this on linux system so yeah, if you're on windows use wsl ubuntu i think
Requirement :
1. Postgresql
2. Node JS
3. Browser (I tried on chrome and build it using firefox) - ( i don't think this is safari compatible at this moment :( i don't have apple device )

How to install :
1. Clone this Repository
  Open wsl or your terminal, then run :
  git clone <your-repository-url> cd To-do-Web-App
2. Install Node.js depedencies
  npm install
  This will install all dependencies from package.json.
3. Make sure PostgreSQL is running
  sudo service postgresql start
  Check if PostgreSQL is running:
  sudo service postgresql status
4. Create the database
   sudo -u postgres createdb to_do
5. Import the database
  This project includes a database dump inside the database folder.
  Run:
  sudo -u postgres psql -d to_do -f database/to_do.sql
6. Configure The Server
   In the server.js you can change the port if you already running something in port 3000, and you can add password on the posgres configuration, i made it empty if you have no password so i think just run it will be fine.
7. Start the server
  Run:
  npm start
  If everything is configured correctly, you should see:
  Server Running at http://localhost:3000
  Connected to postgresql
8. Open the application
  Open your browser and go to:
  http://localhost:3000
  And that's it!

Features
Create a new to-do
Update a to-do
Mark a to-do as completed
Delete a to-do
View to-dos by date
PostgreSQL database integration
REST API using Express.js
Tech Stack
HTML
CSS
Vanilla JavaScript
Node.js
Express.js
PostgreSQL
Notes

This project is still a simple personal project, so there may be some bugs or browser compatibility issues.

If you find something broken, feel free to open an issue or let me know!

Have fun trying it out :)

Screenshoot :
1. Main page
<img width="1855" height="963" alt="image" src="https://github.com/user-attachments/assets/6fbef417-8200-47c3-8313-df76d71a1b62" />
2. Monthly Interaction
<img width="1286" height="982" alt="image" src="https://github.com/user-attachments/assets/c6d3292e-a1d0-4047-aded-89387e8eb475" />
3. To-Do Task View
<img width="1747" height="814" alt="image" src="https://github.com/user-attachments/assets/93e4bcaf-82f7-4624-bb6c-eeeae6f30c6d" />
