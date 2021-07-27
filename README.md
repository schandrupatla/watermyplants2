

#  Build Week - unit 4 - Water My Plants

## Base URL
https://watermyplants02.herokuapp.com

DataBase Tables:

Constraints![Screen Shot 2021-07-26 at 10 00 34 AM](https://user-images.githubusercontent.com/55516943/127029756-2811251c-19a3-4d4a-ac69-b88cd7dde316.png)


## API endpoints

### login/register

| Auth | Endpoint           | Required                  | Restrictions | Notes                                             |
| -----| ------------------ | --------------------------| -------------| ------------------------------------------------- |
| POST | /api/auth/register | username, password, phone | Username & phone must be unique| Creates a new user with auto Id.|
| POST | /api/auth/login    | username, password        | None         | Returns a welcome message and the JSON Web Token. |


### Users

| Auth | Endpoint              | Required            | Restrictions      -| Notes                                    |
| -----| --------------------- | --------------------| -------------------|------------------------------------------|
| GET  | /api/users/:id        | None                | authenticated user | Returns the specified user object.        |
| GET  | /api/users/:id/plants | None                | authenticated user | Returns array of users plants.           |
| PUT  | /api/users/:id        | userId, nickname, species, h2oFrequency  | authenticated user |  Returns updated user object.|


### Plants

| Auth   | Endpoint        | Required            | Restrictions          | Notes                                       |
| -------| --------------- | --------------------| ----------------------| ------------------------------------------- |
| GET    | /api/plants/    | None                | authenticated user    |  Returns array of All plants.               |
| POST   | /api/plants/    | nickname, species, h2oFrequency, userId | authenticated user        | Returns new plant object. |
| PUT    | /api/plants/:id | userId, nickname, species, h2oFrequency | authenticated user        | Returns updated plant object.  |
| DELETE | /api/plants/:id | plant_id            | authenticated user | Returns deleted record if successfully deleted. |




