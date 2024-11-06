import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home.js";
import Loadout from "../pages/Loadout.js";
import { useState, useEffect } from "react";
import Meds from "../pages/Meds.js";
import Maps from "../pages/Maps.js";

// RoutePaths component to render our Routes and ensure that exit animations execute when compnennts are unmounted.  Also holds our API fetch request and stores the results
// in state.  This dataset will then be passed to child components
const RoutePaths = (props) => {
  const location = useLocation();
  const [allItems, setAllItems] = useState([]);
  const [allMaps, setAllMaps] = useState([]);

  // fetch request to api.tarkov.dev.  This fetch request in effect pulls the ENITRE item dataset from Escape from Tarkov as well as the maps.  The items dataset then
  // gets filtered by child components to be rendered and displayed out to the user in the UI
  useEffect(() => {
    const getAllItems = async () => {
      const allItems = await fetch("https://api.tarkov.dev/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `{
              items {
                name
                shortName
                types
                description
                blocksHeadphones
                inspectImageLink
                buyFor {
                  price
                  currency
                  vendor {
                    name
                  }
                }
                properties {
                  __typename
                  ...on ItemPropertiesWeapon {
                    defaultPreset {
                      shortName
                      inspectImageLink
                      buyFor {
                        price
                        currency
                        vendor {
                          name
                        }
                      }
                    }
                  }
                }
              }
              maps {
                name
                description
                enemies
                raidDuration
              }
          }`,
        }),
      });
      const data = await allItems.json();
      setAllItems(data.data.items);
      setAllMaps(data.data.maps);
    };

    getAllItems();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/loadout" element={<Loadout itemData={allItems} />} />
        <Route path="/meds" element={<Meds itemData={allItems} />} />
        <Route path="/maps" element={<Maps mapData={allMaps} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default RoutePaths;
