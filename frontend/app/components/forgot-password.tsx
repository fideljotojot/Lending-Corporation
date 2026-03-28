import Image from 'next/image';
import styles from '../style/forgot-pass.module.css';
import login from '../style/login.module.css';
import { useState } from 'react';

export default function ForgotPage() {
    const [email, setEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newpassword !== confirmpassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    newpassword,
                    confirmpassword,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Unable to reset password');
            }

            alert(data.message || 'Password updated successfully');
        } catch (error: any) {
            alert(error.message || 'Unable to reset password at this time');
        }
    };

    return (
        <main className={styles["wrapper"]}>
            <div className={styles["container"]}>
                <div>
                    <div className={login["contentHeader"]}>
                        <h1>Forgot Password</h1>
                        <h3>Please enter your details</h3>
                    </div>

                    <form className={login["form"]} onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email}
                                required 
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="new-password">New Password</label>
                            <input 
                                type="password"
                                id="new-password"
                                value={newpassword}
                                required
                                placeholder="Enter your new password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input 
                                type="password"
                                id="confirm-password"
                                value={confirmpassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
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