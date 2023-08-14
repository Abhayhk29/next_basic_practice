"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';


export const Nav = () => {
    const isUserLoggedIn = false;
    const {data:session} = useSession();

    const [providers, setProviders] = useState(null);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const seUptProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        seUptProviders();
    },[])
  return (
    <nav className="flex-between w- pt-3 mb-16">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src={session?.user.image}
                alt="Abhay Pandey"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text">Promptopia</p>
        </Link>

        {/* {mobile } */}
        <div className="sm:flex hidden">
            { session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        Create Prompt
                    </Link>
                    <button className="outline_btn" onClick={signOut}>Sign Out</button>

                    <Link href="/profile">
                        <Image 
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                        >

                        </Image>
                    </Link>
                </div>
            ): (
                <>
                    {
                        providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign In

                            </button>
                        ))
                    }
                </>
            )}
        </div>    
        {/* </div>mobile navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image 
                            src="/assets/images/logo.svg"
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => { setToggle((prev) => !prev)}}
                        >
                        </Image>
                        {toggle && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggle(false)}
                                >
                                 MyProfile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggle(false)}
                                >
                                 Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                      setToggle(false);
                                      signOut(); 
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                </div>
            ) : (
                <>
                {
                    providers && Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="black_btn"
                        >
                            Sign In

                        </button>
                    ))
                }
            </>
            )}
        </div>


    </nav>
  )
}
