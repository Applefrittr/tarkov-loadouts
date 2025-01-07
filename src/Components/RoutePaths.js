import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home.js";
import Loadout from "../pages/Loadout.js";
import { useState, useEffect } from "react";
import Meds from "../pages/Meds.js";
import Maps from "../pages/Maps.js";
import Challenges from "../pages/Challenges.js";
import { getTarkovData } from "../api/tarkov-dev";

// RoutePaths component to render our Routes and ensure that exit animations execute when compnennts are unmounted.  Also holds our API fetch request and stores the results
// in state.  This dataset will then be passed to child components
const RoutePaths = (props) => {
  const location = useLocation();
  const [allItems, setAllItems] = useState(null);
  const [allMaps, setAllMaps] = useState(null);

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
          <Route path="/challenges" element={<Challenges />} />
        </Routes>
      )}
    </AnimatePresence>
  );
};

export default RoutePaths;
