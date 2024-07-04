import Container from "components/Container";
import NuevoVideo from "pages/inicio/nuevoVideo";


const { default: Inicio } = require("./pages/inicio");
const { BrowserRouter, Routes, Route } = require("react-router-dom");

function AppRoutes() {
    return (
        <BrowserRouter>
           <Container>
                <Routes>
                    <Route path="/" element={<Inicio />}></Route>
                    <Route path="/nuevoVideo" element={<NuevoVideo />}></Route>  
                </Routes>
                </Container>
                
        </BrowserRouter>
    )
}

export default AppRoutes;