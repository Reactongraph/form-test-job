import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchema } from "../../validation";
import { useUserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  photo: any;
  gender: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  city: string;
  professionalSkills: string[];
}

const initialValues: FormData = {
  firstName: "",
  lastName: "",
  photo: "",
  gender: "",
  email: "",
  mobileNumber: "",
  dateOfBirth: "",
  city: "",
  professionalSkills: [],
};

const AddForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch, users }: any = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const updatedUser =
    userId && users.filter((user: any) => Number(user?.id) === Number(userId));
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    defaultValues: updatedUser?.length > 0 ? updatedUser?.[0] : initialValues,
  });
  const onSubmit = () => {
    setIsModalOpen(true);
  };
  console.log("user>>",users)
  const onSave = (data: FormData) => {
    if (data) {
      if (updatedUser && updatedUser?.length > 0) {
        dispatch({
          type: "UPDATE_USER",
          payload: {
            id: userId,
            user: { ...data },
          },
        });
      }
      dispatch({
        type: "ADD_USER",
        payload: {
          id: Number(Date.now()),
          ...data,
        },
      });
    }
    setIsModalOpen(false);
    navigate("/");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto border border-gray-300  max-w-[1200px] px-10 py-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">
          {updatedUser?.length > 0 ? "Edit User" : "Add User"}
        </h1>
        <button
          type="button"
          onClick={() => {
            reset();
            setSelectedImage(null);
          }}
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Reset Form
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName")}
            type="text"
            id="firstName"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
          />
          <span className="text-red-500">
            {errors && errors.firstName && errors.firstName.message}
          </span>
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register("lastName")}
            type="text"
            id="lastName"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
          />
          <span className="text-red-500">
            {errors && errors.lastName && errors.lastName.message}
          </span>
        </div>

        <div>
          <label htmlFor="photo">Photo</label>
          <div className="w-full flex px-4 py-2 mt-1 border border-gray-300 rounded-md">
            <input
              {...register("photo")}
              type="file"
              id="photo"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <div>
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="rounded-md shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label>Gender</label>
          <div>
            <input
              type="radio"
              {...register("gender")}
              value="male"
              id="male"
            />
            <label htmlFor="male" className="ml-2">
              Male
            </label>
          </div>
          <div>
            <input
              type="radio"
              {...register("gender")}
              value="female"
              id="female"
            />
            <label htmlFor="female" className="ml-2">
              Female
            </label>
          </div>
        </div>
        <span className="text-red-500">
          {errors && errors.gender && errors.gender.message}
        </span>

        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
          />
          <span className="text-red-500">
            {errors && errors.email && errors.email.message}
          </span>
        </div>

        <div>
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            {...register("mobileNumber")}
            type="text"
            id="mobileNumber"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
          />
          <span className="text-red-500">
            {errors && errors.mobileNumber && errors.mobileNumber.message}
          </span>
        </div>

        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            {...register("dateOfBirth")}
            type="date"
            id="dateOfBirth"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
          />
          <span className="text-red-500">
            {errors && errors.dateOfBirth && errors.dateOfBirth.message}
          </span>
        </div>

        <div>
          <label htmlFor="city">City</label>
          <select
            {...register("city")}
            id="city"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </div>
        <span className="text-red-500">
          {errors && errors.city && errors.city.message}
        </span>

        <div className="space-y-2">
          <label className="block font-bold">Professional Skills</label>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("professionalSkills")}
              value="Communication"
              id="communication"
              className="mr-2"
            />
            <label htmlFor="communication">Communication</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("professionalSkills")}
              value="CriticalThinking"
              id="criticalThinking"
              className="mr-2"
            />
            <label htmlFor="criticalThinking">Critical Thinking</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("professionalSkills")}
              value="ProblemSolving"
              id="problemSolving"
              className="mr-2"
            />
            <label htmlFor="problemSolving">Problem Solving</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("professionalSkills")}
              value="Initiative"
              id="initiative"
              className="mr-2"
            />
            <label htmlFor="initiative">Initiative</label>
          </div>
        </div>
        <span className="text-red-500">
          {errors &&
            errors.professionalSkills &&
            errors.professionalSkills.message}
        </span>

        <div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {updatedUser?.length > 0 ? "Update" : "Save"}
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <p>Do you want to save the data?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSave)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {updatedUser?.length > 0 ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddForm;
