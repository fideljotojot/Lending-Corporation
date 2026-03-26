"use client";

import { useState } from "react";
import Image from "next/image";
import HomePage from "./components/home";
import RegisterPage from "./components/register";
import LoginPage from "./components/login";
import ForgotPage from "./components/forgot-password";

type ActivePage = "home" | "login" | "register" | "forgot";

export default function Page() {
  const [activePage, setActivePage] = useState<ActivePage>("home");

  return (
    <main>
        <header className={activePage === "home" ? "home-links" : ""}>
            <div className="logo">
                <Image src="/images/logo.png" alt="Lending Corporation Logo" width={50} height={50} />
                <h1>Lending Corporation</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <a
                            className={activePage === "home" ? "active" : ""}
                            href="#"
                            aria-current={activePage === "home" ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                setActivePage("home");
                            }}
                        >
                            Home
                        </a>
                    </li>

                    <li>
                        <a 
                            className={activePage === "register" ? "active" : ""}
                            href="#"
                            aria-current={activePage === "register" ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                setActivePage("register");
                            }}
                        >
                            Register
                        </a>
                    </li>

                    <li>
                        <a
                            className={activePage === "login" ? "active" : ""}
                            href="#"
                            aria-current={activePage === "login" ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                setActivePage("login");
                            }}
                        >
                            Login
                        </a>
                    </li>
                </ul>
            </nav>
        </header>

        { activePage === "home" ? (
            <HomePage />
        ) : activePage === "register" ? (
            <RegisterPage />
        ) : activePage === "forgot" ? (
            <ForgotPage />
        ) : (
                <LoginPage
                    onForgotPassword={() => setActivePage("forgot")}
                    onRegister={() => setActivePage("register")}
                />
        )}
    </main>
  );
}
