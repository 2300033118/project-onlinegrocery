// src/components/Unauthorized.js
export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚫 Access Denied</h1>
      <p>You are not authorized to view this page. Unless you are ADMIN</p>
    </div>
  );
}
