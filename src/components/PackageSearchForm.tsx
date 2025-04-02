import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import PackageDetails from './PackageDetails';

// Define GraphQL query (Within it, you specify the shape of the data you want to retrieve.)
const GET_PACKAGE = gql`
    query GetPackage($tracking_number: String!) {
        package(tracking_number: $tracking_number) {
            id
            tracking_number
            sender
            recipient
            status
            estimated_delivery_date
            created_at
            user_id
        }
    }
`;



const PackageSearchForm: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [getPackage, { loading, error, data}] = useLazyQuery(GET_PACKAGE);
    // useLazyQuery() returns a tuple with two elements:
    // Function to execute query with & Object containing the query's state.
    // loading -> boolean, error -> obj, data -> obj (contains data returned by GraphQL query)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        getPackage({ variables: {tracking_number: trackingNumber}});  // Pass 'options object' as arg.
    }
    
    return (
        <div className="package-search">
            <h2>Track your package</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={trackingNumber}
                    placeholder='Enter tracking number'
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    required
                />
                <button type="submit">Track Package</button>
            </form>
            

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data.package && <PackageDetails packageData={data.package} />}
            {/* note: 'package' here is the query field you defined in your GraphQL schema: */}

        </div>
    );
};

export default PackageSearchForm;