


#  Build Week - unit 4 - Water My Plants

## Base URL
https://watermyplants02.herokuapp.com

![Screen Shot 2021-07-26 at 9 27 35 PM](https://user-images.githubusercontent.com/55516943/127095511-2ae5a9b9-fbce-4c08-9f71-efc6d9ee797f.png)

## API endpoints

### login/register

| Auth | Endpoint           | Required                  | Restrictions | Notes                                             |
| -----| ------------------ | --------------------------| -------------| ------------------------------------------------- |
| POST | /api/auth/register | username, password, phone | Username: unique,min 3 & max 25 chars, password:min 8 & max 25 chars & phone: unique, ###-###-#### format| Creates a new user with auto Id.|
| POST | /api/auth/login    | username, password        | None         | Returns a welcome message and the JSON Web Token. |


### Users

| Auth | Endpoint              | Required            | Restrictions      -| Notes                                    |
| -----| --------------------- | --------------------| -------------------|------------------------------------------|
| GET  | /api/users/:user_id        | None           | authenticated user | Returns the specified user object.       |
| GET  | /api/users/:user_id/plants | None           | authenticated user | Returns array of users plants.           |
| PUT  | /api/users/:user_id        | username, phone, email |authenticated user| Returns updated user object.       |


### Plants

| Auth   | Endpoint        | Required            | Restrictions          | Notes                                       |
| -------| --------------- | --------------------| ----------------------| ------------------------------------------- |
| GET    | /api/plants/    | None                | authenticated user    |  Returns specified plant object.            |
| GET    | /api/plants/:plant_id | None          | authenticated user    |  Returns array of All plants.               |
| POST   | /api/plants/    | nickname, species, h2oFrequency, userId | authenticated user        | Returns new plant object. |
| PUT    | /api/plants/:plant_id | userId, nickname, species, h2oFrequency | authenticated user        | Returns updated plant object.  |
| DELETE | /api/plants/:plant_id | plant_id            | authenticated user | Returns deleted record if successfully deleted. |


### Detailed_endpoints

[POST] REGISTER (/api/auth/register). 
---------------------

*receives*    

{  
    username,  
    password,                                                                                                                                                         phone,                                                                                                                                                        
    email (optional)                                                                                                                                                 
}   

*returns*    
{  

    user_id,  
    username,  
    password   
}

[POST] LOGIN (/api/auth/login). 
---------------------

*receives*  
{  

    username,  
    password  
}

*returns*      
{  

    message,    
    token  
} 


[GET] user by ID *restricted* (api/users/:userId)   
---------------------

*returns*    

{  

    user_id,
    username,
    password,
    user_email,
    user_phone,
    created_at  
 }
 
 [GET] plants by userId *restricted* (/api/users/:userId/plants)
---------------------

*returns*  

[
    
    {
        user_id,
        username,
        plant_id,
        plant_nickname,
        plant_species,
        h2ofrequency
    },
    {
        user_id,
        username,
        plant_id,
        plant_nickname,
        plant_species,
        h2ofrequency
    }
]

[PUT] user *restricted* (/api/users/:userId)
---------------------

*receives*  

{  

    username,          
    user_phone,                                                                    
    user_email,                                    
}

*returns*    
{  

    user_id,
    username,                                 
    user_phone,                                 
    user_email,                                      
    created_at                                  
}
[GET] plants (/api/plants/)

*returns*
[

    {
        plant_id,
        plant_nickname,
        plant_species,
        h2ofrequency,
        plant_image,
        user_id,
        created_at,
        updated_at
    },
    {
        plant_id,
        plant_nickname,
        plant_species,
        h2ofrequency,
        plant_image,
        user_id,
        created_at,
        updated_at
    },
 ]
 
 [GET] plant by ID restricted (api/plants/:plantId)
 
 *returns*
 
 {
 
    user_id,
    plant_nickname,
    plant_species,
    h2ofrequency
}

[POST] plants (/api/plants/)

*receives*

{

    user_id,
    plant_nickname,
    plant_species,
    h2ofrequency
}

*returns*

{

    user_id,
    plant_id,
    plant_nickname,
    plant_species,
    h2ofrequency
}

[PUT] plant restricted (/api/plants/:plantId)

*receives*

{

    plant_nickname,
    plant_species,
    h2ofrequency
}

*returns*

{

    user_id,
    plant_nickname,
    plant_species,
    h2ofrequency,
    plant_image
}


[DELETE] plant restricted (/api/plants/:plantId)

*returns*                                       

{      

        plant_id,                            
        plant_nickname,                        
        plant_species,                
        h2ofrequency,                         
        plant_image,                         
        user_id,                              
        created_at,               
        updated_at
    
}
   
Login_credential: these credentials can be used to test the login and end points, if you did not register yet                                                      
username: lambda                                                                                                                                                  
password: lambda123

