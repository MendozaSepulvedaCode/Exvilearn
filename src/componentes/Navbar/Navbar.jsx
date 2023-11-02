import React, { useEffect } from "react";
import { Bars, SearchIcon } from "./navStyles";
import "../../estilos/navbar/NavBar.css";
import { Layout, Button, Drawer } from "antd";
import { useLocation } from "react-router-dom";
import LeftMenu from "../Navbar/LeftMenu";
import RightMenu from "../Navbar/RightMenu";
import { Input } from "antd";

function NavBar({ userData }) {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(!visible);
  };

  const { pathname: location } = useLocation();

  useEffect(() => {
    setVisible(false);
  }, [location]);

  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            <img
              src="https://storagexvilearn.blob.core.windows.net/imagenes/variante-logo.png"
              alt="Exvilearn"
              className="logo-exvi"
            />
          </div>
          <div className="navbar-menu">
            <div className={"leftMenu"}>
              <LeftMenu mode={"horizontal"} />
            </div>
            <SearchIcon />
            <Search
              placeholder="Buscar cursos"
              allowClear
              onSearch={onSearch}
              style={{
                width: "30vw",
                marginTop: "1.2rem",
              }}
              className="buscar-nav"
            />
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <Bars />
            </Button>
            <div className="rightMenu">
              <RightMenu mode={"horizontal"} userData={userData} />
            </div>
            {window.innerWidth <= 768 && (
              <Drawer
                title={"Exvilearn"}
                placement="right"
                closable={true}
                onClose={showDrawer}
                open={visible}
                style={{ zIndex: 99999 }}
              >
                <div className="drawer-menu">
                  <LeftMenu mode={"inline"} />
                  <RightMenu mode={"inline"} userData={userData} />
                </div>
              </Drawer>
            )}
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
}

export default NavBar;
