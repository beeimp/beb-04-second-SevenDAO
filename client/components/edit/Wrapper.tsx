import { Box, css } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface EditWrapperProps {
  children: ReactNode;
}

const EditWrapper: FunctionComponent<EditWrapperProps> = ({ children }) => {

  const wrapperStyle = css`
    position: relative;
    max-width: 1100px;
  `;

  return (
    <Box css={wrapperStyle}>
      {children}
    </Box>
  );
}

export default EditWrapper;