"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../style/profile.module.css";

type SessionUser = {
  id: string;
  first_name?: string;
  username: string;
  email?: string;
};

type UserProfile = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  gender: string;
  birthdate: string;
  username: string;
  email: string;
  purok_street: string;
  barangay: string;
  city_municipality: string;
  province: string;
};

type ProfilePageProps = {
  user: SessionUser;
  onProfileUpdated?: (updated: Partial<SessionUser>) => void;
};

export default function ProfilePage({ user, onProfileUpdated }: ProfilePageProps) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [form, setForm] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/profile/${user.id}`);
            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.error || "Failed to load profile.");
            }

            const profileData: UserProfile = {
            id: data.user.id,
            first_name: data.user.first_name || "",
            middle_name: data.user.middle_name || "",
            last_name: data.user.last_name || "",
            suffix: data.user.suffix || "",
            gender: data.user.gender || "",
            birthdate: data.user.birthdate || "",
            username: data.user.username || user.username,
            email: data.user.email || user.email || "",
            purok_street: data.user.purok_street || "",
            barangay: data.user.barangay || "",
            city_municipality: data.user.city_municipality || "",
            province: data.user.province || "",
            };

            setProfile(profileData);
            setForm(profileData);
        } catch (error) {
            console.error(error);
            setMessage("Unable to load profile data.");
        } finally {
            setLoading(false);
        }
        };

        loadProfile();
    }, [user.id, user.username, user.email]);

    useEffect(() => {
        if (!message) return;

        const timeoutId = window.setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => window.clearTimeout(timeoutId);
    }, [message]);

    const handleChange = (field: keyof UserProfile, value: string) => {
        if (!form) return;
        setForm({ ...form, [field]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
        setMessage(null);
    };

    const handleCancel = () => {
        if (profile) {
        setForm(profile);
        }
        setIsEditing(false);
        setMessage(null);
    };

    const handleSave = async () => {
        if (!form) return;

        setSaving(true);
        setMessage(null);

        try {
        const response = await fetch(`http://localhost:5000/api/profile/${user.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            first_name: form.first_name,
            middle_name: form.middle_name,
            last_name: form.last_name,
            suffix: form.suffix,
            gender: form.gender,
            birthdate: form.birthdate,
            username: form.username,
            email: form.email,
            purok_street: form.purok_street,
            barangay: form.barangay,
            city_municipality: form.city_municipality,
            province: form.province,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to save profile.");
        }

        const updatedProfile: UserProfile = {
            id: data.user.id,
            first_name: data.user.first_name || "",
            middle_name: data.user.middle_name || "",
            last_name: data.user.last_name || "",
            suffix: data.user.suffix || "",
            gender: data.user.gender || "",
            birthdate: data.user.birthdate || "",
            username: data.user.username || "",
            email: data.user.email || "",
            purok_street: data.user.purok_street || "",
            barangay: data.user.barangay || "",
            city_municipality: data.user.city_municipality || "",
            province: data.user.province || "",
        };

        setProfile(updatedProfile);
        setForm(updatedProfile);
        setIsEditing(false);
        setMessage("Profile saved successfully.");

        if (onProfileUpdated) {
            onProfileUpdated({
            first_name: updatedProfile.first_name,
            username: updatedProfile.username,
            email: updatedProfile.email,
            });
        }
        } catch (error) {
        console.error(error);
        setMessage("Could not save profile. Please try again.");
        } finally {
        setSaving(false);
        }
    };

    if (loading || !form) {
        return (
            <section className={`wrapper ${styles.loadingWrapper}`}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={styles.loadingVideo}
                    >
                    <source src="/images/loading.mp4" type="video/mp4" />
                </video>
            </section>
        );
    }

    const inputClassName = (editable: boolean) =>
        `${styles.input} ${editable ? styles.inputEditable : styles.inputReadOnly}`;

    return (
        <section className="wrapper">
            <div className={styles.headerRow}>
                <div>
                    <h1 className={styles.pageTitle}>Account Profile</h1>
                    <p className={styles.subtitle}>Manage your personal details and account settings.</p>
                </div>
                <div className={styles.actionsRow}>
                    {isEditing ? (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className={`${styles.buttonBase} ${styles.cancelButton}`}
                    >
                        Cancel
                    </button>
                    ) : null}
                    <button
                        type="button"
                        onClick={isEditing ? handleSave : handleEdit}
                        disabled={isEditing && saving}
                        className={`${styles.buttonBase} ${styles.saveButton}`}
                        >
                        {isEditing ? (saving ? "Saving…" : "Save Profile") : "Edit Profile"}
                    </button>
                </div>
            </div>

            {message ? (
            <div className={styles.message}>
                {message}
            </div>
            ) : null}

            <div className={styles.mainGrid}>
                <div className={styles.leftColumn}>
                    <div className={`data-card ${styles.dataCard}`}>
                        <h2 className={styles.cardTitle}>Account Management</h2>
                        <div className={styles.profileContainer}>
                            <Image src="/images/8588131.jpg" alt="Profile picture" width={300} height={300} className={styles.profileImage} />
                        </div>
                        <button className={styles.uploadButton}>
                            Upload Profile Picture
                        </button>

                        <div className={styles.stackFields}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Username</label>
                                <input type="text" value={form.username} readOnly className={inputClassName(false)} />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Email Address</label>
                                <input type="email" value={form.email} readOnly className={inputClassName(false)} />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Contact Number</label>
                                <input type="text" value="N/A" readOnly className={inputClassName(false)}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={`data-card ${styles.dataCard}`}>
                        <h2 className={styles.cardTitle}>Personal Information</h2>
                        <div className={styles.formGrid}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={form.first_name}
                                    onChange={(event) => handleChange("first_name", event.target.value)}
                                    readOnly={!isEditing}
                                    className={inputClassName(isEditing)}
                                />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Middle Name</label>
                                <input
                                    type="text"
                                    name="middle_name"
                                    value={form.middle_name}
                                    onChange={(event) => handleChange("middle_name", event.target.value)}
                                    readOnly={!isEditing}
                                    className={inputClassName(isEditing)}
                                />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={form.last_name}
                                    onChange={(event) => handleChange("last_name", event.target.value)}
                                    readOnly={!isEditing}
                                    className={inputClassName(isEditing)}
                                />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Suffix</label>
                                <input
                                    type="text"
                                    name="suffix"
                                    value={form.suffix}
                                    onChange={(event) => handleChange("suffix", event.target.value)}
                                    readOnly={!isEditing}
                                    className={inputClassName(isEditing)}
                                />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Gender</label>
                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={(event) => handleChange("gender", event.target.value)}
                                    disabled={!isEditing}
                                    className={inputClassName(isEditing)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Birthday</label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    value={form.birthdate}
                                    onChange={(event) => handleChange("birthdate", event.target.value)}
                                    readOnly={!isEditing}
                                    className={inputClassName(isEditing)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`data-card ${styles.dataCard}`}>
                        <h2 className={styles.cardTitle}>Address Details</h2>
                        <div className={styles.formGrid}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Purok/Street</label>
                                <input
                                    type="text"
                                    name="purok_street"
                                    value={form.purok_street}
                                    onChange={(event) => handleChange("purok_street", event.target.value)}
                                    readOnly={!isEditing}
                                    className={inputClassName(isEditing)}
                                />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Barangay</label>
                                <input
                                    type="text"
                                    name="barangay"
                                    value={form.barangay}
                                    onChange={(event) => handleChange("barangay", event.target.value)}
                                    readOnly={!isEditing}
                                    className={inputClassName(isEditing)}
                                />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>City/Municipality</label>
                                <input
                                    type="text"
                                    name="city_municipality"
                                    value={form.city_municipality}
                                    onChange={(event) => handleChange("city_municipality", event.target.value)}
                                    readOnly={!isEditing}
                                    className={inputClassName(isEditing)}
                                />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Province</label>
                                <input
                                    type="text"
                                    name="province"
                                    value={form.province}
                                    onChange={(event) => handleChange("province", event.target.value)}
                                    readOnly={!isEditing}
                                    className={inputClassName(isEditing)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}