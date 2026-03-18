
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Upload from "../components/Upload";
import Dashboard from "../components/Dashboard";
import HistoryDashboard from "../components/HistoryDashboard";
import RecyclingSection from "../components/RecyclingSection";
import Sustainability from "../components/Sustainability";
import CompliancePanel from "../components/CompliancePanel";

export default function Home({ role }) {
  // role can be used for future role-based dashboard logic
  const [active, setActive] = React.useState(0);
  return (
    <div className="dashboard-root">
      <Sidebar active={active} setActive={setActive} />
      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">
          <div className="dashboard-panels">
            <section id="dashboard"><Dashboard /></section>
            <section id="upload"><Upload /></section>
            <section id="recycling"><RecyclingSection /></section>
            <section id="sustainability"><Sustainability /></section>
            <section id="history"><HistoryDashboard /></section>
            <section id="compliance"><CompliancePanel /></section>
          </div>
        </div>
      </div>
    </div>
  );
}