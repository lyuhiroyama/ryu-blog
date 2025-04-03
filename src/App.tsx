import "./App.scss";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PackageSearchForm from "./components/PackageSearchForm";
import PackageCreateForm from "./components/PackageCreateForm";
import PackageDetails from "./components/PackageDetails";

const initialPackageData = {
    id: 1,
    tracking_number: "",
    status: "",
    sender: "",
    recipient: "",
    estimated_delivery_date: "",
    created_at: "",
    user_id: 0,
};

function App() {
    const [packageData, setPackageData] = useState(initialPackageData);

    return (
        <div className="app-component">
            <div className="sidebar-container">
                <Sidebar />
            </div>

            <div className="main-body-container">
                <div className="top-section">
                    <h2 className="page-title">ダッシュボード</h2>
                </div>
                <div className="input-section">
                    <div className="input-subsection">
                        <PackageSearchForm setPackageData={setPackageData} />
                    </div>
                    <div className="input-subsection">
                        <PackageCreateForm />
                    </div>
                </div>
                <div className="data-display-section">
                    <div className="package-details">
                        {packageData && (
                            <PackageDetails packageData={packageData} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
