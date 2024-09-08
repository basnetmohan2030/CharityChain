import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const CountrySelector = ({ onChange }) => {
  const [value, setValue] = useState(null);
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (val) => {
    setValue(val);
    if (onChange) {
      onChange(val); // Pass the selected value to the parent
    }
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Select Country</span>
      </label>
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        placeholder="Choose a country"
        isClearable
      />
    </div>
  );
};

export default CountrySelector;
