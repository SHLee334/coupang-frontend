import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* Outlet 걸어줘야 children의 컴포넌트들이 출력된다 */}
    </>
  );
};
export default Layout;
