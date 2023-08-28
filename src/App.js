import "./assets/css/styles.css"
import Routing from './Components/Routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SupAdmin from "./Components/SuperAdmin";
import CareteCompany from "./Components/SuperAdmin/CareteCompany";
import CareteAdmin from "./Components/SuperAdmin/CareteAdmin";
import ViewCompany from "./Components/SuperAdmin/ViewCompany";
import ViewAdmins from "./Components/SuperAdmin/ViewAdmins";
import Modals from "./Components/SuperAdmin/Modals";
import AssignAdmin from "./Components/AssignAdmin";
import UserAdmin from "./Components/AssignAdmin/UserAdmin";
import ViewUser from "./Components/AssignAdmin/ViewUser";
import USerModals from "./Components/AssignAdmin/USerModals";


function App() {
  return (<>
    {/* <Routing/>
      <ToastContainer/> */}
    {/* <SupAdmin /> */}
    {/* <CareteCompany /> */}
    <ViewCompany />
    {/* <CareteAdmin /> */}
    {/* <ViewAdmins /> */}
    {/* <Modals /> */}
    {/* <AssignAdmin /> */}
    {/* <UserAdmin /> */}
    {/* <ViewUser /> */}
    {/* <USerModals /> */}


  </>
  );
}

export default App;
