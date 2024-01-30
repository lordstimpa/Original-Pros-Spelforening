import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRef } from "react";
// Nav
import Nav from "./components/Navigation/Nav";
// Homepage
import Hero from "./components/Homepage/Hero";
import General from "./components/Homepage/General";
import More from "./components/Homepage/More";
import Community from "./components/Homepage/Community";
// Latest news
import Posts from "./components/Subpages/Sub-Posts";
// Information Subpage
import DynamicComponent from "./components/Subpages/DynamicComponent";
// About ORG
import Information from "./components/Subpages/Sub-Information";
import History from "./components/Subpages/SubSub-History";
import Vision from "./components/Subpages/SubSub-Vision";
import Board from "./components/Subpages/SubSub-Board";
import Statutes from "./components/Subpages/SubSub-Statutes";
import AnnualReports from "./components/Subpages/SubSub-AnnualReports";
// Membership
import Membership from "./components/Subpages/Sub-Membership";
// Event
import Event from "./components/Subpages/Sub-Event";
import UpcommingEvents from "./components/Subpages/SubSub-UpcommingEvents";
import PastEvents from "./components/Subpages/SubSub-PastEvents";
import EventInfo from "./components/Subpages/SubSub-EventInfo";
// Contact
import Contact from "./components/Subpages/Sub-Contact";
// Legal
import TermsOfService from "./components/Legal/TermsOfService";
import PrivacyNotice from "./components/Legal/PrivacyNotice";
import CookiePolicy from "./components/Legal/CookiePolicy";
// Footer
import Footer from "./components/Footer/Footer";

function App() {
  const generalRef = useRef(null);

  return (
    <>
      <Router>
        <Nav />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <Hero generalRef={generalRef} />
                <General generalRef={generalRef} />
                <More />
                <Community />
              </div>
            }
          />

          <Route exact path="/latest-news" element={<Posts />} />

          <Route path="/latest-news/:postId" element={<Posts />} />

          <Route
            exact
            path="/membership"
            element={<DynamicComponent contentComponent={<Membership />} />}
          />

          <Route
            exact
            path="/about"
            element={<DynamicComponent contentComponent={<Information />} />}
          />

          <Route
            exact
            path="/about/history"
            element={<DynamicComponent contentComponent={<History />} />}
          />

          <Route
            exact
            path="/about/vision"
            element={<DynamicComponent contentComponent={<Vision />} />}
          />

          <Route
            exact
            path="/about/board"
            element={<DynamicComponent contentComponent={<Board />} />}
          />

          <Route
            exact
            path="/about/statutes"
            element={<DynamicComponent contentComponent={<Statutes />} />}
          />

          <Route
            exact
            path="/about/annual-reports"
            element={<DynamicComponent contentComponent={<AnnualReports />} />}
          />

          <Route
            exact
            path="/event"
            element={<DynamicComponent contentComponent={<Event />} />}
          />

          <Route
            exact
            path="/event/upcomming-events"
            element={
              <DynamicComponent contentComponent={<UpcommingEvents />} />
            }
          />
          <Route
            path="/event/upcomming-events/:id"
            element={<DynamicComponent contentComponent={<EventInfo />} />}
          />

          <Route
            exact
            path="/event/past-events"
            element={<DynamicComponent contentComponent={<PastEvents />} />}
          />

          <Route
            path="/event/past-events/:id"
            element={<DynamicComponent contentComponent={<EventInfo />} />}
          />

          <Route
            exact
            path="/contact"
            element={<DynamicComponent contentComponent={<Contact />} />}
          />

          <Route
            exact
            path="/terms-of-service"
            element={<DynamicComponent contentComponent={<TermsOfService />} />}
          />

          <Route
            exact
            path="/privacy-notice"
            element={<DynamicComponent contentComponent={<PrivacyNotice />} />}
          />

          <Route
            exact
            path="/cookie-policy"
            element={<DynamicComponent contentComponent={<CookiePolicy />} />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
