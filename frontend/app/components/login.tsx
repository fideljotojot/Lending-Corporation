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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
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
        setMessage(result.error || "Login failed.");
        setMessageType("error");
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
