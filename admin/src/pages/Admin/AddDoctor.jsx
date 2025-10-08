import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocImg(e.target.files[0]); // store actual File object
      setPreviewImg(URL.createObjectURL(e.target.files[0])); // store preview URL
    }
  };

  const { backendUrl, aToken } = useContext(AdminContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image not Selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("about", about);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      //console log form data
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      console.log("API Response:", data);
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setFees("");
        setAbout("");
        setExperience("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      {/* Heading outside the form */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Doctor</h2>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-5xl mx-auto">
        {/* Upload Section */}
        <div className="flex items-center gap-4 mb-8">
          <label htmlFor="doc-img">
            <img
              className="w-20 h-20 object-cover bg-gray-100 rounded-full cursor-pointer border"
              src={previewImg || assets.upload_area}
              alt="upload"
            />
          </label>
          <input type="file" id="doc-img" hidden onChange={handleImageChange} />
          <p className="text-sm text-gray-500">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"
          onSubmit={onSubmitHandler}
        >
          {/* Left side */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm">Doctor Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Doctor Email</label>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Doctor Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
                required
              >
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10 year">10 year</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">Fees</label>
              <input
                type="number"
                placeholder=" Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm">Speciality</label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">Education</label>
              <input
                type="text"
                placeholder="Education"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Address</label>
              <input
                type="text"
                placeholder="Address 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-primary mb-2"
              />
              <input
                type="text"
                placeholder="Address 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-primary"
              />
            </div>
          </div>

          {/* About Doctor */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm">About Doctor</label>
            <textarea
              rows={5}
              placeholder="Write about yourself"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full border rounded px-3 py-2 h-24 pt-2 resize-none focus:outline-primary"
            />
          </div>

          {/* Submit button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-all"
            >
              Add doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
