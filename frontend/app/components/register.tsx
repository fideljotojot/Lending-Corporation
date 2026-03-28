import Image from "next/image";
import { Fragment, useState } from "react";
import style from "../style/register.module.css";

type RegisterPageNumber = 1 | 2;

type RegisterPageProps = {
  onRegisterSuccess?: () => void;
};

export default function RegisterPage({ onRegisterSuccess }: RegisterPageProps) {
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
  /* Question and Answer Fields */
  const [question1, setQuestion1] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const [pageNumber, setPageNumber] = useState<RegisterPageNumber>(1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setSubmitMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          suffix,
          gender,
          birthdate,
          username,
          email,
          password,
          purok_street: purok,
          barangay,
          city_municipality: municipality,
          province,
          valid_id_file: id || null,
          proof_of_income_file: income || null,
          proof_of_billing_file: billing || null,
          security_question_1: question1,
          security_answer_1: answer1,
          security_question_2: question2,
          security_answer_2: answer2,
          security_question_3: question3,
          security_answer_3: answer3,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitMessage(result.error || "Registration failed.");
        return;
      }

      alert("Registration successful!");
      onRegisterSuccess?.();
      console.log(result);
    } catch (error) {
      console.error(error);
      setSubmitMessage("Could not connect to the backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const questions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What is the name of your favorite book?",
    "What city were you born in?",
    "What is your favorite food?",
    "What was the make and model of your first car?",
  ];

  const buildQuestionOptions = (otherSelectedQuestions: string[]) => {
    const options = [];
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const isSelectedInOtherField = otherSelectedQuestions.includes(question);
      options.push(
        <option key={question} value={question} disabled={isSelectedInOtherField}>
          {question}
        </option>
      );
    }
    return options;
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
          {submitMessage ? <p>{submitMessage}</p> : null}
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

              {/* Compliance Documents */}
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

              {/* Security Questions */}
              <div className="formContainer">
                <div className={style.formHeader}>
                  <h2>Security Questions</h2>
                </div>
                <div className={style.formContent}>
                  <div className="input-group">
                    <label htmlFor="Question1">Question 1</label>
                    <select
                      name="Question1"
                      id="Question1"
                      value={question1} 
                      onChange={(event) => setQuestion1(event.target.value)} 
                      className={question1 === "" ? style.selectPlaceholder : ""}
                    >
                      <option value="" disabled>Select a security question</option>
                      {buildQuestionOptions([question2, question3])}
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Answer1">Answer 1</label>
                    <input type="text" id="Answer1" value={answer1} onChange={(event) => setAnswer1(event.target.value)} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="Question2">Question 2</label>
                    <select
                      name="Question2"
                      id="Question2"
                      value={question2}
                      onChange={(event) => setQuestion2(event.target.value)}
                      className={question2 === "" ? style.selectPlaceholder : ""}
                    >
                      <option value="" disabled>Select a security question</option>
                      {buildQuestionOptions([question1, question3])}
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Answer2">Answer 2</label>
                    <input type="text" id="Answer2" value={answer2} onChange={(event) => setAnswer2(event.target.value)} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="Question3">Question 3</label>
                    <select
                      name="Question3"
                      id="Question3"
                      value={question3}
                      onChange={(event) => setQuestion3(event.target.value)}
                      className={question3 === "" ? style.selectPlaceholder : ""}
                    >
                      <option value="" disabled>Select a security question</option>
                      {buildQuestionOptions([question1, question2])}
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Answer3">Answer 3</label>
                    <input type="text" id="Answer3" value={answer3} onChange={(event) => setAnswer3(event.target.value)} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1em", justifyContent: "center", marginTop: "1em" }}>
                <button type="button" style={{ width: "40%" }} onClick={() => setPageNumber(1)}>
                  Back
                </button>
                <button type="submit" style={{ width: "40%" }}>
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </div>
            </Fragment>
          )}
        </form>
      </div>

    </main>
  )
}
