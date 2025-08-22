import { useState } from "react";

const CategoryForm = () => {
    const [form, setForm] = useState({
        CategoryID: "",
        CategoryName: "",
        Description: "",
        Mime: ""
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUploadedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("CategoryID", form.CategoryID);
        formData.append("CategoryName", form.CategoryName);
        formData.append("Description", form.Description);

        if (uploadedFile) {
            formData.append("Mime", uploadedFile.type);   
            formData.append("Image", uploadedFile);
        }
        
        await fetch("http://localhost:5000/api/categories", {
            method: "POST",
            body: formData,
        });

        setShowSuccess(true)
    };

    return (
        <div className="col-lg-12">
            <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body row">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-semibold mb-0">Agregar nueva categoría</h5>
                    </div>

                    {/* ID Field */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-medium text-secondary small">Identificador de categoría</label>
                        <input
                            type="text"
                            className="form-control"
                            name="CategoryID"
                            value={CategoryForm.CategoryID}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Name Field */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-medium text-secondary small">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="CategoryName"
                            value={CategoryForm.CategoryName}
                            onChange={handleChange}
                            placeholder="e.g., LigaTica, LigaMX, MLS"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="mb-3">
                        <label className="form-label fw-medium text-secondary small">Descripción</label>
                        <textarea
                            className="form-control"
                            name="Description"
                            value={CategoryForm.Description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Descripción de la categoría como equipos que participan..."
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="form-label fw-medium text-secondary small">Image</label>
                        <div className="border border-2 border-dashed rounded-3 bg-light p-4 text-center">
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg, image/png, image/jpeg"
                                onChange={handleFileChange}
                                className="d-none"
                                id="image-upload"
                            />
                            <label htmlFor="image-upload" className="d-block text-muted mb-0" role="button">
                                <i className="bi bi-upload me-2"></i>
                                {uploadedFile ? uploadedFile.name : 'Click para cargar la imagen de la categoría'}
                            </label>
                        </div>
                        <div className="form-text">PNG or JPG up to 5MB.</div>
                    </div>

                    {/* Add Category Button */}
                    <div className="d-grid">
                        <button
                            className="btn btn-success"
                            onClick={handleSubmit}
                        >
                            <i className="bi bi-check me-2"></i>
                            Agregar categoría
                        </button>
                    </div>
                </div>
                {/* Success Message */}
                {showSuccess && (
                <div className="col-12">
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="bi bi-check-circle me-2"></i>
                    Categoría agregada exitosamente!
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default CategoryForm;