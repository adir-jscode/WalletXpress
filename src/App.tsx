import { Outlet } from "react-router";
import "./App.css";
import CommonLayout from "./layout/CommonLayout";
import { generateRoutes } from "./utils/generateRoutes";
import { adminSideBarItems } from "./routes/adminSideBarItems";

function App() {
  console.log(generateRoutes(adminSideBarItems));
  return (
    <>
      <CommonLayout>
        <Outlet></Outlet>
      </CommonLayout>
    </>
  );
}

export default App;
