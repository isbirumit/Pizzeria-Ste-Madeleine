import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Header from "./Header";
import GlobalStyle from "./GlobalStyle";
import ProfilPage from "./profil/ProfilPage";
import SignInPage from "./login/SignInPage";
import SignOut from "./login/SignOut";
import Menu from "./menu/Menu";
import ErrorPage from "./ErrorPage";
import TwoPizza from "./menu/categories/TwoPizza";
import Pizza from "./menu/categories/pizza";
import Submarines from "./menu/categories/Submarines";
import Platters from "./menu/categories/Platters";
import Combos from "./menu/categories/Combos";
import Pastas from "./menu/categories/Pastas";
import Poutines from "./menu/categories/Poutines";
import Salads from "./menu/categories/Salads";
import Snacks from "./menu/categories/Snacks";
import { ToastContainer } from "react-toastify";
import OrderNow from "./menu/OrderNow";

function App() {
    return (
        <div>
            <BrowserRouter>
                <GlobalStyle />
                <Header />
                <ToastContainer />
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/profil/:userName"
                            element={<ProfilPage />}
                        />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/order" element={<OrderNow />} />
                        <Route path="/menu/2pizzas" element={<TwoPizza />} />
                        <Route
                            path="/menu/submarines"
                            element={<Submarines />}
                        />
                        <Route path="/menu/platters" element={<Platters />} />
                        <Route path="/menu/combos" element={<Combos />} />
                        <Route path="/menu/pastas" element={<Pastas />} />
                        <Route path="/menu/poutines" element={<Poutines />} />
                        <Route path="/menu/salads" element={<Salads />} />
                        <Route path="/menu/snacks" element={<Snacks />} />
                        <Route path="/login" element={<SignInPage />} />
                        <Route path="/logout" element={<SignOut />} />

                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
