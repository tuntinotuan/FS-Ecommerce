import React, { Fragment } from "react";
// import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep, textSize = "" }) => {
  const steps = [
    {
      label: "Chi Tiết Vận Chuyển",
      icon: <LocalShippingIcon />,
    },
    {
      label: "Xác Nhận Đơn Hàng",
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: "Thanh Toán",
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        style={stepStyles}
        className="pt-5"
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#43c6ac" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              <div
                style={{
                  color:
                    activeStep >= index ? "#43c6ac" : "rgba(0, 0, 0, 0.649)",
                }}
                className={`${textSize}`}
              >
                {item.label}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
