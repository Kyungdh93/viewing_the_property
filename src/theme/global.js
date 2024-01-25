import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.colors.colorBg};
        color : ${({ theme }) => theme.colors.colorMainFont};
    }
`;