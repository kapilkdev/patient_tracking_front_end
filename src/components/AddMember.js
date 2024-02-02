import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Camera } from "react-bootstrap-icons";

const AddMemberForm = ({
  formData,
  handleImageClick,
  handleImageUpload,
  handleInputChange,
  errors,
}) => {
  return (
    <Form>
      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <div className="image-input">
          <input
            type="file"
            accept="image/*"
            id="imageInput"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            name="avatar"
          />
          <Button variant="light" onClick={handleImageClick}>
            <Camera /> Add Image
          </Button>
        </div>
        {formData.avatar && (
          <img src={formData.avatar} alt="Preview" className="image-preview" />
        )}
      </Form.Group>
      <Form.Group controlId="firstName">
        <Form.Label>
          First Name<span className="mandatory-field">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
        <div>
          {errors && errors.first_name && (
            <div className="text-danger">{errors.first_name}</div>
          )}
        </div>
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>
          Last Name<span className="mandatory-field">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
        <div>
          {errors && errors.last_name && (
            <div className="text-danger">{errors.last_name}</div>
          )}
        </div>
      </Form.Group>
      <Form.Group controlId="role">
        <Form.Group controlId="role">
          <Form.Label>
            Role<span className="mandatory-field">*</span>
          </Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select role</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </Form.Control>
        </Form.Group>
        <div>
          {errors && errors.role && (
            <div className="text-danger">{errors.role}</div>
          )}
        </div>
      </Form.Group>

      <div className="row-xs-12 row-sm-2">
        <div class="d-flex">
          <Form.Group controlId="gender">
            <Form.Label>
              Gender<span className="mandatory-field">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
            {errors && errors.gender && (
              <div className="text-danger">{errors.gender}</div>
            )}
          </Form.Group>
          <Form.Group controlId="dob">
            <Form.Label>
              Date of Birth<span className="mandatory-field">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
            {errors && errors.dob && (
              <div className="text-danger">{errors.dob}</div>
            )}
          </Form.Group>
        </div>
      </div>
    </Form>
  );
};

export default AddMemberForm;
