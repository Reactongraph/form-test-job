import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { users, dispatch } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const DeleteItem = () => {
    dispatch({
      type: "DELETE_USER",
      payload: Number(deleteId),
    });
    setIsModalOpen(false);
  };
  return (
    <div className="p-8">
      <div className="max-w-full bg-white p-8 rounded mt-4 ">
        <div className="col-span-full mb-4">
          <h1 className="text-2xl font-bold mb-2">User Management</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/add")}
          >
            Add User
          </button>
        </div>
        <div className="grid grid-cols-9 gap-4 w-full p-4">
          <div className=" font-bold">ID</div>
          <div className=" font-bold">First Name</div>
          <div className=" font-bold">Last Name</div>
          <div className=" font-bold">Photo</div>
          <div className=" font-bold">Gender</div>
          <div className="font-bold">Email</div>
          <div className=" font-bold">Mobile Number</div>
          <div className=" font-bold">Date of Birth</div>
          <div className=" font-bold">Action</div>
          {users.length > 0 ? (
            users.map((user) => (
              <React.Fragment key={user?.id}>
                <div className="col-span-1  ">{user?.id}</div>
                <div className="col-span-1">{user?.firstName}</div>
                <div className="col-span-1">{user?.lastName}</div>
                <div className="col-span-1">
                  <img src={user.photo[0]} alt="img" />
                </div>
                <div className="col-span-1">{user.gender}</div>
                <div className="col-span-1">{user.email}</div>
                <div className="col-span-1">{user.mobileNumber}</div>
                <div className="col-span-1">{user.dateOfBirth}</div>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1  border border-gray-300"
                    onClick={() => navigate(`/edit/${user.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1  border border-gray-300 "
                    onClick={() => {
                      setIsModalOpen(true);
                      setDeleteId(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            ))
          ) : (
            <div className="w-full flex justify-center items-center">
              No Data
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <p>Do you want to delete the data?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => DeleteItem()}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
