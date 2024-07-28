"use client";

import React, { useRef } from 'react';
import { userDataSchema, UserData } from '@/interfaces/userData';

const SignupForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Form Button Clicked")
    const formData = new FormData(formRef.current!);
    const data = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      dob: formData.get('dob') as string,
      profession: formData.get('profession') as string,
    };
    console.log(data);

    const pass1 = formData.get('password') as string;
    const pass2 = formData.get('confirmPassword') as string;


    // Error Object for indicating errors in the frontend
    const errorObj: Record<string, string> = {};
    
    // Compare the password and its retype.
    if(!comparePasswords(pass1, pass2)) {
      errorObj.confirmPassword = "Passwords do not match";  
      return;
    }

    // Validate data through zod schema 
    const validationResult = userDataSchema.safeParse(data);
    if (!validationResult.success) {
      console.log("Error Occurred")
      validationResult.error.errors.forEach((error) => {
        console.log(error)
        errorObj[error.path[0] as string] = error.message;
      });

      // Set the errors object to indicate errors at respective places.
      setErrors(errorObj);
      return;
    } else {
      // Handle successful form submission
      console.log('Form submitted successfully', validationResult.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4">
      <div className="w-full max-w-md p-8 space-y-2 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className={`w-full px-2 py-1 mt-1 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full px-2 py-1 mt-1 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`w-full px-2 py-1 mt-1 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={`w-full px-2 py-1 mt-1 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              className={`w-full px-2 py-1 mt-1 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.first_name && <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>}
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              className={`w-full px-2 py-1 mt-1 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.last_name && <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>}
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              className={`w-full px-2 py-1 mt-1 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.dob && <p className="mt-2 text-sm text-red-600">{errors.dob}</p>}
          </div>
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
              Profession
            </label>
            <input
              id="profession"
              name="profession"
              type="text"
              className={`w-full px-2 py-1 mt-1 border ${errors.profession ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.profession && <p className="mt-2 text-sm text-red-600">{errors.profession}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

const comparePasswords = (pass1: string, pass2: string) => {
  return (pass1 === pass2);
};