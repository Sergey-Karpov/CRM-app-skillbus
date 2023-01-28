# 💾 CRM-app-skillbus app to manage clients data
# Описание <br>
Интерфейсная часть приложения была создана мной. Серверная часть была создана моими партнерами. Можно просмотреть список клиентов в виде таблицы, добавить нового клиента, изменить информацию о существующем клиенте (полное имя и контактную информацию) и удалить клиента. Все заголовки столбцов, кроме контактов и действий, можно щелкнуть для сортировки по соответствующему полю. Первый клик устанавливает сортировку в порядке возрастания, второй - в порядке убывания. При вводе текста в поле поиска данные таблицы повторно запрашиваются из API с введенным поисковым запросом, и запрос отправляется только после того, как пользователь закончил вводить поисковый запрос. Все контакты клиента отображаются в виде значков со ссылками на этот контакт, а также всплывающая подсказка с типом и значением этого контакта появляется при наведении на него курсора мыши. Когда клиент добавляется, удаляется или изменяется, появляется модальное окно.
# Как начать
Вы можете клонировать все содержимое репозитория git clone <this repo> или загрузить ZIP-архив репозитория.
Запустите сервер, находясь в корне проекта, вам нужно зайти в папку crm-backend. После открытия командной строки запустите команду 'node index'. Перед запуском убедитесь, что вы установили Node.js версия 12 или выше.
Далее, в соответствии с политикой CORS, вам необходимо запустить проект из папки crm-frontend, используя плагин Live Server в вашем редакторе кода или на любом другом сервере.
___
### screens
![main-screenshot](https://github.com/Sergey-Karpov/CRM-app-skillbus/blob/main/screens/main.png)
![add client](https://github.com/Sergey-Karpov/CRM-app-skillbus/blob/main/screens/add-client.png)
![load](https://github.com/Sergey-Karpov/CRM-app-skillbus/blob/main/screens/load.png)
![load](https://github.com/Sergey-Karpov/CRM-app-skillbus/blob/main/screens/search.png)
___
### eng
# Description <br>
Frontend part of app has been created by me . The backend part was created by my partners.  It is possible to view the list of clients in the form of a table, add a new client, change information about an existing client (full name and contact information) and delete a client. All column headers, except contacts and actions, can be clicked to sort by the corresponding field. The first click sets the sorting in ascending order, the second one - in descending order. When entering text in the search field, the table data is re-requested from the API with the entered search query, and the request is sent only after the user has finished entering the search query. All the client's contacts are displayed as icons with links to this contact, as well as a popup hint with the type and value of this contact appears when you hover over it. When a client is added, deleted, or modified, a modal window appears.
# How to start
You can clone the entire contents of the git clone <this repo> repository or download the ZIP archive of the repository.
Start the server, being in the root of the project, you need to go to the crm-backend folder. After opening the command prompt, run the 'node index' command. Before starting, make sure that you have installed Node.js version 12 or higher.
Next, due to the CORS policy, you need to launch the project from the crm-frontend folder using the Live Server plugin in your code editor or any other server.
