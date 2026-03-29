"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HomePage from "./components/home";
import RegisterPage from "./components/register";
import LoginPage from "./components/login";
import ForgotPage from "./components/forgot-password";
import DashboardPage from "./components/pages/dashboard";
import ProfilePage from "./components/pages/profile";

type ActivePage = "home" | "login" | "register" | "forgot" | "dashboard" | "loans" | "payments" | "notifications" | "profile" | "settings";
type SessionUser = {
  id: string;
  first_name?: string;
  username: string;
  email?: string;
};

function PagePlaceholder({ title }: { title: string }) {
    return (
        <section style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{title}</h1>
            <p style={{ color: "#4b5563" }}>This section is under construction. The content will be added soon.</p>
        </section>
    );
}

export default function Page() {
    const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
    const [activePage, setActivePage] = useState<ActivePage>("home");

    useEffect(() => {
        const savedUser = window.localStorage.getItem("sessionUser");

        if (!savedUser) {
            return;
        }

        try {
            const parsed = JSON.parse(savedUser) as SessionUser;
            setSessionUser(parsed);
            setActivePage("dashboard");
        } catch (error) {
            console.error("Failed to parse sessionUser", error);
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
                                    className={activePage === "loans" ? "active" : ""}
                                    href="#"
                                    aria-current={activePage === "loans" ? "page" : undefined}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActivePage("loans");
                                    }}
                                >
                                    Loans
                                </a>
                            </li>
                            <li>
                                <a
                                    className={activePage === "payments" ? "active" : ""}
                                    href="#"
                                    aria-current={activePage === "payments" ? "page" : undefined}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActivePage("payments");
                                    }}
                                >
                                    Payments
                                </a>
                            </li>
                            <li>
                                <a
                                    className={activePage === "notifications" ? "active" : ""}
                                    href="#"
                                    aria-current={activePage === "notifications" ? "page" : undefined}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActivePage("notifications");
                                    }}
                                >
                                    Notifications
                                </a>
                            </li>
                            <li>
                                <a
                                    className={activePage === "profile" ? "active" : ""}
                                    href="#"
                                    aria-current={activePage === "profile" ? "page" : undefined}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActivePage("profile");
                                    }}
                                >
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    className={activePage === "settings" ? "active" : ""}
                                    href="#"
                                    aria-current={activePage === "settings" ? "page" : undefined}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActivePage("settings");
                                    }}
                                >
                                    Settings
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

        { sessionUser ? (
            activePage === "dashboard" ? (
                <DashboardPage user={sessionUser} onLogout={handleLogout} />
            ) : activePage === "loans" ? (
                <PagePlaceholder title="Loans" />
            ) : activePage === "payments" ? (
                <PagePlaceholder title="Payments" />
            ) : activePage === "notifications" ? (
                <PagePlaceholder title="Notifications" />
            ) : activePage === "profile" ? (
                <ProfilePage user={sessionUser} />
            ) : activePage === "settings" ? (
                <PagePlaceholder title="Settings" />
            ) : (
                <DashboardPage user={sessionUser} onLogout={handleLogout} />
            )
        ) : activePage === "home" ? (
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
