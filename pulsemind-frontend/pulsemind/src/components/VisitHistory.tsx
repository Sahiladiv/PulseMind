import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Visit {
  id: number;
  visit_date: string;
  diagnosis: string;
  notes: string;
  doctor: {
    first_name: string;
    last_name: string;
  };
}

const VisitHistory = () => {
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    const fetchVisits = async () => {
      const response = await axios.get('/api/visits/');
      setVisits(response.data);
    };
    fetchVisits();
  }, []);

  return (
    <div>
      <h2>Visit History</h2>
      {visits.length === 0 ? (
        <p>No visits recorded.</p>
      ) : (
        <ul>
          {visits.map((visit) => (
            <li key={visit.id}>
              <p><strong>Date:</strong> {visit.visit_date}</p>
              <p><strong>Doctor:</strong> {visit.doctor.first_name} {visit.doctor.last_name}</p>
              <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>
              <p><strong>Notes:</strong> {visit.notes}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VisitHistory;
