//Built out at (~59:30): https://youtu.be/wm5gMKuwSYk?t=3570

'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';



const Nav = () => {


  const isUserLoggedIn = true;
//(1:07:40): Start setting up getProviders. (https://youtu.be/wm5gMKuwSYk?t=4060)
  const [providers, setProviders] = useState(null);

  useEffect(() => {
      const setProviders = async () => {
        const response = await getProviders();

        setProviders(response);
      }

      setProviders();
  }, [])

  return (

    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
          <Image 
            src="/assets/images/logo.svg" 
            width={30}
            height={30}
            alt="Promptopia Logo"
            className="object-contain"
          />

          <p className="logo_text">Promptopia</p>
        </Link>


  {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {isUserLoggedIn ? (
              <div className="flex gap-3 md:gap-5">
                  <Link href="/create-prompt" className="black_btn">
                    Create Post
                  </Link>

                  <button type="button" onClick={signOut} className="outline_btn">
                    Sign Out
                  </button>

                  <Link href="/profile">
                      <Image 
                        src="/assets/images/profile-logo-1.png"
                        width={37}
                        height={37}
                        alt="Profile"
                        className="rounded-full"
                      />
                  </Link>

              </div>
            ) : (
              <>
                    {providers && 
                        Object.values(providers).map((providers) => (
                          <button
                            type="button"
                            key={providers.name}
                            onClick={() => signIn(provider.id)}
                            className="black_btn"
                          >
                              Sign In
                          </button>
                      ))}
                    
              </>
            )}
        </div>

    </nav>



  )
}

export default Nav