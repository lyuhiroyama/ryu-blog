import React from "react";
import { Package } from "../types/interface";

interface PackageDetailsProps {
    packageData: Package;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ packageData }) => {
    return (
        <div className="package-details">
            <h3>Package details</h3>
            <p>Tracking Number: {packageData.tracking_number}</p>
            <p>Status: {packageData.status}</p>
            <p>Sender: {packageData.sender}</p>
            <p>Recipient: {packageData.recipient}</p>
            {packageData.estimated_delivery_date && (
                <p>
                    Estimated Delivery Date: {packageData.estimated_delivery_date}
                </p>
            )}
            <p>Created: {packageData.created_at}</p>
            <p>User ID: {packageData.user_id}</p>
        </div>
    );
};

export default PackageDetails;
