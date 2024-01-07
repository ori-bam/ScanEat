class AppConfig {
    public serverUrl ="http://localhost:4000/";
    public restUrl = "http://localhost:4000/resturants/";
    public dishUrl = "http://localhost:4000/dishes/";
    public orderUrl = "http://localhost:4000/orders/";
    public userUrl = "http://localhost:4000/users/";
    public registerUrl ="http://localhost:4000/users/register";
    public loginUrl ="http://localhost:4000/users/login";
    
}

const appConfig = new AppConfig();

export default appConfig;
