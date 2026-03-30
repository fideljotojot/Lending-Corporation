"use client";

import { useState } from "react";
import Image from "next/image";
import HomePage from "./components/home";
import RegisterPage from "./components/register";
import LoginPage from "./components/login";
import ForgotPage from "./components/forgot-password";
import DashboardPage from "./components/pages/dashboard";
import LoansPage from "./components/pages/loans";
import PaymentsPage from "./components/pages/payments";
import NotificationsPage from "./components/pages/notifications";
import ProfilePage from "./components/pages/profile";
import SettingsPage from "./components/pages/settings";
import PayLoan from "./components/pages/pay-loan";

type ActivePage = "home" | "login" | "register" | "forgot" | "dashboard" | "loans" | "payments" | "notifications" | "profile" | "settings" | "pay-loan";
type SessionUser = {
  id: string;
  first_name?: string;
  username: string;
  email?: string;
};

function getStoredSessionUser(): SessionUser | null {
    if (typeof window === "undefined") {
        return null;
    }

    const savedUser = window.localStorage.getItem("sessionUser");

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser) as SessionUser;
    } catch (error) {
        console.error(error);
        window.localStorage.removeItem("sessionUser");
        return null;
    }
}

export default function Page() {
    const [sessionUser, setSessionUser] = useState<SessionUser | null>(() => getStoredSessionUser());
    const [activePage, setActivePage] = useState<ActivePage>(() =>
        getStoredSessionUser() ? "dashboard" : "home"
    );

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
                                <a href="#"
                                    className={activePage === "loans" ? "active" : ""}
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
                                <a href="#"
                                    className={activePage === "payments" || activePage === "pay-loan" ? "active" : ""}
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
                                <a href="#"
                                    className={activePage === "notifications" ? "active" : ""}
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
                                <a href="#"
                                    className={activePage === "profile" ? "active" : ""}
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
                                <a href="#"
                                    className={activePage === "settings" ? "active" : ""}
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

        { activePage === "dashboard" && sessionUser ? (
            <DashboardPage
                user={sessionUser}
                onApplyLoan={() => setActivePage("loans")}
                onPayLoan={() => setActivePage("pay-loan")}
                onViewPayments={() => setActivePage("payments")}
            />
        ) : activePage === "loans" && sessionUser ? (
            <LoansPage />
        ) : activePage === "payments" && sessionUser ? (
            <PaymentsPage />
        ) : activePage === "notifications" && sessionUser ? (
            <NotificationsPage />
        ) : activePage === "profile" && sessionUser ? (
            <ProfilePage />
        ) : activePage === "settings" && sessionUser ? (
            <SettingsPage />
        ) : activePage === "pay-loan" && sessionUser ? (
            <PayLoan />
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
