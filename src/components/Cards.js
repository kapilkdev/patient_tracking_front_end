import React, { useEffect,useState} from "react";
import Card from "react-bootstrap/Card";
import { Draggable } from "react-beautiful-dnd";
import "../Cards.css";

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const fullDate = dateTime.toLocaleString("en-US", options);
  const monthYear = dateTime.toLocaleString("en-US", { year: "numeric", month: "long" });

  return { fullDate, monthYear };
};

const Cards = ({ key, alldata, index, onRefreshPage }) => {
  const { id, procedure_name, patient_id, stage_history, doctor_id, patient, doctor, avatar } = alldata;
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {

  }
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
              <div style={{ display: "flex", alignItems: "center", borderRadius: "100px" }}>
                <img
                  src={patient.avatar}
                  alt={`${patient.first_name} ${patient.last_name}'s Avatar`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}

                />
                <div style={{ alignItems: "center", marginLeft: "20px" }}>
                  <Card.Title style={{ marginRight: "10px" }}>{patient.first_name} {patient.last_name}</Card.Title>
                  <Card.Title>{patient.gender}, {patient.age} years old</Card.Title>
                </div>

              </div>

              <div style={{ display: "flex", alignItems: "center", borderRadius: "100px" }}>
                <div style={{ alignItems: "center", marginRight: "40px" }}>
                  <Card.Title> {doctor.first_name} {doctor.last_name}</Card.Title>
                  {Object.entries(stage_history).map(([key, value]) => (
                    <div key={key}>
                      <Card.Title>{key}: {formatDateTime(value).fullDate} </Card.Title>
                    </div>
                  ))}
                </div>
                <img
                  src={doctor.avatar}
                  alt={`${doctor.first_name} ${doctor.last_name}'s Avatar`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </div>
            
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Cards;
