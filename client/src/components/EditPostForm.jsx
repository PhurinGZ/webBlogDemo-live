// EditPostForm.jsx

const EditPostForm = ({ onSubmit, title, onTitleChange, description, onDescriptionChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="postTitle" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          id="postTitle"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postDescription" className="form-label">
          Post Description
        </label>
        <textarea
          className="form-control"
          id="desc"
          rows="10"
          cols="30"
          name="desc"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        ></textarea>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
