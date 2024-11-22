import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
        </>
    )
);

export default router;
