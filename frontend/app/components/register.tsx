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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const [pageNumber, setPageNumber] = useState<RegisterPageNumber>(1);
  const [showPage1Errors, setShowPage1Errors] = useState(false);
  const [showPage2Errors, setShowPage2Errors] = useState(false);

  const suffixOptions = ["Jr.", "Sr.", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  /* regex for validation */
  const capitalCheck = (value: string) => 
    value.length != 0 && !/^[A-Z][a-z]*(?:[\s'-][A-Z][a-z]*)*$/.test(value);
  const multipleUppercase = (value: string) => 
    /(?:^|[\s'-])[A-Z][a-z]*[A-Z][A-Za-z]*/.test(value);
  const hasConsecutiveLetters = (value: string) => 
    /([A-Za-z])\1{2,}/i.test(value);
  const invalidInput = (value: string) => 
    !/^[A-Za-z][A-Za-z\s'-]*$/.test(value)
  const tooLong = (value: string) => value.length > 20
  const tooShort = (value: string) => value.length <= 1

  /* Error messages */
  const capitalizationErrorMessage = "First letter of each word not capitalized."
  const multipleUppercaseErrorMessage = "has multiple uppercased letters in a word."
  const consecutiveLettersErrorMessage = "has three or more consecutive identical letters."

  /* For first name validation */
  const firstNameValidation = () => {
    const value = firstName.trim();
    if (value == "") {
      return "First name is required.";
    }
    if (tooShort(value)) {
      return "First name is too short."
    }
    if (tooLong(value)) {
      return "First name is too long."
    }
    if (invalidInput(value)) {
      return "First name has invalid characters."
    }
    if (multipleUppercase(value)) {
      return "First name " + multipleUppercaseErrorMessage
    }
    if (hasConsecutiveLetters(value)) {
      return "First name " + consecutiveLettersErrorMessage
    }
    if (capitalCheck(value)) {
      return capitalizationErrorMessage
    }
    return "";
  }

  /* Middle name validation */
  const middleNameValidation = () => {
    const value = middleName.trim();
    if (value == "") {
      return "";
    }
    if (value.length == 1) {
      return "Middle name is too short."
    }
    if (tooLong(value)) {
      return "Middle name is too long."
    }
    if (invalidInput(value)) {
      return "Middle name has invalid characters."
    }
    if (multipleUppercase(value)) {
      return "Middle name " + multipleUppercaseErrorMessage
    }
    if (hasConsecutiveLetters(value)) {
      return "Middle name " + consecutiveLettersErrorMessage
    }
    if (capitalCheck(value)) {
      return capitalizationErrorMessage
    }
    return "";
  }

  /* Last name validation */
  const lastNameValidation = () => {
    const value = lastName.trim()
    if (value == "") {
      return "Last name is required."
    }
    if (tooShort(value)) {
      return "Last name is too short."
    }
    if (tooLong(value)) {
      return "Last name is too long."
    }
    if (invalidInput(value)) {
      return "Last name has invalid characters."
    }
    if (multipleUppercase(value)) {
      return "Last name " + multipleUppercaseErrorMessage
    }
    if (hasConsecutiveLetters(value)) {
      return "Last name " + consecutiveLettersErrorMessage
    }
    if (capitalCheck(value)) {
      return capitalizationErrorMessage
    }
    return "";
  }

  const genderValidation = () => {
    if (gender.trim() === "") {
      return "Gender is required."
    }
    return "";
  }

  const birthdayValidation = () => {
    if (birthdate.trim() === "") {
      return "Birthdate is required.";
    }
    
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18) {
      return "You must be at least 18 years old.";
    }
    
    return "";
  }

  const usernameValidation = () => {
    const value = username.trim()
    if (value == "") {
      return "Username is required."
    }
    if (value.length < 8) {
      return "Username is too short/"
    }
    if (value.length > 20) {
      return "Username is too long"
    }
    return "";
  }

  const emailValidation = () => {
    const value = email.trim()
    if (value === "") {
      return "Email is required."
    }

    if (value.length > 254) {
      return "Email is too long."
    }

    if (/\s/.test(value)) {
      return "Email must not contain spaces."
    }

    const parts = value.split("@");
    if (parts.length !== 2) {
      return "Email must contain exactly one @ symbol."
    }

    const [localPart, domainPart] = parts;

    if (!localPart || !domainPart) {
      return "Email must include both local and domain parts."
    }

    if (localPart.length > 64) {
      return "Email local part is too long."
    }

    if (localPart.startsWith(".") || localPart.endsWith(".")) {
      return "Email local part cannot start or end with a dot."
    }

    if (value.includes("..")) {
      return "Email cannot contain consecutive dots."
    }

    if (!/^[A-Za-z0-9._%+-]+$/.test(localPart)) {
      return "Email local part contains invalid characters."
    }

    if (domainPart.startsWith(".") || domainPart.endsWith(".")) {
      return "Email domain cannot start or end with a dot."
    }

    if (!domainPart.includes(".")) {
      return "Email domain must include a valid top-level domain."
    }

    const domainLabels = domainPart.split(".");
    for (let i = 0; i < domainLabels.length; i++) {
      const label = domainLabels[i];

      if (label === "") {
        return "Email domain contains an empty label."
      }

      if (label.length > 63) {
        return "Email domain label is too long."
      }

      if (label.startsWith("-") || label.endsWith("-")) {
        return "Email domain labels cannot start or end with a hyphen."
      }

      if (!/^[A-Za-z0-9-]+$/.test(label)) {
        return "Email domain contains invalid characters."
      }
    }

    const tld = domainLabels[domainLabels.length - 1];
    if (!/^[A-Za-z]{2,}$/.test(tld)) {
      return "Email top-level domain is invalid."
    }

    return ""
  }

  const passwordValidation = () => {
    const value = password.trim()
    if (value === "") {
      return "Password is required."
    }
    if (/^.{1,7}$/.test(value)) {
      return "Password is too weak."
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$/.test(value)) {
      return "Password is not strong enough."
    }
    return ""
  }

  /* Confirm password validation */
  const confirmPasswordValidation = () => {
    const value = confirmPassword.trim()
    if (value === "") {
      return "Confirm Password is required."
    }
    if (value != password.trim()) {
      return "Password not matched. Try again."
    }
    return "";
  }

  /* For page 1 validation */
  const isPage1Valid = () => {
    return (
      firstNameValidation() === "" &&
      middleNameValidation() === "" &&
      lastNameValidation() === "" &&
      genderValidation() === "" &&
      birthdayValidation() === "" &&
      usernameValidation() === "" &&
      emailValidation() === "" &&
      passwordValidation() === "" &&
      confirmPasswordValidation() === ""
    );
  };

  const requiredTextValidation = (value: string, fieldName: string) => {
    if (value.trim() === "") {
      return `${fieldName} is required.`
    }
    return "";
  }

  const purokValidation = () => requiredTextValidation(purok, "Purok/Street");
  const barangayValidation = () => requiredTextValidation(barangay, "Barangay");
  const municipalityValidation = () => requiredTextValidation(municipality, "City/Municipality");
  const provinceValidation = () => requiredTextValidation(province, "Province");

  const validIdValidation = () => {
    if (id.trim() === "") {
      return "Valid ID is required.";
    }
    return "";
  }

  const incomeValidation = () => {
    if (income.trim() === "") {
      return "Proof of income is required.";
    }
    return "";
  }

  const billingValidation = () => {
    if (billing.trim() === "") {
      return "Proof of billing is required.";
    }
    return "";
  }

  const securityQuestion1Validation = () => {
    if (question1.trim() === "") {
      return "Question 1 is required.";
    }
    return "";
  }

  const securityQuestion2Validation = () => {
    if (question2.trim() === "") {
      return "Question 2 is required.";
    }
    return "";
  }

  const securityQuestion3Validation = () => {
    if (question3.trim() === "") {
      return "Question 3 is required.";
    }
    return "";
  }

  const answer1Validation = () => requiredTextValidation(answer1, "Answer 1");
  const answer2Validation = () => requiredTextValidation(answer2, "Answer 2");
  const answer3Validation = () => requiredTextValidation(answer3, "Answer 3");

  const isPage2Valid = () => {
    return (
      purokValidation() === "" &&
      barangayValidation() === "" &&
      municipalityValidation() === "" &&
      provinceValidation() === "" &&
      validIdValidation() === "" &&
      incomeValidation() === "" &&
      billingValidation() === "" &&
      securityQuestion1Validation() === "" &&
      answer1Validation() === "" &&
      securityQuestion2Validation() === "" &&
      answer2Validation() === "" &&
      securityQuestion3Validation() === "" &&
      answer3Validation() === ""
    );
  }

  /* for next button  to redirect to page 2 */
  const handleNextPage = () => {
    setShowPage1Errors(true);

    if (!isPage1Valid()) {
      return;
    }

    setPageNumber(2);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowPage2Errors(true);

    if (!isPage2Valid()) {
      return;
    }

    if (password !== confirmPassword) {
      setSubmitMessage("Passwords do not match.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitStatus(null);

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
        setSubmitStatus("error");
        return;
      }

      setSubmitMessage("Registration successful! Redirecting to login...");
      setSubmitStatus("success");
      setTimeout(() => {
        onRegisterSuccess?.();
      }, 900);
      console.log(result);
    } catch (error) {
      console.error(error);
      setSubmitMessage("Could not connect to the backend.");
      setSubmitStatus("error");
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
          {submitMessage ? (
            <p className={`messagebox ${submitStatus === "success" ? "messagebox-success" : "messagebox-error"}`}>
              {submitMessage}
            </p>
          ) : null}
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
                    <p className="errorMessage">
                      {showPage1Errors ? firstNameValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="mname">Middle Name</label>
                    <input type="text" id="mname" value={middleName} onChange={(event) => setMiddleName(event.target.value)} />
                    <p className="errorMessage">
                      {showPage1Errors ? middleNameValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                    <p className="errorMessage">
                      {showPage1Errors ? lastNameValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="suffix">Suffix</label>
                    <select
                      id="suffix"
                      value={suffix}
                      onChange={(event) => setSuffix(event.target.value)}
                      className={suffix === "" ? style.selectPlaceholder : ""}
                    >
                      <option value="">N/A</option>
                      {suffixOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
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
                    <p className="errorMessage">
                      {showPage1Errors ? genderValidation() : null}
                    </p>
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
                    <p className="errorMessage">
                      {showPage1Errors ? birthdayValidation() : null}
                    </p>
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
                    <p className="errorMessage">
                      {showPage1Errors ? usernameValidation(): null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <p className="errorMessage">
                      {showPage1Errors ? emailValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="passwordField">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="passwordInput" 
                      />
                      <button
                        type="button"
                        className="passwordToggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
                          <circle cx="12" cy="12" r="3" />
                          {showPassword ? <line x1="4" y1="20" x2="20" y2="4" /> : null}
                        </svg>
                      </button>
                    </div>
                    <p className="errorMessage">
                      {showPage1Errors ? passwordValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="passwordField">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="passwordInput"
                      />
                      <button
                        type="button"
                        className="passwordToggle"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                        title={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
                          <circle cx="12" cy="12" r="3" />
                          {showConfirmPassword ? <line x1="4" y1="20" x2="20" y2="4" /> : null}
                        </svg>
                      </button>
                    </div>
                    <p className="errorMessage">
                      {showPage1Errors ? confirmPasswordValidation() : null}
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                style={{ width: "40%", alignSelf: "center", marginTop: "1em" }}
                onClick={handleNextPage}
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
                    <p className="errorMessage">
                      {showPage2Errors ? purokValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Barangay">Barangay</label>
                    <input type="text" id="Barangay" value={barangay} onChange={(event) => setBarangay(event.target.value)} />
                    <p className="errorMessage">
                      {showPage2Errors ? barangayValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Municipality">City/Municipality</label>
                    <input type="text" id="Municipality" value={municipality} onChange={(event) => setMunicipality(event.target.value)} />
                    <p className="errorMessage">
                      {showPage2Errors ? municipalityValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Province">Province</label>
                    <input type="text" id="Province" value={province} onChange={(event) => setProvince(event.target.value)} />
                    <p className="errorMessage">
                      {showPage2Errors ? provinceValidation() : null}
                    </p>
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
                    <p className="errorMessage">
                      {showPage2Errors ? validIdValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="income">Proof of Income</label>
                    <input type="file" id="income" onChange={(event) => setIncome(event.target.value)}/>
                    <p className="errorMessage">
                      {showPage2Errors ? incomeValidation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="billing">Proof of Billing</label>
                    <input type="file" id="billing" onChange={(event) => setBilling(event.target.value)}/>
                    <p className="errorMessage">
                      {showPage2Errors ? billingValidation() : null}
                    </p>
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
                    <p className="errorMessage">
                      {showPage2Errors ? securityQuestion1Validation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Answer1">Answer 1</label>
                    <input type="text" id="Answer1" value={answer1} onChange={(event) => setAnswer1(event.target.value)} />
                    <p className="errorMessage">
                      {showPage2Errors ? answer1Validation() : null}
                    </p>
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
                    <p className="errorMessage">
                      {showPage2Errors ? securityQuestion2Validation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Answer2">Answer 2</label>
                    <input type="text" id="Answer2" value={answer2} onChange={(event) => setAnswer2(event.target.value)} />
                    <p className="errorMessage">
                      {showPage2Errors ? answer2Validation() : null}
                    </p>
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
                    <p className="errorMessage">
                      {showPage2Errors ? securityQuestion3Validation() : null}
                    </p>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Answer3">Answer 3</label>
                    <input type="text" id="Answer3" value={answer3} onChange={(event) => setAnswer3(event.target.value)} />
                    <p className="errorMessage">
                      {showPage2Errors ? answer3Validation() : null}
                    </p>
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
