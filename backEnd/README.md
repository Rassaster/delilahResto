# DELILAH RESTO
### < Basic API project for [Acamica](https://www.acamica.com) academy. />
This API was built using NodeJs with Express, MySQL and Sequelize.

## Server and DB setup instructions:
Please follow the next steps for setting up the server and database prior to testing the API:
1. Clone the repository.
2. Initialize the database by accessing the directory that holds the DDL and DML files:
    1. In your CM Terminal, locate in the "dataBase" directory: `delilahResto/backend/dataBase`
    2. Create the database: enter the command `mysql -u <you_database_user> -p DDL_init-Delilah.sql`. Then, enter your password.
    3. Insert the basic data: enter the command `mysql -u <you_database_user> -p DML_init-Delilah.sql`. Then, enter your password.
    4. The dataBase is now ready.
3. Setup the environment variables by changing the name of `deploySample.env` to `.env`. Then, assign the correspondant information for each variable (replace only the information between the <> and enclose it between quotes ("") instead). Example:
    - USER_DB = "root"
    - PASS_DB = "myPassword"
    - HOST_DB = "localhost"
    - PORT_DB = "3306"
4. Install all the dependencies: in the CM Terminal, locate in the directory that contains the "package.json" file (`/delilahResto/backend`). Once in there, excute the command `npm init`.
5. Initialize the server: in the location `delilahResto/backend`, execute the command `npx nodemon app.js`. The server is now running and connected to the database.

## More about the project:
This is an academic project in which a REST API is developed with the purpose to make an order management system for a fictitious restaurant called 'Delilah Resto'. Through the use of CRUD requests, the API allows the creation, modification and deletion of orders, products and clients. There are two types of credentials for whoever uses this service: Admin and User. Unlike the Admin, the User will only be able to make inquiries associated with their orders and their own information. In the other hand, the Admin credentials allow any type of CRUD operations among the '/users', '/products' and '/orders' endpoints. The only restriction that the Admin has is that they can't change other users' password.

You can find the OAP3 [documentation here](https://app.swaggerhub.com/apis/Rassaster/delilahRestoAPI/1.0.0).
