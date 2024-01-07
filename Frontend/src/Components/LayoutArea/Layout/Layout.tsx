import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            
            <Header />
            <hr />
            <Routing />
            <hr  />
            <Footer/>
        </div>
    );
}

export default Layout;
