import { BrowserRouter } from "react-router-dom"
import RoutePaths from "./Components/RoutePaths.js"
import Nav from "./Components/Nav"

const RouteSwitch = () => {

    return(
        <BrowserRouter>
            <Nav />
            <RoutePaths />
        </BrowserRouter>
    )
}

export default RouteSwitch