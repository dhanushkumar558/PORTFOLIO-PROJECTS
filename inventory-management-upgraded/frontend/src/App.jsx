import Navbar from './components/Navbar';
import ItemList from './components/ItemList';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <ItemList />
      </div>
    </div>
  );
}

export default App;
