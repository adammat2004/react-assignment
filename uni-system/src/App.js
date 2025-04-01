import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Degrees from './pages/Degrees';
import SingleDegreePage from './pages/SingleDegreePage';
import Navbar from './components/Navbar';
import SingleCohortPage from './pages/SingleCohortPage';
import Cohorts from './pages/Cohorts';
import SingleStudentPage from './pages/SingleStudentPage';
import ModulesForCohert from './pages/ModulesForCohert';
import Modules from './pages/Modules';
import SingleModule from './pages/SingleModule';
import CohortForm from './pages/CreateNewCohort';
import CreateModule from './pages/CreateModule';
import CreateDegree from './pages/CreateDegree';
import Students from './pages/Students';
import CreateGrade from './pages/CreateGrade';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/degrees' element={<Degrees />}/>
        <Route path='/degrees/:shortcode' element={<SingleDegreePage />}/>
        <Route path='/cohorts/:id' element={<SingleCohortPage />}/>
        <Route path='/cohorts' element={<Cohorts />}/>
        <Route path='/students/:id' element={<SingleStudentPage />}/>
        <Route path='/modules' element={<Modules />}/>
        <Route path='/modules/cohort/:code' element={<ModulesForCohert />} />
        <Route path='/modules/:code' element={<SingleModule />} />
        <Route path='/create-cohort' element={<CohortForm />}/>
        <Route path='/create-module' element={<CreateModule />} />
        <Route path='/create-degree' element={<CreateDegree />} />
        <Route path='/students' element={<Students />}/>
        <Route path='/create-grade' element={<CreateGrade />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
