import React, { useState } from 'react';
import axios from 'axios';

const UploadDocuments = () => {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState('prescription');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('doc_type', docType);
    formData.append('patient', 'me'); // or real ID if required

    try {
      await axios.post('/api/documents/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Document uploaded successfully');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Medical Document</h2>
      <select value={docType} onChange={(e) => setDocType(e.target.value)}>
        <option value="prescription">Prescription</option>
        <option value="scan">Scan</option>
        <option value="report">Lab Report</option>
      </select>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadDocuments;
