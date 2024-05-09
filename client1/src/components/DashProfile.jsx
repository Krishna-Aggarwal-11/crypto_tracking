import { Alert, Button, TextInput, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  logout,
} from "../redux/user/userSlice.js";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    
  };

  if (Object.values(formData).length !== 3) {
    if (!formData.username) {
      setFormData({ ...formData, username: currentUser.data.username });
    } 
    if (!formData.email) {
      setFormData({ ...formData, email: currentUser.data.email });
    }
    if (!formData.password) {
      setFormData({ ...formData, password: currentUser.data.password });
    }
    
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("Please fill all the fields");
      return;
    }

    

    

    try {
      dispatch(updateStart());
      const res = await fetch(`http://localhost/crypto/server/updateuser/${currentUser.data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.errorMessage));
        setUpdateUserError(data.errorMessage);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(
        `http://localhost/crypto/server/deleteuser/${currentUser.data.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.errorMessage));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost/crypto/server/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.errorMessage);
      } else {
        dispatch(logout(data));
      }
    } catch (error) {}
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser?.data.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser?.data.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone={"purpleToBlue"}
          outline
          className="self-center"
          disabled={loading}
        >
          {loading ? "Loading" : "Update"}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleLogout} className="cursor-pointer">
          Logout
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
