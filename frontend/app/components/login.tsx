import Image from "next/image";
import styles from "../style/login.module.css";
import { useState } from "react";

type LoginPageProps = {
  onForgotPassword: () => void;
  onRegister: () => void;
};

export default function LoginPage({ onForgotPassword, onRegister }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };


  return (
    <section className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h1>Welcome back</h1>
            <h3>Please enter your details</h3>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                required 
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/images/8588131.jpg" alt="Login Image" width={600} height={500} />
      </div>
    </section>
  );
}