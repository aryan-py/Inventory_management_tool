import React, { useState } from 'react';

// Initial students data
const initialStudents = [
  {
    id: 1,
    name: "John Doe",
    enrollmentNumber: "2021BCS001",
    department: "Computer Science",
    phoneNumber: "9876543210",
    email: "john.doe@school.edu"
  },
  {
    id: 2,
    name: "Jane Smith",
    enrollmentNumber: "2021BEE015",
    department: "Electrical Engineering",
    phoneNumber: "9876543211",
    email: "jane.smith@school.edu"
  },
  // Add more sample students as needed
];

function StudentsPage({ 
  students, 
  setStudents, 
  inventory, 
  issuanceHistory, 
  onReturnItem,
  onBack 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [selectedStudentHistory, setSelectedStudentHistory] = useState(null);

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding new student
  const handleAddStudent = (newStudent) => {
    const newId = Math.max(...students.map(s => s.id)) + 1;
    setStudents(prev => [...prev, { ...newStudent, id: newId }]);
    setIsAddingStudent(false);
  };

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Get student's history
  const getStudentHistory = (studentId) => {
    return issuanceHistory
      .filter(history => history.studentId === studentId)
      .map(history => ({
        ...history,
        itemName: inventory.find(item => item.id === history.itemId)?.name || 'Unknown Item'
      }));
  };

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px",
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
        marginBottom: "24px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", color: "#1e293b", margin: 0, fontWeight: "600" }}>
            Students List
          </h1>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "12px 16px",
                width: "300px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "15px",
                backgroundColor: "#f8fafc",
              }}
            />
            <button
              onClick={onBack}
              style={{
                backgroundColor: "#5c6ac4",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "500",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#4f5aa9"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#5c6ac4"}
            >
              Back to Inventory
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsAddingStudent(true)}
          style={{
            backgroundColor: "#5c6ac4",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            marginBottom: "24px",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#4f5aa9"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#5c6ac4"}
        >
          + Add Student
        </button>

        <table style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0",
          backgroundColor: "white",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Enrollment No.</th>
              <th style={tableHeaderStyle}>Department</th>
              <th style={tableHeaderStyle}>Phone Number</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
              >
                <td style={tableCellStyle}>{student.name}</td>
                <td style={tableCellStyle}>{student.enrollmentNumber}</td>
                <td style={tableCellStyle}>{student.department}</td>
                <td style={tableCellStyle}>{student.phoneNumber}</td>
                <td style={tableCellStyle}>{student.email}</td>
                <td style={tableCellStyle}>
                  <button
                    onClick={() => setSelectedStudentHistory(student)}
                    style={{
                      backgroundColor: "#5c6ac4",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#4f5aa9"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#5c6ac4"}
                  >
                    View History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* History Modal */}
      {selectedStudentHistory && (
        <div style={modalStyle}>
          <div style={{
            ...modalContentStyle,
            width: "600px",
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <h2 style={{ margin: 0 }}>Issuance History - {selectedStudentHistory.name}</h2>
              <button
                onClick={() => setSelectedStudentHistory(null)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ 
              maxHeight: "400px", 
              overflowY: "auto",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th style={historyHeaderStyle}>Item</th>
                    <th style={historyHeaderStyle}>Quantity</th>
                    <th style={historyHeaderStyle}>Date</th>
                    <th style={historyHeaderStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getStudentHistory(selectedStudentHistory.id).map((history) => (
                    <tr key={history.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={historyCellStyle}>{history.itemName}</td>
                      <td style={historyCellStyle}>{history.quantity}</td>
                      <td style={historyCellStyle}>{formatDate(history.date)}</td>
                      <td style={historyCellStyle}>
                        <button
                          onClick={() => {
                            if (window.confirm(`Return ${history.quantity} ${history.itemName}(s)?`)) {
                              onReturnItem(history);
                            }
                          }}
                          style={{
                            backgroundColor: "#10B981",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                            transition: "background-color 0.2s ease",
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = "#059669"}
                          onMouseOut={(e) => e.target.style.backgroundColor = "#10B981"}
                        >
                          Return
                        </button>
                      </td>
                    </tr>
                  ))}
                  {getStudentHistory(selectedStudentHistory.id).length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ ...historyCellStyle, textAlign: "center" }}>
                        No items issued yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddingStudent && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Add New Student</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddStudent({
                name: e.target.name.value,
                enrollmentNumber: e.target.enrollmentNumber.value,
                department: e.target.department.value,
                phoneNumber: e.target.phoneNumber.value,
                email: e.target.email.value,
              });
            }}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Name
                  <input
                    type="text"
                    name="name"
                    style={inputStyle}
                    required
                  />
                </label>
              </div>
              {/* Add similar input fields for other student details */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Enrollment Number
                  <input
                    type="text"
                    name="enrollmentNumber"
                    style={inputStyle}
                    required
                  />
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Department
                  <input
                    type="text"
                    name="department"
                    style={inputStyle}
                    required
                  />
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Phone Number
                  <input
                    type="tel"
                    name="phoneNumber"
                    style={inputStyle}
                    required
                  />
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Email
                  <input
                    type="email"
                    name="email"
                    style={inputStyle}
                    required
                  />
                </label>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "24px",
              }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Add Student
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingStudent(false)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const tableHeaderStyle = {
  padding: "16px",
  textAlign: "left",
  fontWeight: "500",
  color: "#4a5568",
  borderBottom: "2px solid #e2e8f0",
};

const tableCellStyle = {
  padding: "16px",
  color: "#2d3748",
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "32px",
  borderRadius: "16px",
  width: "500px",
  maxWidth: "90%",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "15px",
  marginTop: "8px",
};

const historyHeaderStyle = {
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: "500",
  backgroundColor: "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
};

const historyCellStyle = {
  padding: "12px 16px",
  color: "#2d3748",
};

export default StudentsPage; 