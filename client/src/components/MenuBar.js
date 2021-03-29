// imported from semantic-ui Changed from class-based component to functional component
import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function MenuBar() {
  // shows the path that you are currently in example: /Login.
  const pathname = window.location.pathname;

  // here we check if location is home else use the substring property to determine the index.
  const path = pathname === '/' ? 'home' : pathname.substr(1);

  // after that we set it to the path we specified.
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary size='massive' color='blue'>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
}
export default MenuBar;
