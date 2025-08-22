import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const handleClick = () => {
    console.log("clicking.....");
  };
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}

export default App;
