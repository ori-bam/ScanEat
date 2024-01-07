import "./PageNotFound.css";
import logo from "../../../Assets/LOGOS.png"
function PageNotFound(): JSX.Element {
    return (
        <div className="text-amber-600 items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">Page Not Found 😢</h1>
        <img src={logo} className="m-auto w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5" alt="Logo" />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">Page Not Found 😢</h1>
      </div>
      
    );
}

export default PageNotFound;
