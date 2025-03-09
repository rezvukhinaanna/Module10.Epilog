import "./index.css";
import { Field } from "./components";
import { Information } from "./components";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[calc(10px+2vmin)] bg-[#282c34] text-white">
      <Information />
      <Field />
    </div>
  );
}

export default App;
