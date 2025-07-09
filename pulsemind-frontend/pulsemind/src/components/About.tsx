import React from "react";

const About: React.FC = () => {
  return (
    <div className="card shadow p-4">
      <h2 className="card-title mb-3">ℹ️ About PulseMind</h2>
      <p className="card-text">
        PulseMind is a heart disease prediction platform that uses machine learning to help identify risk levels based on clinical inputs. It’s designed to be user-friendly, fast, and accurate.
      </p>
    </div>
  );
};

export default About;