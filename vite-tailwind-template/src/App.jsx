import React from "react";
import BottomBar from "./components/BottomBar";
import Header from "./components/Header";
import Checklist from "./components/Checklist";

const App = () => {
  return (
    <div>
      <Header />
      <Checklist icon="" text="30분 이상 걷기" checked={false} />

      <BottomBar />
    </div>
  );
};

export default App;
