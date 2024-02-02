import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const AddOpportunity = () => {
  const [lead, setLead] = useState('lead');
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [opportunities, setOpportunityData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleLead = (event) => {
    setLead(event.target.value);
  };

  const handleSubmitOpportunity = async () => {
    const formData = {
      leads: lead,
      doctor: selectedDoctor,
      patient: selectedPatient,
    };

    console.log(formData);

    // Add logic to send data to the server or update state
  };


  return (
    <Form>

      <Form.Group controlId="lead">
        <Form.Label>Lead</Form.Label>
        <Form.Control
          name="lead"
          value={lead}
          onChange={handleLead}
          disabled
          required
        />
      </Form.Group>

      <Form.Group controlId="doctors">
        <Form.Label>Doctors</Form.Label>
        <Form.Control
          as="select"
          value={selectedDoctor}
          onChange={handleDoctorChange}
        >
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="patients">
        <Form.Label>Patients</Form.Label>
        <Form.Control
          as="select"
          value={selectedPatient}
          onChange={handlePatientChange}
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.name}>
              {patient.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" onClick={handleSubmitOpportunity}>
        Save
      </Button>
    </Form>
  );
};

export default AddOpportunity;
