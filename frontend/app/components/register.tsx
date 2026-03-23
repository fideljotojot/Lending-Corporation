import Image from "next/image";
import { Fragment, useState } from "react";
import style from "../style/register.module.css";

type RegisterPageNumber = 1 | 2;
export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  /* Address Details */
  const [purok, setPurok] = useState("");
  const [barangay, setBarangay] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [province, setProvince] = useState("");
  /* Compliance Documents */
  const [id, setId] = useState("");
  const [income, setIncome] = useState("");
  const [billing, setBilling] = useState("");

  const [pageNumber, setPageNumber] = useState<RegisterPageNumber>(1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: connect to backend register endpoint
    console.log({
      firstName,
      middleName,
      lastName,
      suffix,
      gender,
      birthdate,
      username,
      email,
      password,
      confirmPassword,
      purok,
      barangay,
      municipality,
      province,
      id,
      income,
      billing,
    });
  };

  return (
    <main className={style.wrapper}>
      <div className={style.imageContainer}>
        <Image src="/images/63119c6ae99fa66193cf213b.jpg" alt="Image" width={600} height={500} ></Image>
      </div>
      <div className={style.contentContainer}>
        <div className={style.contentHeader}>
          <h1>Create account</h1>
          <h3>Please enter your details</h3>
        </div>
        <form 
          className= {style.form}
          onSubmit={handleSubmit}
        >
          {pageNumber === 1 ? (
            <Fragment key="page-1">
              {/* Personal Details Contents */}
              <div className="formContainer">
                <div className={style.formHeader}>
                  <h2>Personal Details</h2>
                </div>
                <div className= {style.formContent}>
                  <div className="input-group">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                    </div>
                  <div className="input-group">
                    <label htmlFor="mname">Middle Name</label>
                    <input type="text" id="mname" value={middleName} onChange={(event) => setMiddleName(event.target.value)} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="lname">Last Name</label>
                      <input type="text" id="lname" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                    </div>
                  <div className="input-group">
                    <label htmlFor="suffix">Suffix</label>
                    <input type="text" id="suffix" value={suffix} onChange={(event) => setSuffix(event.target.value)} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      name="Gender"
                      id="gender"
                      value={gender}
                      onChange={(event) => setGender(event.target.value)}
                      className={gender === "" ? style.selectPlaceholder : ""}
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="birthdate">Birthdate</label>
                    <input
                      type="date"
                      id="birthdate"
                      value={birthdate}
                      onChange={(event) => setBirthdate(event.target.value)}
                      className={birthdate === "" ? style.datePlaceholder : style.dateValue}
                    />
                  </div>
                </div>
              </div>
              {/* Account Details */}
              <div className="formContainer">
                <div className={style.formHeader}>
                  <h2>Account Details</h2>
                </div>
                <div className={style.formContent}>
                  <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                  </div>
                </div>
              </div>
              <button
                type="button"
                style={{ width: "40%", alignSelf: "center", marginTop: "1em" }}
                onClick={() => setPageNumber(2)}
              >
                Next
              </button>
            </Fragment>
          ) : (/* page 2 */
            <Fragment key="page-2">
              {/* Address Details */}
              <div className="formContainer">
                <div className={style.formHeader}>
                  <h2>Address Details</h2>
                </div>
                <div className={style.formContent}>
                  <div className="input-group">
                    <label htmlFor="Purok">Purok/Street</label>
                    <input type="text" id="Purok" value={purok} onChange={(event) => setPurok(event.target.value)} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="Barangay">Barangay</label>
                    <input type="text" id="Barangay" value={barangay} onChange={(event) => setBarangay(event.target.value)} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="Municipality">City/Municipality</label>
                    <input type="text" id="Municipality" value={municipality} onChange={(event) => setMunicipality(event.target.value)} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="Province">Province</label>
                    <input type="text" id="Province" value={province} onChange={(event) => setProvince(event.target.value)} />
                  </div>
                </div>
              </div>

              <div className="formContainer">
                <div className={style.formHeader}>
                  <h2>Compliance Documents</h2>
                </div>
                <div className={style.formContent}>
                  <div className="input-group">
                    <label htmlFor="id">Valid ID</label>
                    <input type="file" id="id" onChange={(event) => setId(event.target.value)}/>
                  </div>
                  <div className="input-group">
                    <label htmlFor="income">Proof of Income</label>
                    <input type="file" id="income" onChange={(event) => setIncome(event.target.value)}/>
                  </div>
                  <div className="input-group">
                    <label htmlFor="billing">Proof of Billing</label>
                    <input type="file" id="billing" onChange={(event) => setBilling(event.target.value)}/>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1em", justifyContent: "center", marginTop: "1em" }}>
                <button type="button" style={{ width: "40%" }} onClick={() => setPageNumber(1)}>
                  Back
                </button>
                <button type="submit" style={{ width: "40%" }}>
                  Proceed
                </button>
              </div>
            </Fragment>
          )}
        </form>
      </div>

    </main>
  )
}