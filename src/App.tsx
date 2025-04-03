import './App.scss';
import { useState } from 'react';
// import PackageTracker from './components/PackageTracker';
import PackageSearchForm from './components/PackageSearchForm';
import PackageCreateForm from './components/PackageCreateForm';
import PackageDetails from './components/PackageDetails';

function App() {
  const [packageData, setPackageData] = useState(null);

  return (
    <div className='app-component'>
      <div className='header-container'>
        <h1 className='header-title'>Shipment Tracker</h1>
      </div>
      <div className='input-container'>
        <PackageSearchForm setPackageData={setPackageData} />
        <PackageCreateForm />
      </div>
      <div className='data-display-container'>
        {packageData && <PackageDetails packageData={packageData} />}
      </div>
    </div>
  );
}

export default App;
