import { useState } from "react";
import Gear from "../Components/Gear";
import { dataFilter, getRandom } from "./Loadout";
import "../Styles/Meds.css";
import AnimatePage from "../Components/AnimatePage";
import { Dialog } from "../Assets/DataObjects";
import { AnimatePresence, motion } from "framer-motion";
import Therapist from "../Assets/therapist.jpg";

// Component for the injectors randomizer
const Meds = (props) => {
  const [slot1, setSlot1] = useState();
  const [slot2, setSlot2] = useState();
  const [slot3, setSlot3] = useState();
  const [slot4, setSlot4] = useState();
  const [cocktail, setCocktail] = useState(false);

  const injectors = dataFilter(props.itemData, "injectors"); // filter out injectors out of the fetched data object, dataFilters() called from Loadout.js

  // Fire when user clicks "GET INJECTORS" button in UI.  Makes a copy of injectors array and calls getRandom() from Loadout.js to pull random item object out
  // of data array.  Then calls noDupInjectors() to splice out the random object selected to avoid duplicates on the subsequent getRandom() calls.
  const getRandomCocktail = () => {
    setCocktail(false);
    let copy = [...injectors];
    const first = getRandom(copy);
    copy = noDupInjectors(copy, first.name);
    setSlot1({
      img: first.inspectImageLink,
      item: first,
      vendor: first.buyFor,
    });
    const second = getRandom(copy);
    copy = noDupInjectors(copy, second.name);
    setSlot2({
      img: second.inspectImageLink,
      item: second,
      vendor: second.buyFor,
    });
    const third = getRandom(copy);
    copy = noDupInjectors(copy, third.name);
    setSlot3({
      img: third.inspectImageLink,
      item: third,
      vendor: third.buyFor,
    });
    const forth = getRandom(copy);
    copy = noDupInjectors(copy, forth.name);
    setSlot4({
      img: forth.inspectImageLink,
      item: forth,
      vendor: forth.buyFor,
    });
    setTimeout(() => {
      setCocktail(true);
    }, 1000);
  };

  // UI rendered in 2 two planes: dialog box on the left plane and item grid on the right plane.  Responsive design implemented in Meds.css to stack planes on smaller
  // screens.
  return (
    <AnimatePage>
      <section id="meds-container">
        <div className="overlay">
          <div className="overlay-container">
            <div className="dialog-container" id="med-dialog-container">
              <header>
                <h1>Therapist</h1>
              </header>
              <div id="dialog">
                <div id="dialog-img-text">
                  <div id="vendor-icon">
                    <img src={Therapist} alt="Therapist"></img>
                  </div>
                  <p>{Dialog.Therapist}</p>
                </div>
                <div id="dialog-button">
                  <button onClick={getRandomCocktail} id="getGear-button">
                    GET INJECTORS
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay-container">
            <div id="cocktail-grid-container">
              <header id="grid-header">
                <h1>Injector Cocktail</h1>
                <p id="grid-header-tip">click injectors for info</p>
              </header>
              <div id="cocktail-grid">
                <div className="cocktail-slots">
                  <div className="gear-label">INJECTOR 1</div>
                  <AnimatePresence>
                    {cocktail && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={slot1.img}
                          item={slot1.item}
                          vendor={slot1.vendor}
                        ></Gear>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="cocktail-slots">
                  <div className="gear-label">INJECTOR 2</div>
                  <AnimatePresence>
                    {cocktail && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={slot2.img}
                          item={slot2.item}
                          vendor={slot2.vendor}
                        ></Gear>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="cocktail-slots">
                  <div className="gear-label">INJECTOR 3</div>
                  <AnimatePresence>
                    {cocktail && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={slot3.img}
                          item={slot3.item}
                          vendor={slot3.vendor}
                        ></Gear>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="cocktail-slots">
                  <div className="gear-label">INJECTOR 4</div>
                  <AnimatePresence>
                    {cocktail && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={slot4.img}
                          item={slot4.item}
                          vendor={slot4.vendor}
                        ></Gear>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <footer></footer>
            </div>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Meds;

function noDupInjectors(injectors, name) {
  for (let i = 0; i < injectors.length; i++) {
    if (injectors[i].name === name) {
      injectors.splice(i, 1);
      break;
    }
  }
  return injectors;
}
