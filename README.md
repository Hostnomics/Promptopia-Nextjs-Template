

- app folder components are server side rendering (19:29)
    - client side component with `use client`

- server vs client side - (21:21) https://youtu.be/wm5gMKuwSYk?t=1281


## Setup Next.js Project: (45th minute)

- Project starts at (45:28) - 
    - `npx create-next-app@latest ./`
        - TypeScript - no
        - ESLint - no
        - Tailwind CSS - yes
        - use src directory - no
        - use app - yes
        - default alias

    
## Project dependencies: 

1. bcrypt Mongo DB and Mongoose and Next Auth [(46:00)](https://youtu.be/wm5gMKuwSYk?t=2768)
    - `npm install bcrypt mongodb mongoose next-auth`
    - 


2. Download assets folder into `public` directory from: https://drive.google.com/file/d/15bGW9HBImu1p3HAYalnaj2Ig_Sn-1c-f/view?pli=1



## Fix the @ import issue with tailwind

```js
- wait compiling /_error (client and server)...
- error ./app/layout.jsx:1:0
Module not found: Can't resolve '@styles/global.css'
> 1 | import '@styles/global.css'
  2 |
  3 | export const metadata = {
  4 |     title: "Promptopia",

https://nextjs.org/docs/messages/module-not-found

```

In **jsconfig.json** remove the `/` from `paths`:

`"@/*": ["./*"]` means take it from the root route and take everything. 

```js
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

```




3. Providers set up Auth in Navbar at (1:10:10): https://youtu.be/wm5gMKuwSYk?t=4212



- When setting up toggle, don't set toggle state to !toggleDropDown

```js
    <div className="flex">
        <Image 
        src="/assets/images/profile-logo-1.png"
        width={37}
        height={37}
        alt="Profile"
        className="rounded-full"
        onClick={() => setToggleDropDown(!toggleDropDown)}
        />
    </div>
```

- **Instead, do this**: 

```js
//  onClick={() => setToggleDropDown(!toggleDropDown)}
    onClick={() => setToggleDropDown((prev) => !prev) }

```


## Setting up the Provier

4. Build out Provider.jsx [(1:15:59)](https://youtu.be/wm5gMKuwSYk?t=4559)

5. Wrap the layout in <Provider></Provider> tags just inside the body tags in `app/layout.jsx`

    - Layout.jsx imports Provider from `import Provider from '@components/Provider'`

6. (1:18:30) - set up `app/api/auth/[...nextauth]/route.js`

    - gotto https://console.cloud.google.com/
    - create new project, name and create. 
    - API and Services => OAuth consent screen
    - Click Create (Don't select internal or external)
    - Fill out info. Domain use: `http://localhost:3000`
    - **Credentials** => OAuth Client Id (_1:21:59_)
        - **Application Type** => Web Application
        - **Authorized JavaScript Origins** => `http://localhost:3000`
        -  **Authorized Redirect URIs** => `http://localhost:3000`
        - Select **CREATE** => (_process may take 5 mins or so_)
        - Copy the **clientId** and **clientSecret** to our **.env** file. 
            - Then call the **.env** variables to our **route.js** file (app/api/auth/[...nextauth]/route.js)

Import the **.env** file can be imported with `process.env.NAME`

```js
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

//Test by console logging an object with both (appear in VS Terminal until remove)
    console.log({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })

```

7. Set up cloud DB At [(1:28:05)](https://youtu.be/wm5gMKuwSYk?t=5285) set up 
[MongoDB Atlas DB](https://www.mongodb.com/atlas) at mongodb.com/atlas
- set up account (Degen@gmail - usual $).
- set up (free) M0 Cluster
    - Confirm user and password access to Cluster0
    - In **Network** add your current IP address
    - Click **"Add IP Address"** and select **"Anywhere"** which adds `0.0.0.0/0  (includes your current IP address)`
- **SET UP CONNECTION**
    - Click **Database**
    - Click **Connect** 
    - Click **Drivers** - (`1:29:17`)
    - Copy your **MongoDB URI**
    








---
---



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
