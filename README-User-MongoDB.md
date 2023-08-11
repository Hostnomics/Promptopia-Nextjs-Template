

## Create User in MongoDB Cluster [(1:47:13)](https://youtu.be/wm5gMKuwSYk?t=6433)
 
- 
    - Check Connection from `app/api/auth/[...nextauth]/route.js` 
    - Not getting console message confirming connection to MongoDB in `utils/databsae.js`
    - **ADD callbacks: {}** in `utils/database.js` to get the connection. 
        - Then sign out and sign back in. 
        - Received Confirmation in terminal that our connection was made: 
            - ![Console.log Connection success](https://imgur.com/JuBas89.png)
        - Then check the Cluster Collection, User Table:
            - ![User Created](https://imgur.com/zRS6OKF.png)
        

