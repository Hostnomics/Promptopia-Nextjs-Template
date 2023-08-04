import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts"
}
 

//(52:51) - Getting children through props: 
const RootLayout = ({children}) => {
  return (

        <html lang="en">
            <body>
                {/* (1:17:11) wrap everything within our body with our Provider component (just came from utils/database.js) */}
                    <Provider>
                        <div className="main">
                            <div className="gradient" />
                        </div>

                        <main className="app">
                            <Nav />
                                {children}
                        </main>
                    </Provider>
            </body>
        </html>

  )
}

export default RootLayout