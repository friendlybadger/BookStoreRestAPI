## BookStoreRestAPI
### About the Poject
This project is a simple MySQL, RestApi for a book shop.

The web application allows the user to Create,Update,Delete items on to the Bookshop Table.

### Required software

- MySQL Workbench
- Node.js
- Postman
- Terminal(For eample Powershell, command prompt or Linux Terminal)


###### Made with:

- Node.js version v14.15.4 
- MySQL Workbench version 8.0.23

### Running BookStoreRestAPI:
Set up MySQL Workbench and run the database schema located "DatabaseSchema.txt".
    
Change *"RestApi/services/db.js"* and change the password to your **MySQL password**.
file located here [db.js](RestApi/services/config.json)
```json
    {
        "host": "localhost",
        "user": "root",
        "password": "<password>",
        "database": "BookStore",
    }
```

In an terminal put the following in:
- install Mysql, node.js, Postman
- run the schema.txt in MySQL then the Databse data.txt   
- cd RestApi
- npm install
- npm start
- go to the address in your browser:  http://localhost:3001/Authors you should be able to see the Authors Table

###### Using Posttman
#### Seeing data fro mthe database 
- Put  ***http://localhost:3001/Authors***  in to the addess bar and change the dropdown menu to **GET**
    - You should see the data from Authors table 
- Put  ***http://localhost:3001/Authors/1***  in to the addess bar and change the dropdown menu to **GET**
    - You should see the data from the entry with the AuthorsID=1 from  Authors table 

#### Inserting into the database
- To Insert into the database change the address to ***http://localhost:3001/Authors***  and Drop down menu to **POST** and click on Body tab and then click on **raw** button.
    - into the workspace below put the folloing text 
 ```json 
    {
        "FirstName": "Victoria ",
        "LastName": "Sanchez"
}
```
    and click send 
- Go back to  ***http://localhost:3001/Authors***  and turn the droopdopwn button into **GET**
- You shold see your entry down the bottom of the list

#### Updating Entries 
- to update your entry change the address top  to  ***http://localhost:3001/Authors/<id>*** where id= the AuthorsID number  of your entry
- change the drop down menu to **PUT** and put the following body work space to 
```json
    {
        "FirstName": "Jose",
        "LastName": "Clark"
    }
```
and click send 
- change the drop down menu to **GET** and click send
- you should see the change firstname and lastname in the reponse block

#### Deleteing
- To delete change the dropdown menu to **DELETE** and click send
- Go back to ***http://localhost:3001/Authors*** and turn the droopdopwn button into **GET** and you should see your entry has been deleted 



