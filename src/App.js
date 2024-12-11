import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import InventoryPage from "./components/InventoryPage";
import IssuePage from "./components/IssuePage";
import StudentsPage from './components/StudentsPage';

// Move initial inventory data to App.js
const initialInventory = [
  { id: 1, name: "Breadboard", quantity: 15 },
  { id: 2, name: "Arduino Uno", quantity: 10 },
  { id: 3, name: "Jumper Wires", quantity: 100 },
  { id: 4, name: "Resistor Kit", quantity: 5 },
  { id: 5, name: "Oscilloscope", quantity: 3 },
];

// Add initial students data
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
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('inventory');
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('inventory');
    return savedInventory ? JSON.parse(savedInventory) : initialInventory;
  });
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : initialStudents;
  });
  const [issuanceHistory, setIssuanceHistory] = useState(() => {
    const savedHistory = localStorage.getItem('issuanceHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('issuanceHistory', JSON.stringify(issuanceHistory));
  }, [issuanceHistory]);

  const handleLogin = (success) => {
    setIsLoggedIn(success);
  };

  const handleIssueItem = (issueData) => {
    // Update inventory when item is issued
    setInventory(prev => prev.map(item => {
      if (item.id === parseInt(issueData.itemId)) {
        return {
          ...item,
          quantity: item.quantity - issueData.quantity
        };
      }
      return item;
    }));

    // Add to issuance history
    const newIssuance = {
      id: Math.max(0, ...issuanceHistory.map(h => h.id)) + 1,
      studentId: parseInt(issueData.studentId),
      itemId: parseInt(issueData.itemId),
      quantity: issueData.quantity,
      date: issueData.date
    };
    setIssuanceHistory(prev => [...prev, newIssuance]);
    setCurrentPage('inventory');
  };

  const handleReturnItem = (historyItem) => {
    // Increase inventory quantity
    setInventory(prev => prev.map(item => {
      if (item.id === historyItem.itemId) {
        return {
          ...item,
          quantity: item.quantity + historyItem.quantity
        };
      }
      return item;
    }));

    // Remove from issuance history
    setIssuanceHistory(prev => prev.filter(h => h.id !== historyItem.id));
  };

  const handleAddStudent = (newStudent) => {
    const newId = Math.max(...students.map(s => s.id)) + 1;
    setStudents(prev => [...prev, { ...newStudent, id: newId }]);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      {currentPage === 'inventory' ? (
        <InventoryPage 
          inventory={inventory}
          setInventory={setInventory}
          onNavigateToIssue={() => setCurrentPage('issue')}
          onNavigateToStudents={() => setCurrentPage('students')}
        />
      ) : currentPage === 'issue' ? (
        <IssuePage 
          inventory={inventory}
          students={students}  // Pass students data
          onIssueItem={handleIssueItem}
          onBack={() => setCurrentPage('inventory')}
        />
      ) : (
        <StudentsPage 
          students={students}
          setStudents={setStudents}
          inventory={inventory}  // Pass inventory to show item names
          issuanceHistory={issuanceHistory}
          onReturnItem={handleReturnItem}
          onBack={() => setCurrentPage('inventory')}
        />
      )}
    </div>
  );
}

export default App;
