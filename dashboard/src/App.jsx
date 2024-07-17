import Main from  './component/Main/main';
import { BrowserRouter as Router}from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="container">
        <Main />
      </div>
      
    </Router>
  );
}
export default App;