import React from "react";
import { Package } from "../types/interface";
import StatusDisplay from './StatusDisplay';

interface PackageDetailsProps {
    packageData: Package;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ packageData }) => {
    return (
        <div className="package-details-component">
            <div className="section-header">シップメント詳細</div>

            <div className="package-details-container">
                <div className="package-details-left">
                    <div className="details-table">
                        <div className="table-header">
                            <div className="column-name">項目</div>
                            <div className="column-name">参照データ</div>
                        </div>
                        <div className="table-row">
                            <div className="label">コンテナ番号</div>
                            <div className="value">
                                {packageData.tracking_number || "N/A"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="label">Shipper名</div>
                            <div className="value">
                                {packageData.sender || "N/A"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="label">Consignee名</div>
                            <div className="value">
                                {packageData.recipient || "N/A"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="label">ステータス</div>
                            <div className="value">
                                {packageData.status || "N/A"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="label">ETD</div>
                            {packageData.estimated_delivery_date && (
                                <div className="value">
                                    {packageData.estimated_delivery_date ||
                                        "N/A"}
                                </div>
                            )}
                        </div>
                        <div className="table-row">
                            <div className="label">発送日</div>
                            <div className="value">
                                {packageData.created_at || "N/A"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="label">User ID</div>
                            <div className="value">
                                {packageData.user_id || "N/A"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="package-details-right">
                    <StatusDisplay status={packageData.status} />
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
