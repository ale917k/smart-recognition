import React, { useState } from "react";

import "./Profile.css";

const Profile = ({ toggleModal, user, loadUser }) => {
  const [name, setName] = useState(user.name);

  const onFormChange = (event) => {
    setName(event.target.value);
  };

  const onProfileUpdate = (data) => {
    fetch(`/api/profile/${user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          toggleModal();
          loadUser({ ...user, ...data });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-modal">
      <article className="relative br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <h1>{name}</h1>
          <h4>{`Image Submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />

          <label className="db fw6 lh-copy f6" htmlFor="user-name">
            Name
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
            onChange={onFormChange}
          />
          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={() => onProfileUpdate({ name })}
            >
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
