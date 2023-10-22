import React from "react";
import { Badge, Dropdown, Menu } from "antd";
import { BellOutlined } from "@ant-design/icons";

const Notificacion = () => {
  const items = [
    {
      icon: <BellOutlined />,
      key: "submenu",
      children: [
        {
          label: "Configuracion",
          key: "submenu-item-1",
        },
        {
          label: "Panel de usuario",
          key: "submenu-item-2",
        },
      ],
    },
  ];

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return <Menu items={items} />;
};

export default Notificacion;
