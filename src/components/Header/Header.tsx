import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.scss";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as FuelNavSVG } from "../../assets/icons/fuel-nav.svg";
import { ReactComponent as PriceNavSVG } from "../../assets/icons/price-nav.svg";
import { ReactComponent as HistoryNavSVG } from "../../assets/icons/history-nav.svg";

interface IHeader {
  allData: Array<{ fuel: number; distance: number; consumption: string }>;
  // isDisabled: (e: React.MouseEvent<HTMLElement>) => void;
}

const Header: React.FC<IHeader> = ({ allData }) => {
  return (
    <header>
      <div className="header-wrapper">
        <div className="logo">
          <NavLink to="/">
            <Logo />
            <span className="logo-text">Fuel Calculator</span>
          </NavLink>
        </div>
        <div className="nav-list">
          <button tabIndex={-1}>
            <NavLink to="/">
              <FuelNavSVG />
              <span>Fuel form</span>
            </NavLink>
          </button>
          <button tabIndex={-1}>
            <NavLink to="/price-calc">
              <PriceNavSVG />
              <span>Price form</span>
            </NavLink>
          </button>
          <button tabIndex={-1}>
            <NavLink
              // className={!allData.length ? "disabled" : ""}
              to="/history"
              // onClick={isDisabled}
            >
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
