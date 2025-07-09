import React, { useEffect, useState } from "react";

const History: React.FC = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const [patientVisits, setPatientVisits] = useState<any[]>([]);
  const [doctorPatients, setDoctorPatients] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;

    if (role === "patient") {
      // Simulate API fetch
      setPatientVisits([
        {
          id: 1,
          doctor: "Dr. Alice Smith",
          date: "2025-07-01",
          prescription: "Aspirin 100mg",
          diagnosis: "Hypertension",
        },
        {
          id: 2,
          doctor: "Dr. Bob Johnson",
          date: "2025-06-10",
          prescription: "Atorvastatin",
          diagnosis: "High cholesterol",
        },
      ]);
    } else if (role === "doctor") {
      // Simulate API fetch
      setDoctorPatients([
        {
          id: 101,
          name: "John Doe",
          age: 45,
          lastVisit: "2025-07-05",
          condition: "Arrhythmia",
        },
        {
          id: 102,
          name: "Jane Roe",
          age: 39,
          lastVisit: "2025-06-28",
          condition: "Asthma",
        },
      ]);
    }
  }, [role, token]);

  if (!token || !role) {
    return (
      <div className="text-center text-danger">
        <h2>Access Denied</h2>
        <p>Please log in to view your medical history.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Medical History</h2>

      {role === "patient" && (
        <>
          {patientVisits.length === 0 ? (
            <p>No history found.</p>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Diagnosis</th>
                  <th>Prescription</th>
                </tr>
              </thead>
              <tbody>
                {patientVisits.map((visit, index) => (
                  <tr key={visit.id}>
                    <td>{index + 1}</td>
                    <td>{visit.doctor}</td>
                    <td>{visit.date}</td>
                    <td>{visit.diagnosis}</td>
                    <td>{visit.prescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {role === "doctor" && (
        <>
          {doctorPatients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            <>
              <h4 className="mb-3">Patients You've Attended</h4>
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Last Visit</th>
                    <th>Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorPatients.map((patient, index) => (
                    <tr key={patient.id}>
                      <td>{index + 1}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.lastVisit}</td>
                      <td>{patient.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default History;
