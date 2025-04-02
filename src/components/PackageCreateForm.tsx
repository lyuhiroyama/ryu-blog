import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_PACKAGE = gql`
    mutation CreatePackage(
        $tracking_number: String!,
        $sender: String!,
        $recipient: String!,
        $status: String!,
        $estimated_delivery_date: String,
        $user_id: ID!
    ) {
        create_package(
            tracking_number: $tracking_number,
            sender: $sender,
            recipient: $recipient,
            status: $status,
            estimated_delivery_date: $estimated_delivery_date,
            user_id: $user_id
        ) {
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

const PackageCreateForm: React.FC = () => {

    const [newPackage, setNewPackage] = useState({
        tracking_number: '',
        sender: '',
        recipient: '',
        status: 'Created',  // default value
        estimated_delivery_date: '',
        user_id: '1'
    }); 
    const [createPackage, { loading, error }] = useMutation(CREATE_PACKAGE);

    const handlePackageCreation = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await createPackage({
                variables: newPackage
            });
            if (result.data) {
                alert('Package created successfully!');
                // Clear form:
                setNewPackage({
                    tracking_number: '',
                    sender: '',
                    recipient: '',
                    status: 'Created',
                    estimated_delivery_date: '',
                    user_id: '1'
                });
            }
        } catch(err) {
            console.error('Error creating package: ', err);
        }
    }

    return (
        <div>
            <h2>Create New Package</h2>
            <form onSubmit={handlePackageCreation}>
                <div>
                    <input 
                        type="text"
                        placeholder="Tracking Number"
                        value={newPackage.tracking_number}
                        onChange={(e) => setNewPackage({
                            ...newPackage,
                            tracking_number: e.target.value  // overrides tracking_number in ...newPackage
                        })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Sender"
                        value={newPackage.sender}
                        onChange={(e) => setNewPackage({
                            ...newPackage,
                            sender: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Recipient"
                        value={newPackage.recipient}
                        onChange={(e) => setNewPackage({
                            ...newPackage,
                            recipient: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <select
                        value={newPackage.status}
                        onChange={(e) => setNewPackage({
                            ...newPackage,
                            status: e.target.value
                        })}
                        required
                    >
                        <option value="Created">Created</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
                <div>
                    <input
                        type="date"
                        placeholder="Estimated Delivery Date"
                        value={newPackage.estimated_delivery_date}
                        onChange={(e) => setNewPackage({
                            ...newPackage,
                            estimated_delivery_date: e.target.value
                        })}
                    />
                </div>
                <button type="submit">Create Package</button>
            </form>

            {loading && <p>Creating package...</p>}
            {error && <p>Error creating package: {error.message}</p>}

        </div>
    )
}

export default PackageCreateForm;