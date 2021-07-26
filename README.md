
DataBase Tables:

Constraints![Screen Shot 2021-07-26 at 10 00 34 AM](https://user-images.githubusercontent.com/55516943/127029756-2811251c-19a3-4d4a-ac69-b88cd7dde316.png)

Tabel:users

Column_name
user_id
Primary_key,required
username
String,required,unique
password
string,min(8)
user_phone
string,max(12)(format:000-000-000),required,unique
user_email
optional,string


Tabel:plants

Column_name
Constraints
plant_id
Primary_key,required
user_id
Foreign_key,required
plant_nickname
String,required,unique
plant_species
String,required
h2ofrequency
integer,required
plant_image
string,optional


