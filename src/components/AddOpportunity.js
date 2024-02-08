import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const AddOpportunity = () => {
  const [lead, setLead] = useState('lead');
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const apiUrl = "https://patient-tracking-backend.onrender.com"

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
      procedure_name: lead,
      doctor_id: selectedDoctor, 
      patient_id: selectedPatient
    };

    axios.post(`${apiUrl}/opportunities`, {
      opportunity: formData
    }).then((res) => {
      console.log(res.data);
    }).catch((err)=>{
      console.error(err,'Api Failed')
    })
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/members`);
        const allMembers = response.data.members || [];
        const doctorsData = allMembers.filter((member) => member.role === "doctor");
        const patientsData = allMembers.filter((member) => member.role === "patient");

        setDoctors(doctorsData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchData();
  }, []); 

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
          value={selectedDoctor.id}
          onChange={handleDoctorChange}
        >
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.first_name} {doctor.last_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="patients">
        <Form.Label>Patients</Form.Label>
        <Form.Control
          as="select"
          value={selectedPatient.id}
          onChange={handlePatientChange}
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.first_name} {patient.last_name}
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
