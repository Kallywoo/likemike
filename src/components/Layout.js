import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import styled, { createGlobalStyle } from 'styled-components';

export const Layout = ({ children, location }) => {

    return (
        <>
        <GlobalStyle />
        <Header props={location} />
        <SkipContent id="skip" tabIndex="-1">Main Content</SkipContent>
        {children}
        <Footer props={location} />
        </>
    );
};

const SkipContent = styled.h2`
  position: absolute;
  top: -1000%;
`;

const GlobalStyle = createGlobalStyle`

    #gatsby-focus-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    };

    body {
        padding: 0;
        margin: 0;
        color: #2b194d;
        background-color: #f2f1f4;
        font-family: "Roboto";
        border-bottom: 5px solid #2B194D;
    };

    main {
        flex: 1;
        /* padding-top: 3rem; */
    };

    section {
        min-height: 100vh;

        @media only screen and (max-width: 767px) {
            max-height: none;
            height: auto;
            min-height: 600px;
        };
    };

    h1, h2, h3, h4, h5 {
        font-family: "Open Sans";
        font-weight: 700;
    };

    h1, h2, h3, h4, h5, p {
        margin: 0;
    };

    h1 {
        font-size: 4rem;

        @media only screen and (max-width: 480px) {
            font-size: 3em;
        };
    };
    
    h2 {
        font-size: 3rem;

        @media only screen and (max-width: 767px) {
            font-size: 2.5rem;
        };
    };

    section h2 {
        padding: 0.5em 0 0.75em;
    };

    h3 {
        font-size: 2rem;
    };

    p {
        font-size: 1.4rem;
    };
`;