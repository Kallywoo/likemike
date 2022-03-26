import * as React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';

export default function NotFoundPage() {
    return (
        <Main>
            <title>Not found</title>
            <H1>Page not found</H1>
            <Paragraph>
                Sorry{" "}
                <span role="img" aria-label="Pensive emoji">
                😔
                </span>{" "}
                we couldn’t find what you were looking for.
                <br />
                {process.env.NODE_ENV === "development" ? (
                <>
                    <br />
                    Try creating a page in <Code>src/pages/</Code>.
                    <br />
                </>
                ) : null}
                <br />
                <StyledLink to="/">Go home</StyledLink>.
            </Paragraph>
        </Main>
    );
};

const Main = styled.main`
    color: #232129;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
`;

const H1 = styled.h1`
    margin-top: 0;
    margin-bottom: 64px;
    text-align: center;
`;

const Paragraph = styled.p`
    margin-bottom: 48px;
`;

const Code = styled.code`
    color: #8A6534;
    padding: 4px;
    background-color: #FFF4DB;
    font-size: 1.25rem;
    border-radius: 4px;
`;

const StyledLink = styled(Link)`
    color: #00BCD4;
    transition: all .2s linear;

    &:hover {
        color: #08e3ff;
        text-decoration: none;
        transition: all .2s linear;
    };
`;