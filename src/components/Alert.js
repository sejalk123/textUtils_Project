import React from "react";

function Alert(props) {
  const capitalize= (word)=>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div style={{height: '50px'}}>
    {/* //in below line whenever we will use && then at first props.alert will get evalutated and if it get false or null then remaining things will not be evaluated and if it will be true then second thing will be evaluated */}
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>}
      </div>
   
  );
}

export default Alert;
