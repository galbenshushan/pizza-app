import { Tooltip } from "@mui/material";
import styled from "styled-components";
import React from "react";

interface StyledButtonProps {
  tooltip: string;
  onClick: () => void;
  text: string;
  prefixIcon?: JSX.Element;
}

const Button = styled.button`
  background-color: white;
  font-weight: bold;
  color: rgb(250, 51, 51);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  &:hover {
    background-color: rgb(255, 199, 192);
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

const StyledButton: React.FC<StyledButtonProps> = ({
  text,
  prefixIcon,
  tooltip,
  onClick,
}) => {
  return (
    <Tooltip title={tooltip}>
      <Button onClick={onClick}>
        {prefixIcon} {text}
      </Button>
    </Tooltip>
  );
};

export default StyledButton;
