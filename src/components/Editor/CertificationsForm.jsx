import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

export default function CertificationsForm({ data, onChange }) {
  const certifications = data.certifications || [];

  const updateCertifications = (newCerts) => {
    onChange({
      ...data,
      certifications: newCerts
    });
  };

  const handleAdd = () => {
    const newItem = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      date: "",
      credentialUrl: ""
    };
    updateCertifications([...certifications, newItem]);
  };

  const handleRemove = (id) => {
    updateCertifications(certifications.filter(c => c.id !== id));
  };

  const handleChange = (id, field, value) => {
    updateCertifications(certifications.map(c => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  return (
    <div className="editor-subform">
      <div className="flex-between mb-3">
        <span className="text-muted-sm">{certifications.length} certifications</span>
        <button 
          type="button" 
          className="btn btn-sm btn-primary"
          onClick={handleAdd}
        >
          <Plus size={14} /> Add Certification
        </button>
      </div>

      <div className="list-items-container">
        {certifications.map((cert) => (
          <div key={cert.id} className="item-card">
            <div className="item-card-header">
              <div className="item-card-title">
                <Award size={16} className="text-primary" />
                <span>{cert.name || "Untitled Certificate"}</span>
              </div>
              <button 
                type="button" 
                className="icon-btn icon-btn-danger" 
                onClick={() => handleRemove(cert.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="item-card-body">
              <div className="form-grid">
                <div className="form-group col-span-2">
                  <label className="input-label">Certificate Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. AWS Solutions Architect Professional"
                    value={cert.name || ""}
                    onChange={(e) => handleChange(cert.id, "name", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Issuing Organization</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Amazon Web Services"
                    value={cert.issuer || ""}
                    onChange={(e) => handleChange(cert.id, "issuer", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Date or Year</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 2023 or Valid until 2026"
                    value={cert.date || ""}
                    onChange={(e) => handleChange(cert.id, "date", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
