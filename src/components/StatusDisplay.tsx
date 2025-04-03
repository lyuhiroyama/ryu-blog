interface StatusDisplayProps {
    status: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
    return (
        <div className="status-display-component">
            
            <div className="status-texts-container">
                <div className="status-texts">
                    <div className="texts">{status === 'Created' && 'Created'}</div>
                </div>
                <div></div>
                <div className="status-texts">
                    <div className="texts">{status === 'In Transit' && 'In Transit'}</div>
                </div>
                <div></div>
                <div className="status-texts">
                    <div className="texts">{status === 'Out for Delivery' && 'Out for Delivery'}</div>
                </div>
                <div></div>
                <div className="status-texts">
                    <div className="texts">{status === 'Delivered' && 'Delivered'}</div>
                </div>
            </div>
            <div className="status-graphics-container">
                <div className="circle-div">
                    <div className={`circle ${status === 'Created' ? 'active' : ''}`}></div>
                </div>
                <div className="hr"></div>
                <div className="circle-div">
                    <div className={`circle ${status === 'In Transit' ? 'active' : ''}`}></div>
                </div>
                <div className="hr"></div>
                <div className="circle-div">
                    <div className={`circle ${status === 'Out for Delivery' ? 'active' : ''}`}></div>
                </div>
                <div className="hr"></div>
                <div className="circle-div-last">
                    <div className={`circle ${status === 'Delivered' ? 'active' : ''}`}></div>
                </div>
            </div>

        </div>
    );
};

export default StatusDisplay;
