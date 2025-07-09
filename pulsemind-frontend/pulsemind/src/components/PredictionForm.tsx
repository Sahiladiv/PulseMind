import React, { useState } from "react";
import axios from "axios";

const defaultData = {
  age: 50,
  sex: 1,
  cp: 0,
  trestbps: 120,
  chol: 200,
  fbs: 0,
  restecg: 1,
  thalach: 150,
  exang: 0,
  oldpeak: 1.0,
  slope: 2,
  ca: 0,
  thal: 2,
};

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState(defaultData);
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/predict/", formData);
    setPrediction(res.data.prediction);
  };

  return (
    <div className="card shadow p-4">
      <h2 className="card-title mb-4">💓 Heart Disease Prediction</h2>
      <form onSubmit={handleSubmit} className="row g-4">
        {Object.entries(formData).map(([key, value]) => (
          <div className="col-md-6" key={key}>
            <label className="form-label text-capitalize">{key}</label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success px-4">🔍 Predict</button>
        </div>
      </form>
      {prediction && (
        <div className="alert alert-info mt-4 text-center">
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;