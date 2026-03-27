import Image from 'next/image';
import styles from '../style/forgot-pass.module.css';
import login from '../style/login.module.css';


export default function ForgotPage() {
    return (
        <main className={styles["wrapper"]}>
            <div className={styles["container"]}>
                <div>
                    <div className={login["contentHeader"]}>
                        <h1>Forgot Password</h1>
                        <h3>Please enter your details</h3>
                    </div>

                    <form className={login["form"]}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                required 
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="new-password">New Password</label>
                            <input 
                                type="password"
                                id="new-password"
                                required
                                placeholder="Enter your new password"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input 
                                type="password"
                                id="confirm-password"
                                required
                                placeholder="Confirm your new password"
                            />
                        </div>

                        <button type="submit" className={login["submit"]} style={{marginTop: '.5em'}}>
                            Change Password
                        </button>
                    </form>
                </div>
            </div>

            <div className={styles["image-container"]}>
                <Image 
                    src="/images/coin.svg" 
                    alt="Forgot Password"
                    width={650}
                    height={600} 
                />
            </div>
        </main>
    )
}