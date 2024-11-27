import React,{useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const initialValues = {
    specialisation_id: 0,
    placement_id: 0,
    roll_number: "",
    first_name: "",
    last_name: "",
    photograph_path:"None",
    email: "",
    password: "",
    cgpa:0,
    total_credits:0,
    domain:0,
    confirm_password: "",
    graduation_year: "",
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
    roll_number: Yup.string().required("Roll number is required."),
    first_name: Yup.string().required("First name is required."),
    last_name: Yup.string().required("Last name is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm password is required."),
    graduation_year: Yup.string()
      .matches(/^\d{4}$/, "Graduation year must be a 4-digit number.")
      .required("Graduation year is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const navigate= useNavigate()
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "https://example.com/api/signup",
        values
      );
      alert("Signup successful!");
      navigate("/login")
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
            Sign up
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
                    htmlFor="roll_number"
                    className="block text-sm text-gray-600"
                  >
                    Roll Number
                  </label>
                  <Field
                    name="roll_number"
                    type="text"
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Enter your roll number"
                  />
                  <ErrorMessage
                    name="roll_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm text-gray-600"
                  >
                    First Name
                  </label>
                  <Field
                    name="first_name"
                    type="text"
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm text-gray-600"
                  >
                    Last Name
                  </label>
                  <Field
                    name="last_name"
                    type="text"
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
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
                <div>
                  <label
                    htmlFor="confirm_password"
                    className="block text-sm text-gray-600"
                  >
                    Confirm Password
                  </label>
                  <Field
                    name="confirm_password"
                    type="password"
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="graduation_year"
                    className="block text-sm text-gray-600"
                  >
                    Graduation Year
                  </label>
                  <Field
                    name="graduation_year"
                    type="text"
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Enter your graduation year"
                  />
                  <ErrorMessage
                    name="graduation_year"
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
            Already have an account?{" "}
            <a href="/login" className="text-blue-900 font-semibold">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
