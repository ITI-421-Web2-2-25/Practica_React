import { useEffect, useState } from "react";

const bufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
        <div className="col-lg-12">
            <div className="card border-0 shadow-sm rounded-3">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                  <h5 className="fw-semibold mb-0">Categorías registradas</h5>
                  <span className="badge bg-primary">{categories.length} total</span>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                <th scope="col" className="fw-medium text-muted border-0 px-4 py-3">Identificador</th>
                                <th scope="col" className="fw-medium text-muted border-0 px-4 py-3">Nombre</th>
                                <th scope="col" className="fw-medium text-muted border-0 px-4 py-3">Descripción</th>
                                <th scope="col" className="fw-medium text-muted border-0 px-4 py-3">Imagen</th>
                                <th scope="col" className="fw-medium text-muted border-0 px-4 py-3">Accciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                <tr key={category.CategoryID}>
                                    <td className="px-4 py-3 fw-medium">{category.CategoryID}</td>
                                    <td className="px-4 py-3 fw-medium">{category.CategoryName}</td>
                                    <td className="px-4 py-3 text-muted">{category.Description}</td>
                                    <td className="px-4 py-3">
                                    <div className="rounded d-inline-flex align-items-center justify-content-center text-white fw-bold">
                                        <img
                                            src={`data:${category.Mime};base64,${bufferToBase64(category.Image.data)}`}
                                            alt={category.CategoryName}
                                            style={{ width: "80px", height: "80px", objectFit: "contain" }}
                                        />
                                    </div>
                                    </td>
                                    <td className="px-4 py-3">
                                    <div className="btn-group btn-group-sm">
                                        <button
                                        className="btn btn-outline-primary"
                                        onClick={() => handleEdit(category)}
                                        >
                                        Edit
                                        </button>
                                        <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(category.CategoryID)}
                                        >
                                        Delete
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;