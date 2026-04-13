"use client";

import { useEffect, useState } from "react";
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
    const [isScrolled, setIsScrolled] = useState(false);
    const scrolledHome = activePage === "home";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 12);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const renderContent = () => {
        const isAuthenticated = Boolean(sessionUser);

        if (isAuthenticated && sessionUser) {
            switch (activePage) {
                case "dashboard":
                    return (
                        <DashboardPage
                            user={sessionUser}
                            onApplyLoan={() => setActivePage("loans")}
                            onPayLoan={() => setActivePage("pay-loan")}
                            onViewPayments={() => setActivePage("payments")}
                        />
                    );
                case "loans":
                    return <LoansPage />;
                case "payments":
                    return <PaymentsPage
                        onPayLoan={() => setActivePage("pay-loan")}
                    />
                case "notifications":
                    return <NotificationsPage />;
                case "profile":
                    return <ProfilePage user={sessionUser} />;
                case "settings":
                    return <SettingsPage />;
                case "pay-loan":
                    return <PayLoan />;
                default:
                    return <DashboardPage
                        user={sessionUser}
                        onApplyLoan={() => setActivePage("loans")}
                        onPayLoan={() => setActivePage("pay-loan")}
                        onViewPayments={() => setActivePage("payments")}
                    />;
            }
        }

        switch (activePage) {
            case "home":
                return <HomePage onApply={() => setActivePage("register")} />;
            case "register":
                return <RegisterPage onRegisterSuccess={() => setActivePage("login")} />;
            case "forgot":
                return <ForgotPage />;
            default:
                return (
                    <LoginPage
                        onForgotPassword={() => setActivePage("forgot")}
                        onRegister={() => setActivePage("register")}
                        onLoginSuccess={handleLoginSuccess}
                    />
                );
        }
    };

  const handleLoginSuccess = (user: SessionUser) => {
    setSessionUser(user);
    window.localStorage.setItem("sessionUser", JSON.stringify(user));
    setActivePage("dashboard");
  };

  const handleLogout = () => {
    setSessionUser(null);
    window.localStorage.removeItem("sessionUser");
    setActivePage("login");
  };

  return (
    <main>
        <header
            className={`${activePage === "home" ? "home-links" : ""} ${isScrolled ? "scrolledHome" : ""}`.trim()}
        >
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

        {renderContent()}
    </main>
  );
}
