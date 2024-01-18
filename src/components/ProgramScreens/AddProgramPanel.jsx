import {  useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPanel = ({ setUpdatedPrograms,onDeleteButtonClick }) => {
  const [programs, setPrograms] = useState({
    name: "",
    price: 0,
    domain: "",
    program_type: "",
    registrations_status: "",
    description: "",
    placement_assurance: false,
    image_url: "",
    university_name: "",
    faculty_profile: "",
    learning_hours: 0,
    certificate_diploma: "",
    eligibility_criteria: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio" || type === "checkbox") {
      setPrograms((prev) => ({ ...prev, [name]: value  }));
    } else {
      setPrograms((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChangeInCheckBox = (e) => {
    const { name, value } = e.target;
    let modifiedValue = value === "on" ? true : false;
    setPrograms((prev) => ({ ...prev, [name]: modifiedValue }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      !programs.name ||
      !programs.price ||
      !programs.domain ||
      !programs.learning_hours ||
      !programs.image_url ||
      !programs.program_type ||
      !programs.registrations_status ||
      !programs.university_name ||
      !programs.certificate_diploma ||
      !programs.description
    ) {
      alert("Please fill in all the required fields marked with '*'");
      return;
    }
    try {
      await axios.post('/routes/programs', programs);
      alert("Program Created Successfully");
      setUpdatedPrograms((UpdatedPrograms) => {!UpdatedPrograms});
      window.location.reload();
      
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Request made but no response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className="px-10 py-12 w-full max-w-screen-lg mx-auto bg-gray-100">
      <h1 className="text-3xl font-bold mb-2 text-black">Add Program</h1>
      <p className="text-sm text-black mb-4"><span className="text-red-500">*</span> Required to save as Program</p>

      <h2 className="text-2xl font-bold mb-2 text-black">Confirm Program</h2>

      {/* Horizontal Alignment of Domain, Price, and Placement Assurance */}
      <div className="flex items-center mb-4 space-x-40">
        {/* Price Text-field */}
        <div className="flex flex-col">
          <label htmlFor="price" className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> Price
          </label>
          <div className="relative w-48">
            <span className="absolute inset-y-0 left-2 flex items-center text-gray-600">INR</span>
            <input
              onChange={handleChange}
              type="Number"
              id="price"
              name="price"
              className="block w-full border border-gray-400 rounded-md py-1.5 pl-8 pr-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter price"
            />
          </div>
        </div>

        {/* Domain Drop-down */}
        <div className="flex flex-col">
          <label htmlFor="domain" className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> Domain
          </label>
          <select
            onChange={handleChange}
            id="domain"
            name="domain"
            className="block border border-gray-400 rounded-md py-1.5 pl-2 pr-6 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled selected>Choose Domain</option>
            <option value="tech">Tech</option>
            <option value="data">Data</option>
            <option value="finance">Finance</option>
          </select>
        </div>

        {/* Placement Assurance Checkbox */}
        <div className="flex items-center">
          <input
            onChange={handleChangeInCheckBox}
            type="checkbox"
            id="placement_assurance"
            name="placement_assurance"
            className="mr-2"
          />
          <label htmlFor="placement_assurance" className="text-black font-bold">Placement Assurance</label>
        </div>
      </div>

      {/* Information Line */}
      <div className="mb-4">
        <p className="text-xs text-gray-500">You are licensed to sell on this price.</p>
      </div>

      {/* Information Sub-heading */}
      <h2 className="text-lg font-bold mb-2 text-black">Information</h2>

      {/* Name, Program Type, Registration Open in a single horizontal line */}
      <div className="flex items-center mb-4 space-x-8">
        {/* Name Text-box */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            className="block border border-gray-400 rounded-md py-1.5 pl-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter name"
          />
        </div>

        {/* Program Type Radio Buttons */}
        <div className="flex flex-col">
          <label className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> Program Type
          </label>
          <div className="flex items-center space-x-4">
            <label htmlFor="ft">
              <input onChange={handleChange} type="radio" id="ft" name="program_type" value="FT" className="mr-1" />
              FT
            </label>
            <label htmlFor="pt">
              <input onChange={handleChange} type="radio" id="pt" name="program_type" value="PT" className="mr-1" />
              PT
            </label>
          </div>
        </div>

        {/* Registration Open Radio Buttons */}
        <div className="flex flex-col">
          <label className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> Registration Open
          </label>
          <div className="flex items-center space-x-4">
            <label htmlFor="yes">
              <input onChange={handleChange} type="radio" id="yes" name="registrations_status" value="Yes" className="mr-1" />
              Yes
            </label>
            <label htmlFor="no">
              <input onChange={handleChange} type="radio" id="no" name="registrations_status" value="No" className="mr-1" />
              No
            </label>
          </div>
        </div>
      </div>

      {/* University Name, Certificate/Diploma, Faculty Profile in a single horizontal line */}
      <div className="flex items-center mb-4 space-x-8">
        {/* University Name Text-box */}
        <div className="flex flex-col">
          <label htmlFor="university_name" className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> University Name/Partner
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="university_name"
            name="university_name"
            className="block border border-gray-400 rounded-md py-1.5 pl-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter university name/partner"
          />
        </div>

        {/* Certificate/Diploma Drop-down */}
        <div className="flex flex-col">
          <label htmlFor="certificate_diploma" className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> Certificate or Diploma
          </label>
          <select
            onChange={handleChange}
            id="certificate_diploma"
            name="certificate_diploma"
            className="block border border-gray-400 rounded-md py-1.5 pl-2 pr-6 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled selected>Select</option>
            <option value="certificate">Certificate</option>
            <option value="diploma">Diploma</option>
          </select>
        </div>

        {/* Faculty Profile Text-box */}
        <div className="flex flex-col">
          <label htmlFor="faculty_profile" className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> Faculty Profile
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="faculty_profile"
            name="faculty_profile"
            className="block border border-gray-400 rounded-md py-1.5 pl-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Linkedin Url"
          />
        </div>
      </div>

      {/* Learning Hours/Duration, Eligibility Criteria, Image Url in a single horizontal line */}
      <div className="flex items-center mb-4 space-x-8">
        {/* Learning Hours/Duration Text-box */}
        <div className="flex flex-col">
          <label htmlFor="learning_hours" className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> Learning Hours/Duration
          </label>
          <input
            onChange={handleChange}
            type="number"
            id="learning_hours"
            name="learning_hours"
            className="block border border-gray-400 rounded-md py-1.5 pl-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter learning hours/duration"
          />
        </div>

        {/* Eligibility Criteria Text-box */}
        <div className="flex flex-col">
          <label htmlFor="eligibility_criteria" className="text-black mb-2 font-bold">
            Eligibility Criteria
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="eligibility_criteria"
            name="eligibility_criteria"
            className="block border border-gray-400 rounded-md py-1.5 pl-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter eligibility criteria"
          />
        </div>

        {/* Image Url Text-box */}
        <div className="flex flex-col">
          <label htmlFor="image_url" className="text-black mb-2 font-bold">
            <span className="text-red-500">*</span> Image Url
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="image_url"
            name="image_url"
            className="block border border-gray-400 rounded-md py-1.5 pl-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter image url"
          />
        </div>
      </div>

      {/* Description Text-box */}
      <div className="flex flex-col mb-4">
        <label htmlFor="description" className="text-black mb-2 font-bold">
          <span className="text-red-500">*</span> Description
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="description"
          name="description"
          className="block border border-gray-400 rounded-md py-1.5 pl-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Program Information / Header"
        />
      </div>

      {/* Delete, Save Draft, Save Program Buttons */}
      <div className="flex justify-between mb-8">
        {/* Delete Button */}
        <button onClick={onDeleteButtonClick} className="bg-red-500 text-white px-4 py-2 flex items-center space-x-2">
          <span>Delete</span>
          {/* Add Delete icon here if you have one */}
        </button>

        {/* Save Draft Button */}
        <button className="bg-white text-black px-4 py-2">Save Draft</button>

        {/* Save Program Button */}
        <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2">Save Program</button>
      </div>
    </div>
  );
};

export default AddPanel;
