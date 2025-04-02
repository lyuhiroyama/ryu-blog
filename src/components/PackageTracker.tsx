import React from 'react';
import PackageSearchForm from './PackageSearchForm';
import PackageCreateForm from './PackageCreateForm';

const PackageTracker: React.FC = () => {
    return (
        <div className="package-tracker">
            <PackageSearchForm />
            <PackageCreateForm />
        </div>
    );
};

export default PackageTracker;