

## User Authentication

1. Starts around [(1:16:00-ish)](https://youtu.be/wm5gMKuwSYk?t=4560)

2. Google Connection
    - Starts around [(1:20:40)](https://youtu.be/wm5gMKuwSYk?t=4840)
    - Visit [console.cloud.google.com](https://console.cloud.google.com/)
        - Click **Create New Project**
            - Name (_promptopia_) (_no organization_)
        - From Navigation Menu => [**APIs & Services** => **OAuth Consent Screen**](https://console.cloud.google.com/apis/credentials/consent)
        - Click **Create**
        - Enter **App Information**
            - (1) App Name, (2) Email, (3) **Authorized Domain:** `http://localhost:3000`, (4) _Developer_ Email (can be the same).

            - <img src="https://i.imgur.com/DSHsnEr.png" alt="Google OAuth Register App" width="800"/>
                
                - source: [stack on markdown image styling(without style attribute which github doesn't support)](https://stackoverflow.com/questions/14675913/changing-image-size-in-markdown)

        - Then go to **Credentials**
            - Click **Create Credentials** 
            - Click **OAuth Client ID**
            - Select **Application Type** as **Web Application**
            - Add the **Authorized JavaScript Origins** as `http://localhost:3000`
            - Add the **Authorized Redirect URI** as `http://localhost:3000`
                - <img src="https://i.imgur.com/kJ2NkiK.png" alt="Google OAuth Register App" width="600"/>
            - Click **Create**. (_process may take up to 5 mins_)
            - Copy the **Client ID** and **Client Secret** to your project's `.env`
            - <img src="https://i.imgur.com/qfah3xn.png" alt="Google OAuth Register App" />

        - In `.env` add (_without quotes_)
            - GOOGLE_ID=
            - GOOGLE_CLIENT_SECRET=

        - Restart local dev server. 
    - Then in `app/api/auth/[...nextauth]/route.js` add the clientId and clientSecret as such: 

    ```js
    
    providers: [
        GoogleProvider({
            //options object
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
    
    ```
    

    ## signIn user (app/api/auth/[...nextauth]/route.js) at [(1:24:45)](https://youtu.be/wm5gMKuwSYk?t=5085)

    1. Build out signIn function in [...nextauth]/route.js

    2. Create `utils/database.js` at [(1:25:28)](https://youtu.be/wm5gMKuwSYk?t=5128)

    
    ## MongoDB Atlas - online cloud storage starts at [(1:28:00)](https://youtu.be/wm5gMKuwSYk?t=5280)

    1. Create the free Cluster. 


    ## Create models/user.js schema to store the user data if it doesn't already exist [(1:31:20)](https://youtu.be/wm5gMKuwSYk?t=5480)

    1. See `models/user.js`. 
        - Further explanation of models checking for existing user at (1:33:59)


    ## Check [Next Auth Docs on Authentication](https://next-auth.js.org/getting-started/example) at (1:37:17)


## Three Variables Added to .env (1) NEXTAUTH_URL, (2) NEXTAUTH_URL_INTERAL and (3) NEXTAUTH_SECRET at [(1:38:05)](https://youtu.be/wm5gMKuwSYk?t=5885)

- 

    - use `http://localhost:3000` as NEXTAUTH_URL and NEXTAUTH_URL_INTERNAL
    - For **NEXTAUTH_SECRET** use 
        - macOS - `openssl rand -base64 32`
        - windows - visit [cryptool.org/en/cto/openssl](https://www.cryptool.org/en/cto/openssl) and repeat command `openssl rand -base64 32`
            - _provides random string for our secret such as_ **8w4RbefNqwefRAh724vEcRf+98KSFcQ582MI3o4gYxE=**

    

# TEST OUT AUTHENTICATION WITH GOOGLE => MONGODB [(1:39:16)](https://youtu.be/wm5gMKuwSYk?t=5956)
-    
    - Kill current local server. Restart local server (`npm run dev`)
    - Update the Next config file with the [next.config.js from the project repository](https://github.com/adrianhajdin/project_next_13_ai_prompt_sharing/blob/main/next.config.js)
    - 

    - Run local server, attempt to log in (1:40:35): https://youtu.be/wm5gMKuwSYk?t=6035
    - At [(1:40:59)](https://youtu.be/wm5gMKuwSYk?t=6059) go to `components/Nav.jsx` and change **const isUserLoggedIn = true** to check for a user session `{session?user ? ():()}`
        - Via Next Auth Hook (**useSession**) we can set `isUserLoggedIn` to current session.

        ```js
        // Rename useSession to session
        const {data: session } = useSession()

        // Test session in JSX with {alert(session?.user)}

        {session?.user ? ( 
            //code if user session
        ) : (
            //else code
        )}
        ```

    - Check his **useEffect() in Nav.jsx** at [(1:43:12)](https://youtu.be/wm5gMKuwSYk?t=6192)


## NextAuth.js APi Call to Providers at [(1:44:02)](https://youtu.be/wm5gMKuwSYk?t=6242)
- 
    - See the [Next Auth Docs on API calls To Providers](https://next-auth.js.org/getting-started/rest-api#getpost-apiauthcallbackprovider)

    - Go back to [console.cloud.google.com](https://console.cloud.google.com/) and add provider to the **Callback in Google Cloud Console**.

    - In **APIs & Services** => **Credentials** => **OAuth 2.0 Client IDs**
        - Click on (_our default name?_) `Web Client 1`.
        - Click **ADD URI** and add `/api/auth/callback/google` with the named provider to base URL of localhost:3000. 

        - ![https://i.imgur.com/rtSDgz2.png](https://i.imgur.com/rtSDgz2.png)


## Set up Feed.jsx and PromptCard.jsx to fetch and display Prompts [(2:13:40)](https://youtu.be/wm5gMKuwSYk?t=8020)
-  
    - Build out **GET Request** in Feed.jsx Component at [(2:13:49)](https://youtu.be/wm5gMKuwSYk?t=8029)
    - 
    ```js
        import PromptCard from './PromptCard';

        <div className="mt-16 prompt_layout">
            {/* Map over the data and view the prompts (2:18:13 => 2:19:57) */}
            {data.map((post) => (
                <PromptCard 
                    key={post.id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
      </div>
    ```
    - 

    - Build out the `fetch('api/prompt')` route we created in the Feed.jsx component at: 
        - `app/api/prompt/route.js`  (2:20:38)
    
    - **PromptCard.jsx** Build out at [(2:22:14)](https://youtu.be/wm5gMKuwSYk?t=8534)
        - Display the prompt we fetch from the MongoDB Cluster in PromptCard.jsx component.
        - 

