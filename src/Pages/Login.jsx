import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    const auth = async() => {
      const token = await localStorage.getItem("token");
      if (token){
        navigate("/")
      }
    }
    auth();
  },[])

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "https://example.com/api/signup",
        values
      );
      alert("Signup successful!");
      navigate("/");
      console.log("Response:", response.data);
      await localStorage.setItem("studentId", response.data.studentId);
      await localStorage.setItem("message", response.data.message);
      await localStorage.setItem("token", response.data.token);
      resetForm();
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Failed to sign up. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white border shadow-lg rounded-lg w-full max-w-4xl overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-blue-900">
          <div
            className="w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto">
          <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900 text-center">
            Login
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-4 text-sm text-gray-600 text-center">
            New user?{" "}
            <a href="/signup" className="text-blue-900 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
