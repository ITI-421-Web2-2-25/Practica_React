import { useState } from 'react'
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />

      <div className="bg-light min-vh-100">
        <div className="container py-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0 text-dark">Categorías del fútbol mundial</h2>
            <button className={`btn ${showForm ? "btn-danger" : "btn-success"}`} onClick={toggleForm}>
              <i className={`bi ${showForm ? "bi-x" : "bi-plus"}`}></i>{" "}
              {showForm ? "Cerrar formulario" : "Nueva categoría"}
            </button>
          </div>

          <div className="row g-4">
            {showForm && <CategoryForm />}
            <CategoryList />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
