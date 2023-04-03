import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Header from "./Header";
import Footer from "./Footer";
import GlobalStyle from "./GlobalStyle";
import ProfilPage from "./profil/ProfilPage";
import SignInPage from "./login/SignInPage"
import SignOut from "./login/SignOut";

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <div>
          <Routes>
            <Route path="/" element= {<HomePage />} />
            <Route path="/profil/:userName" element ={<ProfilPage />} />
            <Route path="/login" element ={<SignInPage/> } />
            <Route path="/logout" element ={<SignOut/> } />
            
            <Route path="*" element= {<h1>404 not found</h1>} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
