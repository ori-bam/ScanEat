import "./Home.css";
import logo from "../../../Assets/LOGOS.png";
import { NavLink } from "react-router-dom";



function Home(): JSX.Element {

    return (
        <div className="Home">

            <div className="white bg-gradient-to-b from-slate-600">
                <h1 className="font-bold text-2xl text-red-600">Welcome to ScanEat</h1>
                <div className="banner w-full md:w-3/4 h-auto px-7 mx-auto relative flex flex-col md:flex-row items-center justify-between">
                    <div className="banner-description w-full md:w-1/2 p-3">
                        <p className="text-M text-white py-2">
                            Experience a whole new level of convenience with ScanEat,
                            the cutting-edge web application designed to revolutionize your food ordering experience.
                            Say goodbye to long queues, confusing menus, and time-consuming phone calls. With ScanEat,
                            placing your food order becomes quick, hassle-free, and tailored to your taste buds.
                        </p>
                    </div>
                    <div className="banner-image md:w-1/4 p-3 flex justify-center">
                        <img src={logo} alt="banner" className="max-h-95"></img>
                    </div>
                </div>
                <NavLink to="/restaurants" className="inline-block">
                    <div className="bg-transparent hover:bg-yellow-500 text-red-600 font-semibold hover:text-yellow py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
                        Our Restaurants
                    </div>
                </NavLink>
            </div>
        </div>
    );

}
export default Home;
