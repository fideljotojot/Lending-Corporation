"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
      <section style={{ padding: "7rem 1.5rem 2rem", minHeight: "100vh", backgroundColor: "#eef2f6" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", color: "#374151" }}>
          <p>Loading profile...</p>
        </div>
      </section>
    );
  }

  const labelStyle = {
    display: "block",
    marginBottom: "0.4rem",
    color: "#4b5563",
    fontSize: "0.9rem",
  } as const;

  const fieldStyle = (editable: boolean) => ({
    width: "100%",
    padding: "0.9rem 1rem",
    borderRadius: "0.85rem",
    border: "1px solid #d1d5db",
    backgroundColor: editable ? "#ffffff" : "#f8fafc",
    color: "#111827",
    fontSize: "0.95rem",
  }) as const;

  return (
    <section style={{ padding: "7rem 1.5rem 2rem", minHeight: "100vh", backgroundColor: "#eef2f6" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "2rem", color: "#111827", fontWeight: 700 }}>Account Profile</h1>
            <p style={{ margin: "0.5rem 0 0", color: "#6b7280" }}>Manage your personal details and account settings.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {isEditing ? (
              <button
                type="button"
                onClick={handleCancel}
                style={{ padding: "0.9rem 1.4rem", border: "1px solid #d1d5db", borderRadius: "9999px", backgroundColor: "#ffffff", color: "#374151", cursor: "pointer" }}
              >
                Cancel
              </button>
            ) : null}
            <button
              type="button"
              onClick={isEditing ? handleSave : handleEdit}
              disabled={isEditing && saving}
              style={{
                padding: "0.9rem 1.6rem",
                border: "none",
                borderRadius: "9999px",
                backgroundColor: "#2563eb",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                opacity: isEditing && saving ? 0.7 : 1,
              }}
            >
              {isEditing ? (saving ? "Saving…" : "Save Profile") : "Edit Profile"}
            </button>
          </div>
        </div>

        {message ? (
          <div style={{ marginBottom: "1rem", padding: "1rem 1.25rem", borderRadius: "1rem", backgroundColor: "#e0f2fe", color: "#0369a1" }}>
            {message}
          </div>
        ) : null}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "1.5rem" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)" }}>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#111827" }}>Account Management</h2>

            <div style={{ marginTop: "1.5rem", borderRadius: "24px", overflow: "hidden", backgroundColor: "#f8fafc" }}>
              <Image src="/images/8588131.jpg" alt="Profile picture" width={720} height={720} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>

            <button style={{ width: "100%", marginTop: "1rem", padding: "0.9rem", border: "none", borderRadius: "0.85rem", backgroundColor: "#1d4ed8", color: "#fff", cursor: "pointer", fontWeight: 700 }}>
              Upload Profile Picture
            </button>

            <div style={{ marginTop: "1.5rem", display: "grid", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Username</label>
                <input type="text" value={form.username} readOnly style={fieldStyle(false)} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" value={form.email} readOnly style={fieldStyle(false)} />
              </div>
              <div>
                <label style={labelStyle}>Contact Number</label>
                <input type="text" value="N/A" readOnly style={fieldStyle(false)} placeholder="Optional" />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            <div style={{ backgroundColor: "#fff", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)" }}>
              <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#111827" }}>Personal Information</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={(event) => handleChange("first_name", event.target.value)}
                    readOnly={!isEditing}
                    style={fieldStyle(isEditing)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Middle Name</label>
                  <input
                    type="text"
                    name="middle_name"
                    value={form.middle_name}
                    onChange={(event) => handleChange("middle_name", event.target.value)}
                    readOnly={!isEditing}
                    style={fieldStyle(isEditing)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={(event) => handleChange("last_name", event.target.value)}
                    readOnly={!isEditing}
                    style={fieldStyle(isEditing)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Suffix</label>
                  <input
                    type="text"
                    name="suffix"
                    value={form.suffix}
                    onChange={(event) => handleChange("suffix", event.target.value)}
                    readOnly={!isEditing}
                    placeholder="Optional"
                    style={fieldStyle(isEditing)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={form.gender}
                    onChange={(event) => handleChange("gender", event.target.value)}
                    readOnly={!isEditing}
                    style={fieldStyle(isEditing)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Birthday</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={form.birthdate}
                    onChange={(event) => handleChange("birthdate", event.target.value)}
                    readOnly={!isEditing}
                    style={fieldStyle(isEditing)}
                  />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: "#fff", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)" }}>
              <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#111827" }}>Address Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>Purok/Street</label>
                  <input
                    type="text"
                    name="purok_street"
                    value={form.purok_street}
                    onChange={(event) => handleChange("purok_street", event.target.value)}
                    readOnly={!isEditing}
                    style={fieldStyle(isEditing)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Barangay</label>
                  <input
                    type="text"
                    name="barangay"
                    value={form.barangay}
                    onChange={(event) => handleChange("barangay", event.target.value)}
                    readOnly={!isEditing}
                    style={fieldStyle(isEditing)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>City/Municipality</label>
                  <input
                    type="text"
                    name="city_municipality"
                    value={form.city_municipality}
                    onChange={(event) => handleChange("city_municipality", event.target.value)}
                    readOnly={!isEditing}
                    style={fieldStyle(isEditing)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Province</label>
                  <input
                    type="text"
                    name="province"
                    value={form.province}
                    onChange={(event) => handleChange("province", event.target.value)}
                    readOnly={!isEditing}
                    style={fieldStyle(isEditing)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
