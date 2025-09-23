import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const API = "http://localhost:8084";

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Product Management</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Image</th><th>Name</th><th>Price</th><th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                {p.image ? (
                  <img src={`${API}/uploads/${p.image}`} alt={p.name} width="60" />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
