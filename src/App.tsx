import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Abstract from './pages/Abstract';
import TableOfContents from './pages/TableOfContents';
import Members from './pages/Members';
import StudentProfile from './pages/StudentProfile';
import ParqForms from './pages/ParqForms';
import Activities from './pages/Activities';
import IndividualWorks from './pages/IndividualWorks';
import Reflections from './pages/Reflections';
import Closing from './pages/Closing';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/abstract" element={<Abstract />} />
        <Route path="/table-of-contents" element={<TableOfContents />} />
        <Route path="/members" element={<Members />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/parq" element={<ParqForms />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/individual-works" element={<IndividualWorks />} />
        <Route path="/reflections" element={<Reflections />} />
        <Route path="/closing" element={<Closing />} />
      </Route>
    </Routes>
  );
}
