import React from "react";

export default function Alert(props) {
  const cpaitalized = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    props.alert && (
      <>
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show fixed-top`}
          role="alert"
        >
          <strong>
            {props.alert.type === "danger"
              ? "Error"
              : cpaitalized(props.alert.type)}
          </strong>
          : {props.alert.msg}
        </div>
      </>
    )
  );
}
