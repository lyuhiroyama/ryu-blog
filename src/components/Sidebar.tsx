import { ReactComponent as DashboardIcon } from "../assets/dashboard.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


function Sidebar() {
    return (
        <div className="sidebar-component">
            <h2 className="sidebar-title">Shipment Tracker</h2>
            <ul>
                <li>
                    <a href="/">
                        <DashboardIcon />
                        <div>ダッシュボード</div>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/lyuhiroyama/shipment-tracker">
                        <FontAwesomeIcon icon={faGithub} />
                        <div>ソースコード</div>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
