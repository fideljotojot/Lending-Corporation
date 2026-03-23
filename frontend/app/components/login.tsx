import Image from "next/image";
import styles from "../style/login.module.css";

export default function LoginPage() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h1>Welcome back</h1>
            <h3>Please enter your details</h3>
          </div>
          <form className={styles.form}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" required />
            </div>
            <div className="details">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#">Forgot password?</a>
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