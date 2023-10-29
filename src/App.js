import logo from './logo.svg';
import './App.css';
import StoryPage from './components/Body/StoryPage';
import BaseNaveBar from './components/Nav/BaseNavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FullStory from './components/Body/FullStory';

function App() {
  return (
    <div className="">


      <BaseNaveBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<StoryPage />} />
          <Route path="/view-full-story/:id" exact element={<FullStory />} />
          {/*<Route path="/landing-page" exact element={<Landing />} />
      <Route path="/login-page" exact element={<Login />} />
      <Route path="/profile-page" exact element={<Profile />} />
      <Route path="/register-page" exact element={<Register />} />
      <Route path="/view-full-story/:id" exact element={<ViewFullStory />} />
      <Route path="/main-dashboard" exact element={<Profile />} />
      <Route path="/write-story" exact element={<WriteStory />} />
      <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
