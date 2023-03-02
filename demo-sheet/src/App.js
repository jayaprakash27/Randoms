import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [apidata, setAPIdata] = useState([]);
  const [input, setInput] = useState("");
  const [cat, setCat] = useState("none");
  const [qty, setQty] = useState(0);
  const [res, setRes] = useState("");
  useEffect(() => {
    switch (cat) {
      case "opt1":
    axios
    .get(
      process.env.REACT_APP_SHEET1_URL
    )
    .then((res) => setAPIdata(res.data.data));
        break;

      case "opt2":
      axios
      .get(
        process.env.REACT_APP_SHEET2_URL
      )
      .then((res) => setAPIdata(res.data.data));
          break;
      
      default:
        break;
    }
  }, [cat]);
  const showRes = () => {
    console.log(apidata);
    var x = 0;
    for (let i = 1; i < apidata.length; i++) {
      if (apidata[i].prod_id == input) {
        x += Number(apidata[i].quantity);
        console.log(x);
      }
    }
    if (qty < 0.8*x) {
      setRes("Available");
    } else {
      setRes("Unavailable");
    }
  };
  return (
    <div className="App">
      <select name="cat" id="cat" onChange={(e) => setCat(e.target.value)}>
        <option value="none">Select</option>
        <option value="opt1">
          Sheet 1
        </option>
        <option value="opt2">
          Sheet 2
        </option>
      </select>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Quantity"
        onChange={(e) => setQty(e.target.value)}
      />
      <button value="Proceed" onClick={showRes}>
        Proceed
      </button>
      <h2>{res}</h2>
    </div>
  );
}

export default App;
