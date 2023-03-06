import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home.js"
import Loadout from "./Loadout.js";
import { useState, useEffect } from "react"
import Meds from "./Meds.js";

// RoutePaths component to render our Routes and ensure that exit animations execute when compnennts are unmounted.  Also holds our API fetch request and stores the results
// in state.  This dataset will then be passed to child components
const RoutePaths = (props) => {
    const location = useLocation();
    const [allItems, setAllItems] = useState([])

    useEffect(() => {
        const getAllItems = async () => {
          const allItems = await fetch('https://api.tarkov.dev/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{
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
          }`})
          })
          const data = await allItems.json()
          setAllItems(data.data.items)
        }
    
        getAllItems()
      }, [])
  
    return (
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/loudout" element={<Loadout itemData={allItems}/>} />
          <Route path="/meds" element={<Meds itemData={allItems}/>} />
        </Routes>
      </AnimatePresence>
    );
  };
  
  export default RoutePaths;