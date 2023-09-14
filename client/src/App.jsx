import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyInfo from '../components/CompanyInfo';
import IndividualInfo from '../components/IndividualInfo';
import EmploymentInfo from '../components/EmploymentInfo';

// Set the default base URL for Axios
axios.defaults.baseURL = 'http://localhost:8000';

const App = () => {
  // Define state variables to manage application data
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [fetchingDataCompany, setFetchingDataCompany] = useState(false);
  const [fetchingDataEmployee, setFetchingDataEmployee] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [directoryData, setDirectoryData] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState('');
  const [selectedDirectoryId, setSelectedDirectoryId] = useState(null);
  const [employmentData, setEmploymentData] = useState(null);
  const [individualData, setIndividualData] = useState(null);
  const [error, setError] = useState(null);

  // Reset the application state related to company and directory data
  const resetStatesCompany = () => {
    setSelectedProviderId(null);
    setCompanyData(null);
    setDirectoryData([]);
    setSelectedDirectoryId(null);
    setEmploymentData(null);
    setIndividualData(null);
    setError(null);
  };

  // Reset the application state related to employee data
  const resetStatesEmployee = () => {
    setSelectedDirectoryId(null);
    setEmploymentData(null);
    setIndividualData(null);
  };

  useEffect(() => {
    // Fetch the list of providers from the API when the component mounts
    axios
      .get('https://api.tryfinch.com/providers', {
        headers: {
          'Finch-API-Version': '2020-09-17',
        },
      })
      .then((response) => {
        setProviders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching providers:', error);
        setError('Failed to fetch providers. Please try again later.');
      });
  }, []);

  // Handle provider selection
  const handleProviderSelect = (event) => {
    const displayName = event.target.value;
    setSelectedProvider(displayName);

    // Find the selected provider's ID based on the display name
    const selectedProviderObject = providers.find(
      (provider) => provider.display_name === displayName
    );

    if (selectedProviderObject) {
      setSelectedProviderId(selectedProviderObject.id);
    }
  };

  // Handle directory selection
  const handleDirectorySelect = (event) => {
    const displayName = event.target.value;
    setSelectedDirectory(displayName);

    // Find the selected directory's ID based on the full name
    const selectedDirectoryObject = directoryData.find(
      (directory) => `${directory.first_name} ${directory.last_name}` === displayName
    );

    if (selectedDirectoryObject) {
      setSelectedDirectoryId(selectedDirectoryObject.id);
    }
  };

  // Fetch company data when the "Fetch Company Data" button is clicked
  const fetchCompanyData = async () => {
    if (selectedProviderId) {
      setFetchingDataCompany(true);

      try {
        resetStatesCompany();
        // Make a GET request to fetch an access token
        const createResponse = await axios.get(`/create?provider_id=${selectedProviderId}`);
        setFetchingDataCompany(false);

        // Fetch company data
        const companyResponse = await axios.get('/company');
        setCompanyData(companyResponse.data);

        // Fetch directory data
        const directoryResponse = await axios.get('/directory');
        setDirectoryData(directoryResponse.data);
      } catch (error) {
        console.error('Error fetching company data:', error);
        setError('Failed to fetch company data. Please try another provider.');
        setFetchingDataCompany(false);
      }
    }
  };

  // Fetch employee data when the "Fetch Employee Data" button is clicked
  const fetchEmployeeData = async () => {
    if (selectedDirectoryId) {
      setFetchingDataEmployee(true);

      const data = {
        requests: [
          {
            individual_id: selectedDirectoryId,
          },
        ],
      };

      try {
        resetStatesEmployee();
        // Fetch employment data
        const employmentResponse = await axios.post('/employment', data);
        setEmploymentData(employmentResponse.data);

        // Fetch individual data
        const individualResponse = await axios.post('/individual', data);
        setIndividualData(individualResponse.data);

        setFetchingDataEmployee(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('Failed to fetch employee data. Please try another Employee');
        setFetchingDataEmployee(false);
      }
    }
  };

  return (
    <div>
      <h1>Select a Provider</h1>
      <select value={selectedProvider} onChange={handleProviderSelect}>
        <option value="" disabled>
          Select a provider
        </option>
        {providers.map((provider) => (
          <option key={provider.id} value={provider.display_name}>
            {provider.display_name}
          </option>
        ))}
      </select>
      <button onClick={fetchCompanyData} disabled={fetchingDataCompany}>
        {fetchingDataCompany ? 'Fetching Data...' : 'Fetch Company Data'}
      </button>
      <span>
        <br />
        {companyData && (
          <div>
            <CompanyInfo companyData={companyData} />
            <select value={selectedDirectory} onChange={handleDirectorySelect}>
              <option value="" disabled>
                Select an Employee
              </option>
              {directoryData.map((directory) => (
                <option
                  key={directory.id}
                  value={`${directory.first_name} ${directory.last_name}`}
                >
                  {`${directory.first_name} ${directory.last_name}`}
                </option>
              ))}
            </select>
            <button onClick={fetchEmployeeData} disabled={fetchingDataEmployee}>
              {fetchingDataEmployee ? 'Fetching Data...' : 'Fetch Employee Data'}
            </button>
            <span>
              <br />
              {individualData && <IndividualInfo individualData={individualData} />}
              {employmentData && <EmploymentInfo employmentData={employmentData} />}
            </span>
          </div>
        )}
      </span>
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
