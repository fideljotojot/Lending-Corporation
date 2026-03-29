"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HomePage from "./components/home";
import RegisterPage from "./components/register";
import LoginPage from "./components/login";
import ForgotPage from "./components/forgot-password";
import DashboardPage from "./components/pages/dashboard";

type ActivePage = "home" | "login" | "register" | "forgot" | "dashboard";
type SessionUser = {
  id: string;
  first_name?: string;
  username: string;
  email?: string;
};

export default function Page() {
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const savedUser = window.localStorage.getItem("sessionUser");

    if (!savedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser) as SessionUser;
      setSessionUser(parsedUser);
      setActivePage("dashboard");
    } catch (error) {
      console.error(error);
      window.localStorage.removeItem("sessionUser");
    }
  }, []);

  const handleLoginSuccess = (user: SessionUser) => {
    setSessionUser(user);
    window.localStorage.setItem("sessionUser", JSON.stringify(user));
    alert("Login successful!");
    setActivePage("dashboard");
  };

  const handleLogout = () => {
    setSessionUser(null);
    window.localStorage.removeItem("sessionUser");
    setActivePage("login");
  };

  return (
    <main>
        <header className={activePage === "home" ? "home-links" : ""}>
            <div className="logo">
                <Image src="/images/logo.png" alt="Lending Corporation Logo" width={50} height={50} />
                <h1>Lending Corporation</h1>
            </div>
            <nav>
                <ul>
                    {sessionUser ? (
                        <>
                            <li>
                                <a
                                    className={activePage === "dashboard" ? "active" : ""}
                                    href="#"
                                    aria-current={activePage === "dashboard" ? "page" : undefined}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActivePage("dashboard");
                                    }}
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleLogout();
                                    }}
                                >
                                    Logout
                                </a>
                            </li>
                        </>
                    ) : (
                        <>
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
                            className={activePage === "login" || activePage === "forgot" ? "active" : ""}
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
                        </>
                    )}
                </ul>
            </nav>
        </header>

        { activePage === "dashboard" && sessionUser ? (
            <DashboardPage user={sessionUser} onLogout={handleLogout} />
        ) : activePage === "home" ? (
            <HomePage />
        { activePage === "home" ? (
            <HomePage onApply={() => setActivePage("register")} />
        ) : activePage === "register" ? (
            <RegisterPage onRegisterSuccess={() => setActivePage("login")} />
        ) : activePage === "forgot" ? (
            <ForgotPage />
        ) : (
                <LoginPage
                    onForgotPassword={() => setActivePage("forgot")}
                    onRegister={() => setActivePage("register")}
                    onLoginSuccess={handleLoginSuccess}
                />
        )}
    </main>
  );
}
