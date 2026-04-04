import Image from "next/image";
import styles from "../style/login.module.css";
import { useState } from "react";

type LoginPageProps = {
  onForgotPassword: () => void;
  onRegister: () => void;
  onLoginSuccess: (user: {
    id: string;
    first_name?: string;
    username: string;
    email?: string;
  }) => void;
};

export default function LoginPage({ onForgotPassword, onRegister, onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameServerError, setUsernameServerError] = useState("");
  const [passwordServerError, setPasswordServerError] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const usernameValidation = () => {
    const value = username.trim();
    if (value == "") {
      return "Username is required.";
    }
    return "";
  };

  const passwordValidation = () => {
    const value = password.trim();
    if (value === "") {
      return "Password is required.";
    }
    return "";
  };

  const isLoginValid = () => {
    return usernameValidation() === "" && passwordValidation() === "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowErrors(true);

    if (!isLoginValid()) {
      return;
    }

    setIsSubmitting(true);
    setUsernameServerError("");
    setPasswordServerError("");
    setMessage(null);
    setMessageType(null);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const backendError = result?.error || "Login failed.";
        const errorField = result?.field;

        if (errorField === "username") {
          setUsernameServerError(backendError);
        } else if (errorField === "password") {
          setPasswordServerError(backendError);
        } else {
          setPasswordServerError(backendError);
        }

        return;
      }

      setMessage("Login successful! Redirecting to dashboard...");
      setMessageType("success");
      setTimeout(() => {
        onLoginSuccess(result.user);
      }, 900);
    } catch (error) {
      console.error(error);
      setMessage("An unexpected error occurred.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h1>Welcome back</h1>
            <h3>Please enter your details</h3>
            {message ? (
              <div className={`messagebox ${messageType === "success" ? "messagebox-success" : "messagebox-error"}`}>
                <p>{message}</p>
              </div>
            ) : null}
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameServerError("");
                }}
              />
              <p className="errorMessage">
                {showErrors ? usernameValidation() || usernameServerError : null}
              </p>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="passwordField">
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordServerError("");
                  }}
                  className="passwordInput"
                />
                <button
                  type="button"
                  className="passwordToggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
                    <circle cx="12" cy="12" r="3" />
                    {showPassword ? <line x1="4" y1="20" x2="20" y2="4" /> : null}
                  </svg>
                </button>
              </div>
              <p className="errorMessage">
                {showErrors ? passwordValidation() || passwordServerError : null}
              </p>
            </div>
            <div className={styles.details}>
              <a 
                href="#"
                className={styles.forgot} 
                onClick={(event) => {
                event.preventDefault();
                onForgotPassword();
              }}>
                Forgot password?
              </a>
              <span className={styles.register}>
                Don&apos;t have an account?
                <a 
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    onRegister();
                  }}
                >
                  Signup
                </a>
              </span>
            </div>
            <button type="submit">{isSubmitting ? "Logging in..." : "Login"}</button>
          </form>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/images/8588131.jpg" alt="Login Image" width={600} height={500} />
      </div>
    </section>
  );
}
