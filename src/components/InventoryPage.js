import React, { useState } from "react";

function InventoryPage({ inventory, setInventory, onNavigateToIssue, onNavigateToStudents }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  // Filter inventory based on search
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle item editing
  const handleEditItem = (updatedItem) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  // Handle adding new item
  const handleAddItem = (newItem) => {
    const newId = Math.max(...inventory.map(item => item.id)) + 1;
    setInventory(prev => [...prev, { ...newItem, id: newId }]);
    setIsAddingItem(false);
  };

  // Handle checkbox selection
  const handleSelect = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.size === filteredInventory.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredInventory.map(item => item.id)));
    }
  };

  // Handle delete selected items
  const handleDeleteSelected = () => {
    setInventory(prev => prev.filter(item => !selectedItems.has(item.id)));
    setSelectedItems(new Set());
  };

  // Add/Edit Modal shared styles
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
    width: "450px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "15px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <div
      className="inventory-container"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        className="inventory-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h1 style={{ 
          fontSize: "28px", 
          color: "#1e293b",
          margin: 0,
          fontWeight: "600" 
        }}>
          Electronics Lab Inventory
        </h1>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "12px 16px",
              width: "300px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "15px",
              backgroundColor: "#f8fafc",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onFocus={(e) => e.target.style.borderColor = "#5c6ac4"}
            onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
          />
          <button
            onClick={onNavigateToIssue}
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
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#4f5aa9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#5c6ac4"}
          >
            Issue Item
          </button>
          <button
            onClick={onNavigateToStudents}
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
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#4f5aa9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#5c6ac4"}
          >
            Students
          </button>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        gap: "12px", 
        marginBottom: "24px",
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
      }}>
        <button
          onClick={() => setIsAddingItem(true)}
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
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#4f5aa9"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#5c6ac4"}
        >
          <span style={{ fontSize: "20px" }}>+</span> Add Item
        </button>
        {selectedItems.size > 0 && (
          <button
            onClick={handleDeleteSelected}
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#fecaca";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#fee2e2";
            }}
          >
            Delete Selected ({selectedItems.size})
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: "1" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0",
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                <th style={{ ...tableHeaderStyle, width: "40px", padding: "16px" }}>
                  <input
                    type="checkbox"
                    checked={selectedItems.size === filteredInventory.length && filteredInventory.length > 0}
                    onChange={handleSelectAll}
                    style={{
                      width: "16px",
                      height: "16px",
                      cursor: "pointer",
                    }}
                  />
                </th>
                <th style={{ ...tableHeaderStyle, padding: "16px" }}>Name</th>
                <th style={{ ...tableHeaderStyle, padding: "16px" }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr 
                  key={item.id} 
                  style={{
                    ...tableRowStyle,
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                >
                  <td style={{ ...tableCellStyle, width: "40px", padding: "16px" }}>
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleSelect(item.id)}
                      style={{
                        width: "16px",
                        height: "16px",
                        cursor: "pointer",
                      }}
                    />
                  </td>
                  <td style={{ ...tableCellStyle, padding: "16px" }}>{item.name}</td>
                  <td style={{ ...tableCellStyle, padding: "16px" }}>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ width: "100px", paddingTop: "64px" }}>
          {filteredInventory.map((item) => (
            <button
              key={item.id}
              onClick={() => setEditingItem(item)}
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "white",
                color: "#5c6ac4",
                border: "1px solid #5c6ac4",
                padding: "8px",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "18px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                height: "36px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#5c6ac4";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#5c6ac4";
              }}
            >
              Edit
            </button>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      {isAddingItem && (
        <div
          style={modalStyle}
        >
          <div
            style={modalContentStyle}
          >
            <h2>Add New Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddItem({
                  name: e.target.name.value,
                  quantity: parseInt(e.target.quantity.value),
                });
              }}
            >
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
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Quantity
                  <input
                    type="number"
                    name="quantity"
                    min="0"
                    style={inputStyle}
                    required
                  />
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingItem(false)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
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

      {/* Edit Modal */}
      {editingItem && (
        <div
          style={modalStyle}
        >
          <div
            style={modalContentStyle}
          >
            <h2>Edit Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditItem({
                  ...editingItem,
                  name: e.target.name.value,
                  quantity: parseInt(e.target.quantity.value),
                });
              }}
            >
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Name
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingItem.name}
                    style={inputStyle}
                    required
                  />
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Quantity
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={editingItem.quantity}
                    style={inputStyle}
                    required
                  />
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
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

// Styles for table
const tableHeaderStyle = {
  backgroundColor: "#f8f9fa",
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "12px",
};

export default InventoryPage;
