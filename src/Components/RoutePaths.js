import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home.js";
import Loadout from "../pages/Loadout.js";
import { useState, useEffect } from "react";
import Meds from "../pages/Meds.js";
import Maps from "../pages/Maps.js";
import Challenges from "../pages/Challenges.js";
import NoPage from "../pages/NoPage.js";
import { getTarkovData } from "../api/tarkov-dev";

// RoutePaths component to render our Routes and ensure that exit animations execute when compnennts are unmounted.  Also holds our API fetch request and stores the results
// in state.  This dataset will then be passed to child components
const RoutePaths = (props) => {
  const location = useLocation();
  const [allItems, setAllItems] = useState(null);
  const [allMaps, setAllMaps] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState(() => {
    const tasks = localStorage.getItem("completed-challenges");
    return tasks ? JSON.parse(tasks) : [];
  });

  const addCompletedChallenge = (challenge) => {
    let tasks = localStorage.getItem("completed-challenges");
    if (tasks) {
      if (JSON.parse(tasks).indexOf(challenge) > -1) return;
      else tasks = [...JSON.parse(tasks), challenge];
    } else tasks = [challenge];
    //tasks ? (tasks = [...JSON.parse(tasks), challenge]) : (tasks = [challenge]);
    localStorage.setItem("completed-challenges", JSON.stringify(tasks));
    setCompletedChallenges((prev) => [...prev, challenge]);
  };

  const clearCompletedChallenges = () => {
    localStorage.clear();
    setCompletedChallenges([]);
  };

  useEffect(() => {
    const getData = async () => {
      const { maps, items } = await getTarkovData();
      setAllItems(items);
      setAllMaps(maps);
    };

    getData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {allItems && (
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/loadout" element={<Loadout itemData={allItems} />} />
          <Route path="/meds" element={<Meds itemData={allItems} />} />
          <Route path="/maps" element={<Maps mapData={allMaps} />} />
          <Route
            path="/challenges"
            element={
              <Challenges
                completed={completedChallenges}
                addCompleted={addCompletedChallenge}
                clearCompleted={clearCompletedChallenges}
              />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      )}
    </AnimatePresence>
  );
};

export default RoutePaths;
