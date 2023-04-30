import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faAddressCard,
  faRightFromBracket,
  faUser,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/SideNavbar.css";
const SideNavbar = ({ person }) => {
  const [activeState, setActiveState] = useState(
    person === "admin"
      ? "companies"
      : person === "company"
      ? "companyProfile"
      : "applicantProfile"
  );
  const menuItemStyles = {
    root: {
      fontSize: "17px",
      fontWeight: 400,
      color: "#fff",
    },
    button: ({ active }) => {
      // [`&.${menuClasses.disabled}`]: {
      //   color: themes[theme].menu.disabled.color,
      // },
      return {
        margin: "4px 8px",
        borderRadius: "10px",
        fontWeight: active ? 500 : undefined,
        backgroundColor: active ? "#676AD8" : undefined,
        "&:hover": {
          backgroundColor: "#676AD8",
          borderRadius: "10px",
          color: "#fff",
          fontWeight: 500,
        },
      };
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };
  return (
    <Sidebar breakPoint="lg" backgroundColor="#3339CD">
      <div className="sidebar">
        <div className="sidebar-head">
          <div className="logo-navbar">Intellihire</div>
          <Menu menuItemStyles={menuItemStyles}>
            {/* <SubMenu label="Company">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu> */}
            {person === "admin" && (
              <MenuItem
                icon={
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{ color: "#f7f9fc", width: "20px", height: "20px" }}
                  />
                }
                active={activeState === "companies"}
                onClick={() => setActiveState("companies")}
              >
                {" "}
                Companies{" "}
              </MenuItem>
            )}
            {person === "company" && (
              <>
                <MenuItem
                  icon={
                    <FontAwesomeIcon
                      icon={faBuilding}
                      style={{
                        color: "#f7f9fc",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  }
                  active={activeState === "companyProfile"}
                  onClick={() => setActiveState("companyProfile")}
                >
                  {" "}
                  Company Profile{" "}
                </MenuItem>
                <MenuItem
                  icon={
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      style={{
                        color: "#f7f9fc",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  }
                  active={activeState === "jobsPosted"}
                  onClick={() => setActiveState("jobsPosted")}
                >
                  {" "}
                  Jobs Posted{" "}
                </MenuItem>
              </>
            )}
            {person === "applicant" && (
              <>
                <MenuItem
                  icon={
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        color: "#f7f9fc",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  }
                  active={activeState === "applicantProfile"}
                  onClick={() => setActiveState("applicantProfile")}
                >
                  {" "}
                  Applicant Profile{" "}
                </MenuItem>
                <MenuItem
                  icon={
                    <FontAwesomeIcon
                      icon={faSquarePollVertical}
                      style={{
                        color: "#f7f9fc",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  }
                  active={activeState === "results"}
                  onClick={() => setActiveState("results")}
                >
                  {" "}
                  Results{" "}
                </MenuItem>
                <MenuItem
                  icon={
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      style={{
                        color: "#f7f9fc",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  }
                  active={activeState === "jobsPosted"}
                  onClick={() => setActiveState("jobsPosted")}
                >
                  {" "}
                  Jobs Posted{" "}
                </MenuItem>
              </>
            )}

            <MenuItem
              icon={
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  style={{ color: "#f7f9fc", width: "20px", height: "20px" }}
                />
              }
              active={activeState === "logout"}
              onClick={() => setActiveState("logout")}
            >
              {" "}
              Logout{" "}
            </MenuItem>
          </Menu>
        </div>
        <div className="sidebar-footer">
          <div className="about-company">
            <div className="company-logo">
              <img
                src="https://pbs.twimg.com/card_img/1649335561130328065/nJpZwB8N?format=png&name=medium"
                alt=""
              />
            </div>
            <div className="company-info">
              <div className="company-name">Shivansh Joshi</div>
              <div className="company-email">shivanshjoshi277@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      {/**
       *  You can add the content of the sidebar ex: menu, profile details, ...
       */}
      {/**
       *  You can add a footer for the sidebar ex: copyright
       */}
    </Sidebar>
  );
};

export default SideNavbar;
