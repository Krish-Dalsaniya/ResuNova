import React, { useRef } from 'react';
import { User, Mail, Phone, MapPin, Globe, Image, Trash2, Upload } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';
import { showAlert, showConfirm } from '../../utils/alert';

export default function PersonalInfoForm({ data, onChange }) {
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      showAlert({
        title: "File Too Large",
        text: "Image file size should be less than 8MB. Please select a smaller photo.",
        icon: "warning"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // Optimize avatar resolution (max 320x320) so it's super crisp but fits in localStorage
        const maxDim = 320;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.92);

        // Atomic update of both avatar and showAvatar!
        onChange({
          ...data,
          personalInfo: {
            ...data.personalInfo,
            avatar: optimizedDataUrl,
            showAvatar: true
          }
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveImage = async () => {
    const confirmed = await showConfirm({
      title: "Remove Photo?",
      text: "Are you sure you want to remove your profile photo?",
      icon: "question",
      confirmButtonText: "Yes, Remove",
      isDanger: true
    });
    if (!confirmed) return;

    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        avatar: "",
        showAvatar: false
      }
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { personalInfo } = data;

  return (
    <div className="editor-subform">
      {/* Profile Photo Control */}
      <div className="avatar-control-card">
        <div className="avatar-preview-box">
          {personalInfo.avatar ? (
            <img src={personalInfo.avatar} alt="Avatar Preview" className="avatar-img-preview" />
          ) : (
            <div className="avatar-placeholder">
              <User size={32} />
            </div>
          )}
        </div>
        <div className="avatar-actions">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          <div className="btn-group">
            <button 
              type="button" 
              className="btn btn-sm btn-secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={14} /> Upload Photo
            </button>
            {personalInfo.avatar && (
              <button 
                type="button" 
                className="btn btn-sm btn-outline-danger"
                onClick={handleRemoveImage}
              >
                <Trash2 size={14} /> Remove
              </button>
            )}
          </div>
          <label className="checkbox-label mt-2">
            <input 
              type="checkbox" 
              checked={personalInfo.showAvatar || false}
              onChange={(e) => handleChange("showAvatar", e.target.checked)}
            />
            <span>Show photo on resume</span>
          </label>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="form-grid">
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="input-label">Full Name</label>
          <div className="input-with-icon">
            <User size={15} className="input-icon" />
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Alex Morgan"
              value={personalInfo.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="input-label">Professional Job Title</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g. Lead Full-Stack Software Engineer"
            value={personalInfo.jobTitle || ""}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
          />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="input-label">Email Address</label>
          <div className="input-with-icon">
            <Mail size={15} className="input-icon" />
            <input 
              type="email" 
              className="form-input" 
              placeholder="e.g. alex@example.com"
              value={personalInfo.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="input-label">Phone Number</label>
          <div className="input-with-icon">
            <Phone size={15} className="input-icon" />
            <input 
              type="tel" 
              className="form-input" 
              placeholder="e.g. +1 (555) 234-5678"
              value={personalInfo.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="input-label">Location</label>
          <div className="input-with-icon">
            <MapPin size={15} className="input-icon" />
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. San Francisco, CA"
              value={personalInfo.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="input-label">Portfolio Website</label>
          <div className="input-with-icon">
            <Globe size={15} className="input-icon" />
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. https://alexmorgan.dev"
              value={personalInfo.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="input-label">LinkedIn Profile</label>
          <div className="input-with-icon">
            <LinkedinIcon size={15} className="input-icon" />
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. linkedin.com/in/username"
              value={personalInfo.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="input-label">GitHub / Portfolio</label>
          <div className="input-with-icon">
            <GithubIcon size={15} className="input-icon" />
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. github.com/username"
              value={personalInfo.github || ""}
              onChange={(e) => handleChange("github", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
