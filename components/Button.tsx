import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button
      style={{
        padding: "8px 16px",
        background: loading ? "#d9d9d9" : "#1890ff",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        cursor: loading ? "not-allowed" : "pointer",
        position: "relative",
      }}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
