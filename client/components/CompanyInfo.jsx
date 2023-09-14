import React from 'react';

// Sample companyInfo component (you can replace this with your actual component)
const CompanyInfo = ({ companyData }) => {
  return (
    <div>
      <h1>Company Information</h1>
      {companyData.legal_name && <p> &emsp; <b>Legal Name:</b> {companyData.legal_name}</p>}
      {companyData.id && <p> &emsp; <b>ID:</b> {companyData.id}</p>}
      {companyData.ein && <p> &emsp; <b>EIN:</b> {companyData.ein}</p>}
      {companyData.primary_email && <p> &emsp; <b>Primary Email:</b> {companyData.primary_email}</p>}
      {companyData.primary_phone_number&& <p> &emsp; <b>Primary Phone Number:</b> {companyData.primary_phone_number}</p>}
      { companyData.entity && (
        <div>
          <b> &emsp; Entity Information</b>
          {companyData.entity.type && <p> &emsp;  &emsp; <b>Type:</b> {companyData.entity.type}</p>}
          {companyData.entity.subtype && <p> &emsp;  &emsp; <b>Subtype:</b> {companyData.entity.subtype}</p>}
        </div>
        )
      }
      { companyData.departments && companyData.departments.length > 0 && (
      <div>
        <b> &emsp; Departments</b>
        <ul>
          {companyData.departments.map((department, index) => (
            <li key={index}> 
            <div> {department.name} {' '}
                  {department.parent.name && `(parent department: ${department.parent.name})`}
               </div>
            </li>
          ))}
        </ul>
      </div>
      )
      }

      {companyData.locations && (
      <div> 
        <b> &emsp; Locations </b>
        <ul>
          {companyData.locations.map((location, index) => (
            <li key={index}>
              {location.line1}, {location.line2}, {location.city}, {location.state}, {location.postal_code}, {location.country}
            </li>
          ))}
        </ul>
      </div>
      )}

      {companyData.accounts && (
        <div>
          <b>&emsp; Accounts</b>
          <ul>
            {companyData.accounts.map((account, index) => (
              <li key={index}>
                Institution Name: {account.institution_name}<br />
                Account Name: {account.account_name}<br />
                Account Number: {account.account_number}<br />
                Account Type: {account.account_type}<br />
                Routing Number: {account.routing_number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompanyInfo;