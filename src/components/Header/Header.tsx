import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.scss";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as FuelNavSVG } from "../../assets/icons/fuel-nav.svg";
import { ReactComponent as PriceNavSVG } from "../../assets/icons/price-nav.svg";
import { ReactComponent as HistoryNavSVG } from "../../assets/icons/history-nav.svg";

const Header: React.FC = () => {
  return (
    <header>
      <div className="header-wrapper">
        <div className="logo">
          <NavLink to="fuel-calc/">
            <Logo />
            <span className="logo-text">Fuel Calculator v1.1</span>
          </NavLink>
        </div>
        <div className="nav-list">
          <button tabIndex={-1}>
            <NavLink to="fuel-calc/">
              <FuelNavSVG />
              <span>Fuel form</span>
            </NavLink>
          </button>
          <button tabIndex={-1}>
            <NavLink to="fuel-calc/price">
              <PriceNavSVG />
              <span>Price form</span>
            </NavLink>
          </button>
          <button tabIndex={-1}>
            <NavLink to="fuel-calc/history">
              <HistoryNavSVG />
              <span>History</span>
            </NavLink>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
