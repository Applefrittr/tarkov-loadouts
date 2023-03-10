import { BrowserRouter } from "react-router-dom";
import RoutePaths from "./Components/RoutePaths.js";
import Nav from "./Components/Nav";
import { motion } from "framer-motion";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename="/tarkov-loadouts">
      <motion.section initial={{opacity:0}} animate={{opacity:1}} transition={{duration: .5, delay: 1.5}}>
        <Nav />
        <RoutePaths />
      </motion.section>
    </BrowserRouter>
  );
};

export default RouteSwitch;
