import React, { useEffect } from "react";
import Layout from "./Layout";
import * as yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { EmployeeRoles } from "../utils/constant";
import { CustomLoaderButton } from "../components/CustomLoaderButton";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axiosClient";
import { useState } from "react";
import { useMainContext } from "../context/mainContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const { fetchUserProfile } = useMainContext();

  const [loader, setLoader] = useState(true);
  const [emp, setEmp] = useState(null);
  const params = useParams();
  const [imageFile, setImageFile] = useState(null)
  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      const response = await axiosClient.get(`/get-empdetails${params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.data;
      setEmp(data.employee);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchEmployee();
    }
  }, [params]);

  if (loader) {
    return <div className="fixed inset-0 bg-[#1f2937] flex flex-col items-center justify-center z-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      
      {/* Text */}
      <p className="mt-4 text-white text-lg font-semibold animate-pulse">
        Loading...
      </p>
    </div>;
  }

  if (!emp) {
    return <h1 className="text-center text-3xl font-black">Not Found</h1>;
  }

  const initialValues = {
    name: emp?.name || "",
    salary: emp?.salary || 0,
    role: emp?.role || "",
    image: emp?.image || "",
    mobile: emp?.mobile || "",
    email: emp?.email || "",
    address: emp?.address || "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is Required"),
    salary: yup.number().min(1, "Salary cannot be negative or zero").required("Salary is Required"),
    role: yup.string().required("Role is Required"),
    mobile: yup.string().required("Mobile is Required"),
    address: yup.string().required("Address is Required"),
    email: yup.string().required("Email is Required").email("Enter valid Email"),
  });

  const onSubmitHandler = async (values, helpers) => {
    try {
      setLoading(true);

      let imageurl = "";
      let updatedValues = { ...values }; // define it here so it always exists

      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const res = await axiosClient.post(`/upload`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        imageurl = res.data.image;
        updatedValues = { ...values, image: imageurl }; // update when image is uploaded
      }

      const response = await axiosClient.put(
        `/update-emp${params.id}`,
        updatedValues,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      toast.success(response.data.message);
      helpers.resetForm();
      await fetchUserProfile();
      navigate("/all-employee");
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        <Form className="w-[90%] mx-auto py-10">

          <div className="mb-3">
            <label htmlFor="">Employee Name <span className="text-red-500">*</span></label>
            <Field
              type="text"
              name="name"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Name"
            />
            <ErrorMessage
              name="name"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="">
              Employee Role <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              name="role"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
            >
              <option value={""}>------select------</option>
              {EmployeeRoles.map((curr, i) => {
                return (
                  <option key={i} value={curr}>
                    {curr}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage
              name="role"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="">
              Employee Salary <span className="text-red-500">*</span>
            </label>
            <Field
              type="number"
              name="salary"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Salary"
            />
            <ErrorMessage
              name="salary"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="">
              Employee Image <span className="text-red-500">*</span>
            </label>
            <Field
              type="ulr"
              name="image"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Image URL"
            />
            <ErrorMessage
              name="image"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div> */}

          <div className="mb-3">
            <label>
              Employee Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
              }}
              className="w-full py-2 border border-gray-300 rounded outline-none px-3"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="">
              Employee Mobile Number <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="mobile"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Mobile Number"
            />
            <ErrorMessage
              name="mobile"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="">
              Employee Email <span className="text-red-500">*</span>
            </label>
            <Field
              type="email"
              name="email"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Email"
            />
            <ErrorMessage
              name="email"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="">
              Employee Address <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              rows={2}
              name="address"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Address"
            />
            <ErrorMessage
              name="address"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-3">
            <CustomLoaderButton isLoading={loading} text="Update Employee" />
          </div>

        </Form>
      </Formik>
    </Layout>
  );
};

export default UpdateEmployee;