import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

// Define GraphQL query (Within it, you specify the shape of the data you want to retrieve.)
const GET_PACKAGE = gql`
    query GetPackage($trackingNumber: String!) {
        package(trackingNumber: $trackingNumber) {
            id
            trackingNumber
            sender
            recipient
            status
            estimatedDeliveryDate
            createdAt
            userId
        }
    }
`;

const PackageSearchForm: React.FC<{ setPackageData: (data: any) => void }> = ({
    setPackageData
}) => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [getPackage, { loading, error, data }] = useLazyQuery(GET_PACKAGE);
    // useLazyQuery() returns a tuple with two elements:
    // Function to execute query with & Object containing the query's state.
    // loading -> boolean, error -> obj, data -> obj (contains data returned by GraphQL query)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        getPackage({ variables: { trackingNumber: trackingNumber } }); // Pass 'options object' as arg.
        if (data && data.package) {
            setPackageData(data.package);
        }
    };

    return (
        <div className="package-searchForm-component">
            <div className="section-header">
                シップメントの追跡
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    id="tracking-num-input-field"
                    type="text"
                    value={trackingNumber}
                    placeholder="Enter tracking number"
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    required
                />
                <button id='submit-btn' type="submit">追跡</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default PackageSearchForm;
