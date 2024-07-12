import ImageMagnifier from "./components/ImageMagnifier";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ImageMagnifier src={"/nature.jpg"} />
    </div>
  );
}

export default App;
