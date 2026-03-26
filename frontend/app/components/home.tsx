import Image from "next/image";
import styles from "../style/home.module.css";

export default function HomePage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles["top-left-container"]}>
          <h1>Empowering Your Next Big Move.</h1>
          <p>Smart capital solutions built for your goals.</p>
          <button className={styles["apply-button"]}>Apply now</button>
        </div>
        <div className={styles["top-right-container"]}>
          <Image 
            src="/images/empower.png" 
            alt="Home Image" 
            width={500} 
            height={500} 
          />
        </div>
      </div>

        <div className={styles["details"]}>
          <p>Learn more about our services and how we can help you achieve your financial goals.</p>
        </div>
    </main>
  )
}