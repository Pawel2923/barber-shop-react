import WindowSizeProvider from "./store/WindowSizeProvider";
import CartProvider from "./store/CartProvider";
import BackToTop from "./components/UI/BackToTop/BackToTop";
import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main";
import Footer from "./components/Layout/Footer";

const App = () => {
  return (
    <WindowSizeProvider>
      <CartProvider>
        <BackToTop />
        <Header />
        <Main />
        <Footer />
      </CartProvider>
    </WindowSizeProvider>
  );
};

export default App;
