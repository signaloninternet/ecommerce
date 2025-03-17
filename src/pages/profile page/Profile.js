import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config";
import "./profile.css";
import NavBar from "../../features/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile on component mount
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(
          `${config.DATABASE_URL}/user/profile`,
          {
            headers: { Authorization: token },
          }
        );

        const { name, gender, email, mobile, address, profileImageUrl } =
          response.data;
        const profilePic = profileImageUrl;
        setName(name || "");
        setGender(gender || "");
        setEmail(email || "");
        setMobile(mobile || "");
        setAddress(address || "");
        setProfilePicUrl(profilePic || "");
        if (profilePic) {
          setProfilePic(profilePic);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=e93ded634bc86ba972cfcdcee0ded9cc",
          formData
        );
        const imageUrl = response.data.data.url;
        console.log(imageUrl);
        setProfilePicUrl(imageUrl);
        setProfilePic(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      name,
      gender,
      email,
      mobile,
      address,
      profileImageUrl: profilePicUrl,
    };

    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      await axios.put(`${config.DATABASE_URL}/user/profile`, updatedProfile, {
        headers: { Authorization: token },
      });
      navigate("/");
      toast.success("Profile updated successfully!"); // Success message
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile"); // Error message
    }
};


  return (
    <>
      <NavBar />
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-form-container">
            <h2>Profile Information</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group profile-pic-group">
                <label htmlFor="profilePic" className="profile-pic-label">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="profile-pic-preview"
                    />
                  ) : (
                    <div className="profile-pic-placeholder">Upload Photo</div>
                  )}
                </label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="profile-pic-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Your Gender</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button type="submit" className="update-btn">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
