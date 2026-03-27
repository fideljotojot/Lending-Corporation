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
          <div className={styles["car-details"]}>
            <h3>Wanna have your dream car?</h3>
            <h4>We can help you with our <span>CAR LOAN</span>.</h4>
            <p>with as low as <span>X% interest</span>, you can now drive the car you really need.</p>
            <button className={styles["loans-button"]}>Apply now</button>
          </div>
          <Image
            src="/images/Car Loan Services.png"
            alt="Car Loan Image"
            className={`${styles["loans-image"]} ${styles["car"]}`}
            width={600}
            height={600}
          />
        </div>
        <div className={`${styles["loans"]} ${styles["business-card"]}`}>
          <Image
            src="/images/work.png"
            alt="Work Image"
            className={`${styles["loans-image"]} ${styles["business"]}`}
            width={600}
            height={400}
          />
          <div className={styles["loan-details"]}>
            <h3>Wanna expand your business?</h3>
            <h4>We can help you with our <span>BUSINESS LOAN</span>.</h4>
            <p>with as low as <span>X% interest</span>, you can now expand your <br /> business and earn more money than you used to.</p>
            <button className={styles["loans-button"]}>Apply now</button>
          </div>
        </div>
        <div className={`${styles["loans"]} ${styles["house-card"]}`}>
          <div className={styles["loan-details"]}>
            <h3>Wanna have a HOME that you can proudly call your own?</h3>
            <h4>We can help you with our <span>HOUSE LOAN</span>.</h4>
            <p>with as low as <span>X% interest</span>, you can now buy your <br /> own home that fits your needs.</p>
            <button className={styles["loans-button"]}>Apply now</button>
          </div>
          <Image
            src="/images/house_loan.png"
            alt="Work Image"
            className={`${styles["loans-image"]} ${styles["house"]}`}
            width={600}
            height={400}
          />
        </div>
      </div>

      <footer>
        <Image 
          src="/images/logo.png" 
          alt="Lending Corporation Logo" 
          width={100} 
          height={100} 
        />
        <p>Home Credit Philippines is regulated by the Bangko Sentral ng Pilipinas with contact number (+632) 8708-7087 and with email address consumeraffairs@bsp.gov.ph, and webchat at <a href="https://www.bsp.gov.ph/" target="_blank" rel="noopener noreferrer">www.bsp.gov.ph</a>.</p>
        <div className={styles["links-container"]}>
          <h1>Contact us</h1>
          <div className={styles["links"]}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/facebook.png"
                alt="Facebook"
                width={30}
                height={30}
              />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/instagram.png"
                alt="Instagram"
                width={30}
                height={30}
              />
            </a>
            <a href="https://www.gmail.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/email.png"
                alt="Email"
                width={30}
              height={30}
              />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}