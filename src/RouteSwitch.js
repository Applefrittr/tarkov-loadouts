import { HashRouter } from "react-router-dom";
import RoutePaths from "./Components/RoutePaths.js";
import Nav from "./Components/Nav";
import { motion } from "framer-motion";
import Logo from "./Assets/hideout-logo.png";

const RouteSwitch = () => {
  return (
    <HashRouter>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        id="app-container"
      >
        <Nav />
        <RoutePaths />
        <div id="hideout-logo">
          <img src={Logo} alt="logo" />
        </div>
      </motion.section>
    </HashRouter>
  );
};

export default RouteSwitch;
