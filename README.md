# 💾 CRM-app-skillbus app to manage clients data

# Description <br>
Frontend part of app has been created by me . The backend part was created by my partners.  It is possible to view the list of clients in the form of a table, add a new client, change information about an existing client (full name and contact information) and delete a client. All column headers, except contacts and actions, can be clicked to sort by the corresponding field. The first click sets the sorting in ascending order, the second one - in descending order. When entering text in the search field, the table data is re-requested from the API with the entered search query, and the request is sent only after the user has finished entering the search query. All the client's contacts are displayed as icons with links to this contact, as well as a popup hint with the type and value of this contact appears when you hover over it. When a client is added, deleted, or modified, a modal window appears.
# How to start
You can clone the entire contents of the git clone <this repo> repository or download the ZIP archive of the repository.
Start the server, being in the root of the project, you need to go to the crm-backend folder. After opening the command prompt, run the 'node index' command. Before starting, make sure that you have installed Node.js version 12 or higher.
Next, due to the COURSE policy, you need to launch the project from the crm-frontend folder using the Live Server plugin in your code editor or any other server.
