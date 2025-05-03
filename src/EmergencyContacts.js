import React, { useState } from 'react';
import './App.css';

const EmergencyContacts = () => {
  const [selectedCountry, setSelectedCountry] = useState(''); // State to manage the selected country

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const getEmergencyContacts = () => {
    switch (selectedCountry) {
      case 'South Africa':
        return (
          <ul>
            <li><strong>South African Suicide Crisis Helpline:</strong> 0800 567 567</li>
            <li><strong>South African Depression and Anxiety Group (SADAG):</strong> 0800 21 22 23</li>
            <li><strong>Local Hospital:</strong> +27 11 771 2222</li>
            <li><strong>Community Clinic:</strong> +27 11 888 8888</li>
          </ul>
        );
      case 'United States':
        return <ul><li><strong>United States:</strong> 911</li></ul>;
      case 'United Kingdom':
        return <ul><li><strong>United Kingdom:</strong> 999</li></ul>;
      case 'Canada':
        return <ul><li><strong>Canada:</strong> 911</li></ul>;
      case 'Australia':
        return <ul><li><strong>Australia:</strong> 000</li></ul>;
      default:
        return <p>Select a country to see emergency contact details.</p>;
    }
  };

  return (
    <section id="emergency" className="info-section">
    <h2>Emergency Contacts</h2>
    <p>If you or someone you know is in immediate danger, please contact your local emergency services:</p>
    <select value={selectedCountry} onChange={handleCountryChange}>
      <option value="">Select a Country</option>
      <option value="South Africa">South Africa</option>
      <option value="United States">United States</option>
      <option value="United Kingdom">United Kingdom</option>
      <option value="Canada">Canada</option>
      <option value="Australia">Australia</option>
      <option value="Israel">Israel</option>
      <option value="Germany">Germany</option>
      <option value="France">France</option>
      <option value="Japan">Japan</option>
      <option value="China">China</option>
      <option value="India">India</option>
      <option value="Brazil">Brazil</option>
      <option value="Mexico">Mexico</option>
      <option value="Italy">Italy</option>
      <option value="Spain">Spain</option>
      <option value="Russia">Russia</option>
      <option value="South Korea">South Korea</option>
      <option value="Netherlands">Netherlands</option>
      <option value="Sweden">Sweden</option>
      <option value="Norway">Norway</option>
      <option value="Denmark">Denmark</option>
      <option value="Finland">Finland</option>
      <option value="Switzerland">Switzerland</option>
      <option value="Turkey">Turkey</option>
      <option value="Saudi Arabia">Saudi Arabia</option>
      <option value="United Arab Emirates">United Arab Emirates</option>
      <option value="Argentina">Argentina</option>
      <option value="Chile">Chile</option>
      <option value="Egypt">Egypt</option>
      <option value="Nigeria">Nigeria</option>
      <option value="Kenya">Kenya</option>
      <option value="New Zealand">New Zealand</option>
      <option value="Singapore">Singapore</option>
    </select>
    <div className="emergency-details">
      {getEmergencyContacts()}
    </div>
  </section>
  
  );
};

export default EmergencyContacts;
