import { useEffect, useState } from "react";
import "../Styles/Randomizer.css";
import Gear from "./Gear.js";
import ScavIcon from "../Assets/scav.png";
import { Dialog } from "../Assets/DialogObj";
import Fence from "../Assets/Fence.jpg";
import { AnimatePresence, motion } from "framer-motion";
import AnimatePage from "./AnimatePage";

function Randomizer(props) {
  const [currArmor, setCurrArmor] = useState();
  const [currWeapon, setCurrWeapon] = useState();
  const [currHelmet, setCurrHelmet] = useState();
  const [currTacRig, setCurrTacRig] = useState();
  const [currBackPack, setCurrBackPack] = useState();
  const [currHeadPhones, setCurrHeadPhones] = useState();
  const [currGear, setCurrGear] = useState(false);

  const armors = dataFilter(props.itemData, "armor");
  const weapons = dataFilter(props.itemData, "gun");
  const helmets = dataFilter(props.itemData, "helmet");
  const tacRigs = dataFilter(props.itemData, "rig", "armor");
  const backPacks = dataFilter(props.itemData, "backpack");
  const headPhones = dataFilter(props.itemData, "headphones");

  const randomArmor = () => {
    const armor = getRandom(armors);
    setCurrArmor({
      img: armor.inspectImageLink,
      item: armor,
      vendor: armor.buyFor,
    });
    if (!armor.types.includes("rig")) {
      const tacRig = getRandom(tacRigs);
      setCurrTacRig({
        img: tacRig.inspectImageLink,
        item: tacRig,
        vendor: tacRig.buyFor,
      });
    } else {
      setCurrTacRig();
    }
  };

  const randomWeapon = () => {
    const weapon = getRandom(weapons);
    setCurrWeapon({
      img: weapon.properties.defaultPreset.inspectImageLink,
      item: weapon,
      vendor: weapon.buyFor,
    });
  };

  const randomHelmet = () => {
    const helmet = getRandom(helmets);
    setCurrHelmet({
      img: helmet.inspectImageLink,
      item: helmet,
      vendor: helmet.buyFor,
    });
    if (!helmet.blocksHeadphones) {
      const headphone = getRandom(headPhones);
      setCurrHeadPhones({
        img: headphone.inspectImageLink,
        item: headphone,
        vendor: headphone.buyFor,
      });
    } else {
      setCurrHeadPhones();
    }
  };

  const randomBackPack = () => {
    const backpack = getRandom(backPacks);
    setCurrBackPack({
      img: backpack.inspectImageLink,
      item: backpack,
      vendor: backpack.buyFor,
    });
  };

  const randomLoadOut = (e) => {
    e.target.disabled = true;
    setCurrGear(false);
    setTimeout(() => {
      randomArmor();
      randomWeapon();
      randomHelmet();
      randomBackPack();
      e.target.disabled = false;
      setCurrGear(true);
    }, 1000);
  };

  return (
    <AnimatePage>
      <section id="randomizer-container">
        <div className="overlay">
          <div className="overlay-container">
            <div id="dialog-container">
              <header>
                <h1>Fence</h1>
              </header>
              <div id="dialog">
                <div id="dialog-img-text">
                  <div id="Fence-Icon">
                    <img src={Fence}></img>
                  </div>
                  <p>{Dialog.Fence}</p>
                </div>
                <div id="dialog-button">
                  <button onClick={randomLoadOut} id="getGear-button">
                    GET LOADOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay-container">
            <div id="grid-container">
              <header id="grid-header">
                <img src={ScavIcon}></img>
                <h1>Equipment</h1>
              </header>
              <div id="equipment-grid">
                <div id="armor-slot" className="slot">
                  <div className="gear-label">BODY ARMOR</div>
                  <AnimatePresence>
                    {currGear && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={currArmor.img}
                          item={currArmor.item}
                          vendor={currArmor.vendor}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div id="rig-slot" className="slot">
                  <div className="gear-label">TACTICAL RIG</div>
                  <AnimatePresence>
                    {currGear && currTacRig && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={currTacRig.img}
                          item={currTacRig.item}
                          vendor={currTacRig.vendor}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div id="weapon-slot" className="slot">
                  <div className="gear-label">WEAPON</div>
                  <AnimatePresence>
                    {currGear && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={currWeapon.img}
                          item={currWeapon.item}
                          vendor={currWeapon.vendor}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div id="helmet-slot" className="slot">
                  <div className="gear-label">HELMET</div>
                  <AnimatePresence>
                    {currGear && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={currHelmet.img}
                          item={currHelmet.item}
                          vendor={currHelmet.vendor}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div id="headphones-slot" className="slot">
                  <div className="gear-label">HEADPHONES</div>
                  <AnimatePresence>
                    {currGear && currHeadPhones && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={currHeadPhones.img}
                          item={currHeadPhones.item}
                          vendor={currHeadPhones.vendor}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div id="backpack-slot" className="slot">
                  <div className="gear-label">BACKPACK</div>
                  <AnimatePresence>
                    {currGear && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gear
                          img={currBackPack.img}
                          item={currBackPack.item}
                          vendor={currBackPack.vendor}
                        />
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
}

export default Randomizer;

function dataFilter(data, key, exclude) {
  let result = data.filter((item) => item.types.includes(key));
  if (exclude) {
    result = result.filter((item) => !item.types.includes(exclude));
  }
  return result;
}

function getRandom(dataSet) {
  const random = Math.floor(Math.random() * dataSet.length);
  console.log(dataSet[random]);
  return dataSet[random];
}
