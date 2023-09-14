import React from 'react';

// Sample companyInfo component (you can replace this with your actual component)
const IndividualInfo = ({ individualData }) => {
  const residenceData = () => {
    const residence = individualData.residence || {};
    return [individualData.residence.line1,individualData.residence.line2,individualData.residence.city,individualData.residence.state,individualData.residence.postal_code,individualData.residence.country].filter(Boolean).join(', ');
  }
  return (
    <div>
      <h1> Employee Information</h1>
      {individualData.first_name && <p> &emsp; <b>First Name: </b> {individualData.first_name} </p>}
      {individualData.middle_name && <p> &emsp; <b>Middle Name: </b> {individualData.middle_name} </p>}
      {individualData.last_name && <p> &emsp; <b>Last Name: </b> {individualData.last_name} </p>}
      {individualData.preferred_name && <p> &emsp; <b>Preffered Name: </b> {individualData.preferred_name} </p>}
      {individualData.emails && individualData.emails.length > 0 &&
        <div>
          <b> &emsp; Emails:</b>
          <ul>
            {individualData.emails.map((email, index) => (
              <li key={index}> <b>{email.type}</b>: {email.data}</li>
            ))}
          </ul>
        </div>
      }
      {individualData.phone_numbers && individualData.phone_numbers.length > 0 &&
        <div>
          <b> &emsp; Phone Numbers:</b>
          <ul>
            {individualData.phone_numbers.map((number, index) => (
              <li key={index}> <b>{ number.type && (number.type + ':')}</b> {number.data} </li>
            ))}
          </ul>
        </div>
      }
      {individualData.gender && <p> &emsp; <b>Gender: </b> {individualData.gender} </p>}
      {individualData.ethnicity && <p> &emsp; <b>Ethnicity: </b> {individualData.ethnicity} </p>}
      {individualData.dob && <p> &emsp; <b>Date of Birth: </b> {individualData.dob} </p>}
      {individualData.ssn && <p> &emsp; <b>SSN: </b> {individualData.ssn} </p>}
      {residenceData() && ( 
      <div>
        <p> &emsp; <b>Residence: </b> {residenceData()} </p>  
      </div>
      )}
    </div>
  );
};

export default IndividualInfo;