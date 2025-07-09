// File: src/components/EKGReader.tsx
import React, { useState } from "react";
import axios from "axios";

const EKGReader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("ekg", file);

    try {
      setStatus("Processing...");
      const res = await axios.post("http://localhost:8000/api/ekg-analyze/", formData);
      setResult(res.data);
      setStatus("Analysis complete ✅");
    } catch (err) {
      setStatus("Error analyzing EKG ❌");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h2 className="card-title mb-4 text-center">📈 EKG Reading Analysis</h2>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg,.pdf"
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleUpload} disabled={!file}>
              Upload & Analyze
            </button>
            <p className="mt-3 text-center">{status}</p>

            {result && (
              <div className="mt-4">
                <h5>📊 Analysis Result:</h5>
                <pre className="bg-light p-3 rounded border">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EKGReader;
