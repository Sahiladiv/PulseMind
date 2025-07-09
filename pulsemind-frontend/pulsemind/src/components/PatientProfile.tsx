import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PatientProfileData {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  allergies: string[];
  otherAllergy: string;
  smoke: boolean;
  drink: boolean;
  conditions: string;
}

const PatientProfile = () => {
  const [profile, setProfile] = useState<PatientProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/api/patients/me/'); // customize to match your backend
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Patient Profile</h2>
      <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>DOB:</strong> {profile.dob}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Allergies:</strong> {profile.allergies.join(', ')}</p>
      <p><strong>Other Allergy:</strong> {profile.otherAllergy}</p>
      <p><strong>Smokes:</strong> {profile.smoke ? 'Yes' : 'No'}</p>
      <p><strong>Drinks:</strong> {profile.drink ? 'Yes' : 'No'}</p>
      <p><strong>Conditions:</strong> {profile.conditions}</p>
    </div>
  );
};

export default PatientProfile;
