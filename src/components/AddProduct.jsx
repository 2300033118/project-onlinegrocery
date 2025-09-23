import React, { useState } from "react";

const AddProduct = () => {
  const API = "http://localhost:8084";

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(form)], { type: "application/json" }));
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const response = await fetch(`${API}/api/products`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("✅ Product saved successfully!");
      } else {
        alert("❌ Failed to save product.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Error saving product.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="number" name="stock" placeholder="Stock" onChange={handleChange} />
      <input type="file" onChange={handleFileChange} />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
