import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="bg-light min-vh-100 py-5">
      <Container fluid className="px-3 px-md-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">
            Welcome to <span className="text-primary">PulseMind Hospital</span>
          </h1>
          <p className="lead text-muted">
            Delivering compassionate care with advanced medical technology.<br />
            Explore our digital tools for health prediction, EKG monitoring, and medical records.
          </p>
        </div>

        <Row className="g-4">
          <Col xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>💓 Heart Disease Risk Check</Card.Title>
                <Card.Text>
                  Assess your cardiovascular health using our AI-driven risk evaluation tool.
                  Ideal for preventive care and follow-up.
                </Card.Text>
                <Link to="/" className="btn btn-outline-primary">Try Predictor</Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>📈 EKG Monitoring</Card.Title>
                <Card.Text>
                  Upload and review EKG graphs for irregularities. Get clear, explainable results reviewed by our specialists.
                </Card.Text>
                <Link to="/ekg-reader" className="btn btn-outline-primary">Analyze EKG</Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>📋 Digital Medical Records</Card.Title>
                <Card.Text>
                  Access your past visit history, prescriptions, doctor consultations, and recommended tests — all in one place.
                </Card.Text>
                <Link to="/history" className="btn btn-outline-primary">View History</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
