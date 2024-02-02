import React from "react";
import Card from "react-bootstrap/Card";
import { Draggable } from "react-beautiful-dnd";
import "../Cards.css"; // Import your CSS file

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const fullDate = dateTime.toLocaleString("en-US", options);
  const monthYear = dateTime.toLocaleString("en-US", { year: "numeric", month: "long" });

  return { fullDate, monthYear };
};

const Cards = ({ key, alldata, index }) => {
  const { id, procedure_name, patient_id, stage_history, doctor_id, patient, doctor, avatar } = alldata;

  return (
    <Draggable index={index}>
      {(provided, snapshot) => (
        <div
          className={`card-container ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card draggableId={index}>
            <Card.Body>
              <img src={patient.avatar} alt={`${patient.first_name} ${patient.last_name}'s Avatar`} />
              <Card.Title> {patient.first_name} {patient.last_name}</Card.Title>
              <Card.Title>{patient.gender}, {patient.age} years old</Card.Title>
              <img src={doctor.avatar} alt={`${doctor.first_name} ${doctor.last_name}'s Avatar`} />
              <Card.Title> {doctor.first_name} {doctor.last_name}</Card.Title>
              <Card.Title>Patient: {patient.first_name} {patient.last_name}</Card.Title>
              {Object.entries(stage_history).map(([key, value]) => (
                <div key={key}>
                  <Card.Title>{key}: {formatDateTime(value).fullDate} </Card.Title>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Cards;
