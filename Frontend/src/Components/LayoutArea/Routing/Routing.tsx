import { Navigate, Route, Routes } from "react-router-dom";
import AddDish from "../../DataArea/AdminErea/AddDishForm";
import RestList from "../../DataArea/RestList/RestList";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import DishList from "../../DataArea/DishList/DishList";
import EditDish from "../../DataArea/AdminErea/EditDishForm";
import EditRest from "../../DataArea/AdminErea/EditRest";
import AddRest from "../../DataArea/AdminErea/AddRest";
import OrderComponent from "../../DataArea/order/Order";
import Register from "../../AuthArea/Register";
import Login from "../../AuthArea/Login";
import OrderSum from "../../DataArea/order/OrderSum";
import BarcodePage from "../../DataArea/order/Barcode";
import History from "../../DataArea/History/History"
import UserList from "../../DataArea/AdminErea/UsersList";
import EditUser from "../../DataArea/AdminErea/EditUser";
import AddUser from "../../DataArea/AdminErea/AddUser";
import DishUploader from "../../DataArea/AdminErea/DishUploder";
import Restaurant from "../../DataArea/RestCard/RestDeatails";
import DishDetail from "../../DataArea/DishCard/DishDetail";


function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/restaurants" element={<RestList />} />
            <Route path="/menu/:restaurantId/:restaurantName" element={<DishList />}/>
            <Route path="/menu/newDish/:restaurantId/:restaurantName" element={<AddDish />}/>
            <Route path="/restaurants/newRest" element={<AddRest />}/>
            <Route path="/editDish/:restaurantId/:dishId/:restaurantName" element={<EditDish />}/>
            <Route path="/restaurants/editRest/:restaurantId" element={<EditRest/>}/>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/order" element={<OrderComponent/>} />
            <Route path="/orderSum/:orderId" element={<OrderSum/>} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/barcode/:orderId" element={<BarcodePage/>} />
            <Route path="/usersList" element={<UserList/>} />
            <Route path="/editUser/:userId" element={<EditUser/>} />
            <Route path="/addUser" element={<AddUser/>} />
            <Route path="/dishUploder/:restaurantId/:restaurantName" element={<DishUploader/>} />
            <Route path="/restCard/:restaurantId" element={<Restaurant />}/>
           //<Route path="/dishDT/:dishId/:restaurantId" element={< DishDetail />}/>
        </Routes>
    );
}

export default Routing;
