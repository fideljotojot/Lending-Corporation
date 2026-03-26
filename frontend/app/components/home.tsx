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
        <div className={styles["heading"]}>
          <div className={styles["heading-text"]}>
            <h1>Wanna have the future you want but <span>MONEY</span> is the issue?</h1>
            <p>We are here to help you achieve those <span>DREAMS</span>.</p>
          </div>
          <Image
            src="/images/future_screen.png"
            alt="Future Image"
            className={styles["heading-image"]}
            width={600}
            height={600}
          />
        </div>
        <div className={styles["loans"]}>
          <h3>Wanna have your dream car?</h3>
          <h4>We can help you with our <span>CAR LOAN</span>.</h4>
          <p>with as low as <span>X% interest</span>, you can now drive the car you really need.</p>
        </div>
      </div>
    </main>
  )
}