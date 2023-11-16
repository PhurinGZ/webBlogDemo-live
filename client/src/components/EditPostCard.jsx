// EditPostCard.jsx
import React from "react";

const EditPostCard = ({ children }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header">
              <h3 className="text-center">Update Post</h3>
            </div>
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostCard;
