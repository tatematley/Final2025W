import { useState } from 'react';
import { updateEntertainer } from '../api/EntertainerApi';
import { Entertainer } from '../types/entertainer';

interface EditEntertainerFormProps {
    entertainer: Entertainer;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditEntertainerForm = ({
    entertainer,
    onSuccess,
    onCancel,
}: EditEntertainerFormProps) => {
  const [formData, setFormData] = useState<Entertainer>({ ...entertainer });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEntertainer(formData.entertainerID, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit An Entertainer</h2>
      <label>
        Stage Name:
        <input
          type="text"
          name="entStageName"
          value={formData.entStageName}
          onChange={handleChange}
        />
      </label>
      <label>
        SSN:
        <input
          type="text"
          name="entssn"
          value={formData.entssn}
          onChange={handleChange}
        />
      </label>
      <label>
        Street Address:
        <input
          type="text"
          name="entStreetAddress"
          value={formData.entStreetAddress}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="entCity"
          value={formData.entCity}
          onChange={handleChange}
        />
      </label>
      <label>
        State:
        <input
          type="text"
          name="entState"
          value={formData.entState}
          onChange={handleChange}
        />
      </label>
      <label>
        Zip Code:
        <input
          type="text"
          name="entZipCode"
          value={formData.entZipCode}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          name="entPhoneNumber"
          value={formData.entPhoneNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        Web Page:
        <input
          type="text"
          name="entWebPage"
          value={formData.entWebPage}
          onChange={handleChange}
        />
      </label>
      <label>
        Email Address:
        <input
          type="text"
          name="entEMailAddress"
          value={formData.entEMailAddress}
          onChange={handleChange}
        />
      </label>
      <label>
        Date Entered:
        <input
          type="text"
          name="dateEntered"
          value={formData.dateEntered}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Entertainer</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditEntertainerForm;