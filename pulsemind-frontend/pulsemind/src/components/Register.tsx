import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    license: "",
    specialization: "",
    address: "",
  });

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

  const navigate = useNavigate();

  const allergyOptions = ["Peanuts", "Shellfish", "Dust", "Pollen", "Dairy", "Gluten"];
  const specializationOptions = [
    "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology", "Neurology",
    "Oncology", "Orthopedics", "Pediatrics", "Psychiatry", "Radiology", "Urology",
    "General Medicine", "Ophthalmology", "Gynecology"
  ];
  const maritalOptions = ["Single", "Married", "Divorced", "Widowed"];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const data: any = {
      username: email,
      email,
      password,
      role,
    };

    if (role === "doctor") {
      data.doctor_profile = doctorInfo;
    } else if (role === "patient") {
      const finalAllergies = [...patientInfo.allergies];
      if (finalAllergies.includes("Other") && patientInfo.otherAllergy.trim()) {
        finalAllergies[finalAllergies.indexOf("Other")] = patientInfo.otherAllergy.trim();
      }

      data.patient_profile = {
        ...patientInfo,
        allergies: finalAllergies,
      };
    }

    try {
      await axios.post("http://localhost:8000/api/auth/register/", data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDoctorInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePatientChange = (
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

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">📝 Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Register as</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {role === "doctor" && (
                <>
                  <hr />
                  <h5 className="text-center">Doctor Details</h5>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={doctorInfo.name}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">License Number</label>
                    <input
                      type="text"
                      name="license"
                      className="form-control"
                      value={doctorInfo.license}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Specialization</label>
                    <select
                      name="specialization"
                      className="form-select"
                      value={doctorInfo.specialization}
                      onChange={handleDoctorChange}
                      required
                    >
                      <option value="">Select Specialization</option>
                      {specializationOptions.map((spec, i) => (
                        <option key={i} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      name="address"
                      className="form-control"
                      value={doctorInfo.address}
                      onChange={handleDoctorChange}
                      rows={2}
                      required
                    ></textarea>
                  </div>
                </>
              )}

              {role === "patient" && (
                <>
                  <hr />
                  <h5 className="text-center">Patient Medical Info</h5>

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={patientInfo.name}
                      onChange={handlePatientChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      name="age"
                      className="form-control"
                      value={patientInfo.age}
                      onChange={handlePatientChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      name="address"
                      className="form-control"
                      rows={2}
                      value={patientInfo.address}
                      onChange={handlePatientChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Marital Status</label>
                    <select
                      name="marital_status"
                      className="form-select"
                      value={patientInfo.marital_status}
                      onChange={handlePatientChange}
                      required
                    >
                      <option value="">Select</option>
                      {maritalOptions.map((status, idx) => (
                        <option key={idx} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

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
                              onChange={handlePatientChange}
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
                            onChange={handlePatientChange}
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
                            onChange={handlePatientChange}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="smoke"
                      checked={patientInfo.smoke}
                      onChange={handlePatientChange}
                    />
                    <label className="form-check-label">Do you smoke?</label>
                  </div>

                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="drink"
                      checked={patientInfo.drink}
                      onChange={handlePatientChange}
                    />
                    <label className="form-check-label">Do you drink?</label>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Other Medical Conditions</label>
                    <textarea
                      name="conditions"
                      className="form-control"
                      value={patientInfo.conditions}
                      onChange={handlePatientChange}
                    ></textarea>
                  </div>
                </>
              )}

              <button type="submit" className="btn btn-success w-100">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
