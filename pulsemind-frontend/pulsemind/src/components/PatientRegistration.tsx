import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const allergyOptions = ["Peanuts", "Shellfish", "Dust", "Pollen", "Dairy", "Gluten"];
const maritalOptions = ["Single", "Married", "Divorced", "Widowed"];

const PatientRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    address: "",
    marital_status: "",
    allergies: [] as string[],
    otherAllergy: "",
    smoke: false,
    drink: false,
    conditions: "",
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const target = e.target as HTMLInputElement;
  const { name, value, type } = target;
  const checked = target.checked;

  if (name === "allergies") {
    const updated = checked
      ? [...patientInfo.allergies, value]
      : patientInfo.allergies.filter((item) => item !== value);

    setPatientInfo((prev) => ({ ...prev, allergies: updated }));
  } else {
    setPatientInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const finalAllergies = [...patientInfo.allergies];
    if (finalAllergies.includes("Other") && patientInfo.otherAllergy.trim()) {
      finalAllergies[finalAllergies.indexOf("Other")] = patientInfo.otherAllergy.trim();
    }

    const data = {
      username: email,
      email,
      password,
      role: "patient",
      patient_profile: {
        ...patientInfo,
        allergies: finalAllergies,
      },
    };

    try {
      await axios.post("http://localhost:8000/api/auth/register/", data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">🩺 Patient Registration</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              {/* Email + Password */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>

              {/* Patient Info */}
              <hr />
              <h5 className="text-center">Medical Information</h5>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" className="form-control" value={patientInfo.name} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Age</label>
                <input type="number" name="age" className="form-control" value={patientInfo.age} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea name="address" rows={2} className="form-control" value={patientInfo.address} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Marital Status</label>
                <select name="marital_status" className="form-select" value={patientInfo.marital_status} onChange={handleChange} required>
                  <option value="">Select</option>
                  {maritalOptions.map((status, idx) => (
                    <option key={idx} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Allergies */}
              <div className="mb-3">
                <label className="form-label">Allergies</label>
                <div className="row">
                  {allergyOptions.map((item, idx) => (
                    <div className="col-6" key={idx}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="allergies"
                          value={item}
                          checked={patientInfo.allergies.includes(item)}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">{item}</label>
                      </div>
                    </div>
                  ))}
                  <div className="col-12 mt-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="allergies"
                        value="Other"
                        checked={patientInfo.allergies.includes("Other")}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Other</label>
                    </div>
                    {patientInfo.allergies.includes("Other") && (
                      <input
                        type="text"
                        name="otherAllergy"
                        className="form-control mt-2"
                        placeholder="Please specify other allergy"
                        value={patientInfo.otherAllergy}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Habits + Conditions */}
              <div className="form-check mb-2">
                <input type="checkbox" className="form-check-input" name="smoke" checked={patientInfo.smoke} onChange={handleChange} />
                <label className="form-check-label">Do you smoke?</label>
              </div>
              <div className="form-check mb-2">
                <input type="checkbox" className="form-check-input" name="drink" checked={patientInfo.drink} onChange={handleChange} />
                <label className="form-check-label">Do you drink?</label>
              </div>

              <div className="mb-3">
                <label className="form-label">Other Medical Conditions</label>
                <textarea name="conditions" className="form-control" value={patientInfo.conditions} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;
