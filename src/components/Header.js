import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { PersonPlus } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import AddMemberForm from "./AddMember";
import AddOpportunity from "./AddOpportunity";

import axios from "axios";

export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [formData, setFormData] = useState({
    avatar: "",
    first_name: "",
    last_name: "",
    role: "",
    gender: "",
    dob: "",
  });
  const [membersList, setMembersList] = useState([]);
  const [errors, setErrors] = useState({});

  const handleShow = () => setShowModal(true);
  const handleOpportunity = () => setShowOpportunityModal(true);

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      avatar: "",
      first_name: "",
      last_name: "",
      role: "",
      gender: "",
      dob: "",
    });
    setErrors({});
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setFormData({
        ...formData,
        avatar: URL.createObjectURL(file),
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddMember = async () => {
    if (isFormValid()) {
      try {
        console.log("Adding member:", formData);
        const response = await axios.post("http://192.168.29.91:3000/members", {
          member: formData,
        });
        console.log("API Response:", response.data);

        setMembersList([...membersList, response.data]);
        handleClose();
      } catch (error) {
        console.error("Data is not posting");
      }
    }
  };

  const handleCloseOpp = () => {
    setShowOpportunityModal(false);
  };
  return (
    <div className="app-container">
      <div className="header-container">
        <h4 className="patient-heading">Patient</h4>
        <div className="button-container">
          <Button variant="dark" className="search-button">
            Search
          </Button>
          <Button
            variant="primary"
            onClick={handleShow}
            className="add-member-button"
          >
            <PersonPlus /> Add Member
          </Button>
          <Button
            variant="primary"
            onClick={handleOpportunity}
            className="add-member-button"
          >
            <PersonPlus /> Add Opportunity
          </Button>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMemberForm
            formData={formData}
            setFormData={setFormData}
            handleImageClick={handleImageClick}
            handleImageUpload={handleImageUpload}
            handleInputChange={handleInputChange}
            isFormValid={isFormValid}
            errors={errors}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddMember}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showOpportunityModal}
        onHide={handleCloseOpp}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Opportunity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddOpportunity />
        </Modal.Body>
      </Modal>
    </div>
  );
};
