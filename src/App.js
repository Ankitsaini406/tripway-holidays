import './App.css';
// import Announcement from './components/announcement';
import Header from './components/header';
import Footer from './pages/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      {/* <Announcement /> */}
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
