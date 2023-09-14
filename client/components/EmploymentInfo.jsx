import React from 'react';

const EmploymentInfo = ({ employmentData }) => {
  return (
    <div>
      {employmentData.title && <p>&emsp;<b>Title:</b> {employmentData.title}</p>}
      {employmentData.department && <p>&emsp;<b>Department:</b> {employmentData.department.name}</p>}
      {employmentData.employment && (
        <div>
          <p>&emsp;<b>Employment</b></p>
          <p>&emsp; &emsp;<b>Type:</b> {employmentData.employment.type}</p>
          <p>&emsp; &emsp;<b> Subtype:</b> {employmentData.employment.subtype}</p>
        </div>
      )}
      {employmentData.start_date && <p>&emsp;<b>Start Date:</b> {employmentData.start_date}</p>}
      {employmentData.end_date && <p>&emsp;<b>End Date:</b> {employmentData.end_date || 'N/A'}</p>}
      <p>&emsp;<b>Is Active:</b> {employmentData.is_active ? 'Yes' : 'No'}</p>
      {employmentData.manager && <p>&emsp;<b>Manager ID:</b> {employmentData.manager.id}</p>}
      {employmentData.location && (
        <div>
          <p>&emsp;<b>Location:</b></p>
          <p>&emsp;&emsp;{employmentData.location.line1}, {employmentData.location.line2 || 'N/A'},{employmentData.location.city}, {employmentData.location.state} , {employmentData.location.country}, {employmentData.location.postal_code}</p>
        </div>
      )}
      {employmentData.income && (
        <div>
          <p>&emsp;<b>Income:</b></p>
          <p>&emsp;&emsp;<b>Amount:</b> {employmentData.income.amount} {employmentData.income.currency} {employmentData.income.unit}</p>
          <p>&emsp;&emsp;<b>Effective Date:</b> {employmentData.income.effective_date}</p>
        </div>
      )}
      {employmentData.income_history && employmentData.income_history.length > 0 && (
        <div>
          <p>&emsp;<b>Income History:</b></p>
          <ul>
            {employmentData.income_history.map((historyItem, index) => (
              <li key={index}>
                <b>Effective Date:</b> {historyItem.effective_date},{' '}
                <b>Amount:</b> {historyItem.amount}{' '}
                {historyItem.currency} {historyItem.unit}
              </li>
            ))}
          </ul>
        </div>
      )}
      {employmentData.custom_fields && employmentData.custom_fields.length > 0 && (
        <div>
          <p>&emsp;<b>Custom Fields:</b></p>
          <ul>
            {employmentData.custom_fields.map((customField, index) => (
              <li key={index}>{customField.name}: {customField.value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmploymentInfo;
