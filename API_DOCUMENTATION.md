# Occluz Backend API Documentation

## Base URL
```
http://localhost:4000/api
```

## Table of Contents
1. [Authentication](#authentication)
2. [User Routes](#user-routes)
3. [Admin Routes](#admin-routes)
4. [Doctor Routes](#doctor-routes)
5. [Patient Routes](#patient-routes)
6. [Session Routes](#session-routes)
7. [Questionnaire Routes](#questionnaire-routes)
8. [Patient Response Routes](#patient-response-routes)
9. [Prescription Routes](#prescription-routes)
10. [Review Routes](#review-routes)
11. [Complaint Routes](#complaint-routes)
12. [Error Handling](#error-handling)

---

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Token Structure
The JWT token contains:
```json
{
  "id": "user_id",
  "role": "admin|doctor|patient"
}
```

Token expires in 7 days (configurable via `JWT_EXPIRES_IN` environment variable).

---

## User Routes

### 1. Register User
**Endpoint:** `POST /api/users/register`

**Auth Required:** No

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "patient"
}
```

**Response (201 - Created):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "patient",
  "token": "jwt_token_here"
}
```

**Error Responses:**
- `400`: User already exists
- `500`: Server error

---

### 2. Login User
**Endpoint:** `POST /api/users/login`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 - OK):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "patient",
  "token": "jwt_token_here"
}
```

**Error Responses:**
- `401`: Invalid email or password
- `500`: Server error

---

### 3. Change Password
**Endpoint:** `PUT /api/users/change-password`

**Auth Required:** No (uses email-based authentication)

**Request Body:**
```json
{
  "email": "john@example.com",
  "oldPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

**Response (200 - OK):**
```json
{
  "message": "Password updated successfully"
}
```

**Error Responses:**
- `404`: User not found
- `401`: Old password is incorrect
- `500`: Server error

---

## Admin Routes

All admin routes require authentication with `admin` role.

### 1. Add Doctor
**Endpoint:** `POST /api/admin/add-doctor`

**Auth Required:** Yes (Admin only)

**Request Body:**
```json
{
  "name": "Dr. Smith",
  "email": "drsmith@example.com",
  "password": "doctorPassword123"
}
```

**Response (201 - Created):**
```json
{
  "message": "Doctor added successfully",
  "doctor": {
    "_id": "doctor_id",
    "name": "Dr. Smith",
    "email": "drsmith@example.com",
    "role": "doctor"
  }
}
```

**Error Responses:**
- `400`: Doctor already exists
- `401`: Access denied (no token)
- `403`: Access denied (not admin)
- `500`: Error adding doctor

---

### 2. Get All Doctors
**Endpoint:** `GET /api/admin/doctors`

**Auth Required:** Yes (Admin only)

**Request Body:** None

**Response (200 - OK):**
```json
[
  {
    "_id": "doctor_id",
    "name": "Dr. Smith",
    "email": "drsmith@example.com",
    "role": "doctor"
  },
  {
    "_id": "doctor_id_2",
    "name": "Dr. Johnson",
    "email": "drjohnson@example.com",
    "role": "doctor"
  }
]
```

**Error Responses:**
- `401`: Access denied (no token)
- `403`: Access denied (not admin)
- `500`: Error fetching doctors

---

### 3. Update Doctor
**Endpoint:** `PUT /api/admin/doctor/:id`

**Auth Required:** Yes (Admin only)

**URL Parameters:**
- `id`: Doctor's user ID

**Request Body (all fields optional):**
```json
{
  "name": "Dr. Smith Updated",
  "email": "newdremail@example.com",
  "password": "newPassword123"
}
```

**Response (200 - OK):**
```json
{
  "message": "Doctor updated successfully",
  "doctor": {
    "_id": "doctor_id",
    "name": "Dr. Smith Updated",
    "email": "newdremail@example.com",
    "role": "doctor"
  }
}
```

**Error Responses:**
- `404`: Doctor not found
- `401`: Access denied (no token)
- `403`: Access denied (not admin)
- `500`: Error updating doctor

---

### 4. Delete Doctor
**Endpoint:** `DELETE /api/admin/doctor/:id`

**Auth Required:** Yes (Admin only)

**URL Parameters:**
- `id`: Doctor's user ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "message": "Doctor deleted successfully"
}
```

**Error Responses:**
- `404`: Doctor not found
- `401`: Access denied (no token)
- `403`: Access denied (not admin)
- `500`: Error deleting doctor

---

### 5. Get All Patients
**Endpoint:** `GET /api/admin/patients`

**Auth Required:** Yes (Admin only)

**Request Body:** None

**Response (200 - OK):**
```json
[
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
]
```

**Error Responses:**
- `401`: Access denied (no token)
- `403`: Access denied (not admin)
- `500`: Error fetching patients

---

## Doctor Routes

All doctor routes require authentication with `doctor` role.

### 1. Add Patient
**Endpoint:** `POST /api/doctor/add-patient`

**Auth Required:** Yes (Doctor only)

**Request Body:**
```json
{
  "name": "Jane Doe",
  "age": 35,
  "gender": "Female",
  "contact": "+1234567890"
}
```

**Response (201 - Created):**
```json
{
  "message": "Patient added successfully",
  "patient": {
    "_id": "patient_id",
    "name": "Jane Doe",
    "age": 35,
    "gender": "Female",
    "contact": "+1234567890",
    "doctorId": "doctor_id"
  }
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `403`: Access denied (not doctor)
- `500`: Error adding patient

---

### 2. Get All Patients (for current doctor)
**Endpoint:** `GET /api/doctor/patients`

**Auth Required:** Yes (Doctor only)

**Request Body:** None

**Response (200 - OK):**
```json
[
  {
    "_id": "patient_id",
    "name": "Jane Doe",
    "age": 35,
    "gender": "Female",
    "contact": "+1234567890",
    "doctorId": "doctor_id"
  }
]
```

**Error Responses:**
- `401`: Access denied (no token)
- `403`: Access denied (not doctor)
- `500`: Error fetching patients

---

### 3. Update Patient
**Endpoint:** `PUT /api/doctor/patient/:id`

**Auth Required:** Yes (Doctor only)

**URL Parameters:**
- `id`: Patient ID

**Request Body (all fields optional):**
```json
{
  "name": "Jane Doe Updated",
  "age": 36,
  "gender": "Female",
  "contact": "+1234567890"
}
```

**Response (200 - OK):**
```json
{
  "message": "Patient updated successfully",
  "patient": {
    "_id": "patient_id",
    "name": "Jane Doe Updated",
    "age": 36,
    "gender": "Female",
    "contact": "+1234567890",
    "doctorId": "doctor_id"
  }
}
```

**Error Responses:**
- `404`: Patient not found or unauthorized
- `401`: Access denied (no token)
- `403`: Access denied (not doctor)
- `500`: Error updating patient

---

### 4. Delete Patient
**Endpoint:** `DELETE /api/doctor/patient/:id`

**Auth Required:** Yes (Doctor only)

**URL Parameters:**
- `id`: Patient ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "message": "Patient deleted successfully"
}
```

**Error Responses:**
- `404`: Patient not found or unauthorized
- `401`: Access denied (no token)
- `403`: Access denied (not doctor)
- `500`: Error deleting patient

---

### 5. Create Questionnaire
**Endpoint:** `POST /api/doctor/questionnaire/create`

**Auth Required:** Yes (Doctor only)

**Request Body:**
```json
{
  "title": "Initial Assessment",
  "description": "Patient intake questionnaire",
  "questions": [
    {
      "questionText": "What is your primary concern?",
      "type": "text",
      "required": true
    },
    {
      "questionText": "Do you have any allergies?",
      "type": "yes_no",
      "required": true
    },
    {
      "questionText": "Select your symptoms:",
      "type": "mcq",
      "options": ["Headache", "Fever", "Cough", "Fatigue"],
      "required": false
    }
  ]
}
```

**Response (201 - Created):**
```json
{
  "message": "Questionnaire created successfully",
  "questionnaire": {
    "_id": "questionnaire_id",
    "doctorId": "doctor_id",
    "title": "Initial Assessment",
    "description": "Patient intake questionnaire",
    "questions": [
      {
        "questionText": "What is your primary concern?",
        "type": "text",
        "options": [],
        "required": true,
        "_id": "question_id"
      }
    ],
    "createdAt": "2025-12-14T10:00:00.000Z",
    "updatedAt": "2025-12-14T10:00:00.000Z"
  }
}
```

**Question Types:**
- `text`: Open-ended text response
- `yes_no`: Boolean yes/no question
- `mcq`: Multiple choice question (requires `options` array)

**Error Responses:**
- `401`: Access denied (no token)
- `403`: Access denied (not doctor)
- `500`: Error creating questionnaire

---

### 6. Get Doctor's Questionnaires
**Endpoint:** `GET /api/doctor/questionnaire/all`

**Auth Required:** Yes (Doctor only)

**Request Body:** None

**Response (200 - OK):**
```json
{
  "message": "Doctor questionnaires fetched",
  "questionnaires": [
    {
      "_id": "questionnaire_id",
      "doctorId": "doctor_id",
      "title": "Initial Assessment",
      "description": "Patient intake questionnaire",
      "questions": [...],
      "createdAt": "2025-12-14T10:00:00.000Z",
      "updatedAt": "2025-12-14T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `403`: Access denied (not doctor)
- `500`: Error fetching questionnaires

---

### 7. Update Questionnaire
**Endpoint:** `PUT /api/doctor/questionnaire/update/:id`

**Auth Required:** Yes (Doctor only)

**URL Parameters:**
- `id`: Questionnaire ID

**Request Body (all fields optional):**
```json
{
  "title": "Updated Assessment",
  "description": "Updated description",
  "questions": [...]
}
```

**Response (200 - OK):**
```json
{
  "message": "Questionnaire updated successfully",
  "questionnaire": {
    "_id": "questionnaire_id",
    "doctorId": "doctor_id",
    "title": "Updated Assessment",
    "description": "Updated description",
    "questions": [...],
    "updatedAt": "2025-12-14T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `404`: Questionnaire not found or unauthorized
- `401`: Access denied (no token)
- `403`: Access denied (not doctor)
- `500`: Error updating questionnaire

---

### 8. Delete Questionnaire
**Endpoint:** `DELETE /api/doctor/questionnaire/delete/:id`

**Auth Required:** Yes (Doctor only)

**URL Parameters:**
- `id`: Questionnaire ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "message": "Questionnaire deleted successfully"
}
```

**Error Responses:**
- `404`: Questionnaire not found or unauthorized
- `401`: Access denied (no token)
- `403`: Access denied (not doctor)
- `500`: Error deleting questionnaire

---

## Patient Routes

All patient routes require authentication with `patient` role.

### 1. Get My Questionnaires
**Endpoint:** `GET /api/patient/questionnaires`

**Auth Required:** Yes (Patient only)

**Request Body:** None

**Response (200 - OK):**
```json
[
  {
    "_id": "questionnaire_id",
    "doctorId": "doctor_id",
    "title": "Initial Assessment",
    "description": "Patient intake questionnaire",
    "questions": [
      {
        "questionText": "What is your primary concern?",
        "type": "text",
        "options": [],
        "required": true,
        "_id": "question_id"
      }
    ],
    "createdAt": "2025-12-14T10:00:00.000Z",
    "updatedAt": "2025-12-14T10:00:00.000Z"
  }
]
```

**Error Responses:**
- `401`: Access denied (no token)
- `403`: Access denied (not patient)
- `500`: Error fetching questionnaires

---

### 2. Submit Questionnaire
**Endpoint:** `POST /api/patient/questionnaires/:id/fill`

**Auth Required:** Yes (Patient only)

**URL Parameters:**
- `id`: Questionnaire ID

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": "question_id_1",
      "answer": "I have been experiencing headaches"
    },
    {
      "questionId": "question_id_2",
      "answer": "Yes"
    }
  ]
}
```

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Questionnaire submitted, treatment plan created",
  "treatmentPlan": {
    "_id": "treatment_plan_id",
    "patientId": "patient_id",
    "createdFrom": "response_id",
    "steps": [
      {
        "description": "Step based on: I have been experiencing headaches",
        "_id": "step_id_1"
      },
      {
        "description": "Step based on: Yes",
        "_id": "step_id_2"
      }
    ],
    "progress": 0,
    "createdAt": "2025-12-14T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `403`: Access denied (not patient)
- `500`: Error submitting questionnaire

---

### 3. Get Treatment Plan
**Endpoint:** `GET /api/patient/treatment-plan`

**Auth Required:** Yes (Patient only)

**Request Body:** None

**Response (200 - OK):**
```json
{
  "_id": "treatment_plan_id",
  "patientId": "patient_id",
  "createdFrom": "response_id",
  "steps": [
    {
      "description": "Step based on: I have been experiencing headaches",
      "_id": "step_id_1"
    }
  ],
  "progress": 0,
  "createdAt": "2025-12-14T10:00:00.000Z"
}
```

**Error Responses:**
- `404`: No treatment plan found
- `401`: Access denied (no token)
- `403`: Access denied (not patient)
- `500`: Error fetching treatment plan

---

## Session Routes

### 1. Create Session
**Endpoint:** `POST /api/sessions`

**Auth Required:** Yes

**Request Body:**
```json
{
  "doctorId": "doctor_id",
  "patientId": "patient_id",
  "date": "2025-12-20",
  "time": "14:30",
  "notes": "Initial consultation"
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "session": {
    "_id": "session_id",
    "doctorId": "doctor_id",
    "patientId": "patient_id",
    "date": "2025-12-20T00:00:00.000Z",
    "time": "14:30",
    "status": "pending",
    "notes": "Initial consultation",
    "createdAt": "2025-12-14T10:00:00.000Z",
    "updatedAt": "2025-12-14T10:00:00.000Z"
  }
}
```

**Session Status Values:**
- `pending`: Session scheduled but not yet completed
- `completed`: Session has been completed
- `cancelled`: Session was cancelled

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Server error

---

### 2. Get Doctor's Sessions
**Endpoint:** `GET /api/sessions/doctor/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Doctor's user ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "count": 2,
  "sessions": [
    {
      "_id": "session_id",
      "doctorId": "doctor_id",
      "patientId": {
        "_id": "patient_id",
        "name": "Jane Doe",
        "age": 35,
        "gender": "Female"
      },
      "date": "2025-12-20T00:00:00.000Z",
      "time": "14:30",
      "status": "pending",
      "notes": "Initial consultation",
      "createdAt": "2025-12-14T10:00:00.000Z",
      "updatedAt": "2025-12-14T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Server error

---

### 3. Get Patient's Sessions
**Endpoint:** `GET /api/sessions/patient/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Patient ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "count": 1,
  "sessions": [
    {
      "_id": "session_id",
      "doctorId": {
        "_id": "doctor_id",
        "name": "Dr. Smith",
        "specialization": "Cardiology"
      },
      "patientId": "patient_id",
      "date": "2025-12-20T00:00:00.000Z",
      "time": "14:30",
      "status": "pending",
      "notes": "Initial consultation",
      "createdAt": "2025-12-14T10:00:00.000Z",
      "updatedAt": "2025-12-14T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Server error

---

### 4. Update Session
**Endpoint:** `PUT /api/sessions/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Session ID

**Request Body (all fields optional):**
```json
{
  "status": "completed",
  "notes": "Patient responded well to treatment",
  "date": "2025-12-21",
  "time": "15:00"
}
```

**Response (200 - OK):**
```json
{
  "success": true,
  "session": {
    "_id": "session_id",
    "doctorId": "doctor_id",
    "patientId": "patient_id",
    "date": "2025-12-21T00:00:00.000Z",
    "time": "15:00",
    "status": "completed",
    "notes": "Patient responded well to treatment",
    "updatedAt": "2025-12-14T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `404`: Session not found
- `401`: Access denied (no token)
- `500`: Server error

---

## Questionnaire Routes

### Get My Questionnaires (Doctor)
**Endpoint:** `GET /api/questionnaires/my`

**Auth Required:** Yes (Doctor only)

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "questionnaires": [
    {
      "_id": "questionnaire_id",
      "doctorId": "doctor_id",
      "title": "Initial Assessment",
      "description": "Patient intake questionnaire",
      "questions": [...],
      "createdAt": "2025-12-14T10:00:00.000Z",
      "updatedAt": "2025-12-14T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `403`: Access denied (not doctor)
- `500`: Error fetching questionnaires

---

## Patient Response Routes

### 1. Submit Response
**Endpoint:** `POST /api/patient-responses`

**Auth Required:** Yes

**Request Body:**
```json
{
  "questionnaireId": "questionnaire_id",
  "answers": [
    {
      "questionId": "question_id_1",
      "answer": "I have been experiencing headaches"
    },
    {
      "questionId": "question_id_2",
      "answer": "Yes"
    }
  ]
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "message": "Response submitted",
  "response": {
    "_id": "response_id",
    "patientId": "patient_id",
    "questionnaireId": "questionnaire_id",
    "answers": [
      {
        "questionId": "question_id_1",
        "answer": "I have been experiencing headaches"
      },
      {
        "questionId": "question_id_2",
        "answer": "Yes"
      }
    ],
    "createdAt": "2025-12-14T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Server error

---

### 2. Get Responses by Patient
**Endpoint:** `GET /api/patient-responses/:patientId`

**Auth Required:** Yes

**URL Parameters:**
- `patientId`: Patient user ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "count": 2,
  "responses": [
    {
      "_id": "response_id",
      "patientId": "patient_id",
      "questionnaireId": {
        "_id": "questionnaire_id",
        "title": "Initial Assessment",
        "questions": [...]
      },
      "answers": [
        {
          "questionId": "question_id_1",
          "answer": "I have been experiencing headaches"
        }
      ],
      "createdAt": "2025-12-14T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Server error

---

### 3. Get Single Response
**Endpoint:** `GET /api/patient-responses/view/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Response ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "response": {
    "_id": "response_id",
    "patientId": "patient_id",
    "questionnaireId": {
      "_id": "questionnaire_id",
      "title": "Initial Assessment",
      "questions": [...]
    },
    "answers": [
      {
        "questionId": "question_id_1",
        "answer": "I have been experiencing headaches"
      }
    ],
    "createdAt": "2025-12-14T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `404`: Response not found
- `401`: Access denied (no token)
- `500`: Server error

---

## Prescription Routes

### 1. Create Prescription
**Endpoint:** `POST /api/prescriptions`

**Auth Required:** Yes (Doctor)

**Request Body:**
```json
{
  "patientId": "patient_id",
  "items": [
    {
      "medication": "Aspirin",
      "dosage": "500mg",
      "frequency": "twice daily",
      "duration": "7 days"
    },
    {
      "medication": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "as needed",
      "duration": "14 days"
    }
  ],
  "notes": "Take with food"
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "message": "Prescription created successfully",
  "prescription": {
    "_id": "prescription_id",
    "doctorId": "doctor_id",
    "patientId": "patient_id",
    "items": [
      {
        "medication": "Aspirin",
        "dosage": "500mg",
        "frequency": "twice daily",
        "duration": "7 days"
      }
    ],
    "notes": "Take with food",
    "createdAt": "2025-12-14T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Error creating prescription

---

### 2. Get Prescriptions for Patient
**Endpoint:** `GET /api/prescriptions/:patientId`

**Auth Required:** Yes

**URL Parameters:**
- `patientId`: Patient ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "prescriptions": [
    {
      "_id": "prescription_id",
      "doctorId": "doctor_id",
      "patientId": "patient_id",
      "items": [
        {
          "medication": "Aspirin",
          "dosage": "500mg",
          "frequency": "twice daily",
          "duration": "7 days"
        }
      ],
      "notes": "Take with food",
      "createdAt": "2025-12-14T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Error fetching prescriptions

---

### 3. Get Single Prescription
**Endpoint:** `GET /api/prescriptions/view/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Prescription ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "prescription": {
    "_id": "prescription_id",
    "doctorId": "doctor_id",
    "patientId": "patient_id",
    "items": [
      {
        "medication": "Aspirin",
        "dosage": "500mg",
        "frequency": "twice daily",
        "duration": "7 days"
      }
    ],
    "notes": "Take with food",
    "createdAt": "2025-12-14T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Error fetching prescription

---

### 4. Delete Prescription
**Endpoint:** `DELETE /api/prescriptions/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Prescription ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Prescription deleted"
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Error deleting prescription

---

## Review Routes

### 1. Add Review
**Endpoint:** `POST /api/reviews`

**Auth Required:** Yes (Patient)

**Request Body:**
```json
{
  "doctorId": "doctor_id",
  "rating": 5,
  "comment": "Excellent service and very professional"
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "message": "Review submitted",
  "review": {
    "_id": "review_id",
    "doctorId": "doctor_id",
    "patientId": "patient_id",
    "rating": 5,
    "comment": "Excellent service and very professional",
    "createdAt": "2025-12-14T10:00:00.000Z"
  }
}
```

**Rating Scale:** 1-5 (1 = Poor, 5 = Excellent)

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Error adding review

---

### 2. Get Doctor Reviews
**Endpoint:** `GET /api/reviews/doctor/:doctorId`

**Auth Required:** Yes

**URL Parameters:**
- `doctorId`: Doctor's user ID

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "reviews": [
    {
      "_id": "review_id",
      "doctorId": "doctor_id",
      "patientId": {
        "_id": "patient_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "rating": 5,
      "comment": "Excellent service and very professional",
      "createdAt": "2025-12-14T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Error fetching reviews

---

## Complaint Routes

### 1. Create Complaint
**Endpoint:** `POST /api/complaints`

**Auth Required:** Yes (Patient)

**Request Body:**
```json
{
  "title": "Long wait time",
  "message": "I had to wait 2 hours for my appointment despite being on time"
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "complaint": {
    "_id": "complaint_id",
    "patientId": "patient_id",
    "title": "Long wait time",
    "message": "I had to wait 2 hours for my appointment despite being on time",
    "createdAt": "2025-12-14T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Error creating complaint

---

### 2. Get All Complaints
**Endpoint:** `GET /api/complaints`

**Auth Required:** Yes (Admin/Doctor)

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "complaints": [
    {
      "_id": "complaint_id",
      "patientId": {
        "_id": "patient_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "title": "Long wait time",
      "message": "I had to wait 2 hours for my appointment despite being on time",
      "createdAt": "2025-12-14T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Error fetching complaints

---

### 3. Get My Complaints
**Endpoint:** `GET /api/complaints/mine`

**Auth Required:** Yes (Patient)

**Request Body:** None

**Response (200 - OK):**
```json
{
  "success": true,
  "complaints": [
    {
      "_id": "complaint_id",
      "patientId": "patient_id",
      "title": "Long wait time",
      "message": "I had to wait 2 hours for my appointment despite being on time",
      "createdAt": "2025-12-14T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Access denied (no token)
- `500`: Error fetching your complaints

---

## Error Handling

### Common Error Response Format

All error responses follow this structure:

```json
{
  "message": "Error description",
  "error": "Detailed error message (optional)"
}
```

Or for success responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### Authentication Errors

**No Token Provided:**
```json
{
  "message": "Access denied. No token provided."
}
```

**Invalid Token:**
```json
{
  "message": "Invalid token."
}
```

**Insufficient Privileges:**
```json
{
  "message": "Access denied: insufficient privileges."
}
```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/occluz
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

---

## Testing with Postman/cURL

### Example: Register and Login Flow

**1. Register a new user:**
```bash
curl -X POST http://localhost:4000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "patient"
  }'
```

**2. Use the token in subsequent requests:**
```bash
curl -X GET http://localhost:4000/api/patient/questionnaires \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## Role-Based Access Control

### User Roles
- **admin**: Full system access, can manage doctors and view all patients
- **doctor**: Can manage their own patients, create questionnaires, view sessions
- **patient**: Can submit questionnaires, view treatment plans, create complaints

### Role Permissions Matrix

| Endpoint | Admin | Doctor | Patient |
|----------|-------|--------|---------|
| Add/Manage Doctors | ✅ | ❌ | ❌ |
| View All Patients | ✅ | ❌ | ❌ |
| Manage Own Patients | ❌ | ✅ | ❌ |
| Create Questionnaires | ❌ | ✅ | ❌ |
| Submit Questionnaires | ❌ | ❌ | ✅ |
| View Treatment Plans | ❌ | ✅ | ✅ |
| Create Sessions | ✅ | ✅ | ✅ |
| Create Prescriptions | ❌ | ✅ | ❌ |
| View Prescriptions | ✅ | ✅ | ✅ |
| Add Reviews | ❌ | ❌ | ✅ |
| View Reviews | ✅ | ✅ | ✅ |
| Create Complaints | ❌ | ❌ | ✅ |
| View All Complaints | ✅ | ✅ | ❌ |
| View Own Complaints | ❌ | ❌ | ✅ |

---

## Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  passwordHash: String,
  role: Enum ['admin', 'doctor', 'patient']
}
```

### Patient Model
```javascript
{
  name: String,
  age: Number,
  gender: String,
  contact: String,
  email: String (unique, optional),
  doctorId: ObjectId (ref: User)
}
```

### Questionnaire Model
```javascript
{
  doctorId: ObjectId (ref: User),
  title: String,
  description: String,
  questions: [
    {
      questionText: String,
      type: Enum ['text', 'yes_no', 'mcq'],
      options: [String],
      required: Boolean
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Session Model
```javascript
{
  doctorId: ObjectId (ref: Doctor),
  patientId: ObjectId (ref: Patient),
  date: Date,
  time: String,
  status: Enum ['pending', 'completed', 'cancelled'],
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Notes

- All dates are stored in ISO 8601 format
- All timestamps include timezone information
- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens are signed using HS256 algorithm
- All patient data is linked to their respective doctor
- Questionnaire responses trigger automatic treatment plan generation (placeholder logic)

---

## Support

For issues or questions, please contact the development team or open an issue in the project repository.

**Last Updated:** December 14, 2025
