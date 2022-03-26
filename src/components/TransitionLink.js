import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import styled, { keyframes } from 'styled-components';

import { Slide } from "../components/styles/Animations";

export const TransitionLink = ({ to, children, delay }) => {
    
    const { pathname } = useLocation();

    const [transitioning, setTransitioning] = useState(false);
    const [transitioned, setTransitioned] = useState(true);

    const timer = useRef(null);

    useEffect(() => {
        timer.current = setTimeout(() => {
            setTransitioned(true);
        }, 250);

        return () => {
            setTransitioning(false);
            clearTimeout(timer.current);
        };
    }, [pathname]);

    const onClickHandler = (e) => { 
        e.preventDefault();
        clearTimeout(timer.current);

        if (to !== pathname) {
            setTransitioning(true);
            setTransitioned(false);

            timer.current = setTimeout(() => {
                navigate(to);
            }, 250);
        };
    };

    return (
        <>
            {!transitioned && 
                <PageTransition $active={transitioning ? true : false} />
            }
            <StyledLink to={to} onClick={e => onClickHandler(e)} $delay={delay}>{children}</StyledLink>
        </>
    );
};

const FadeOut = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const FadeIn = keyframes`
    0% { opacity: 1; }
    100% { opacity: 0; }
`;

const PageTransition = styled.div`
    position: fixed;
    width: 5000px;
    height: 5000px;
    left: -100vw;
    bottom: -100vh;
    background-color: #f2f1f4;
    z-index: -1; // make higher to cover nav like original
    opacity: ${props => props.$active ? 1 : 0};
    animation-name: ${props => props.$active ? FadeOut : FadeIn};
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
    pointer-events: ${props => !props.$active ? 'none' : null};
    content: '';
`;

const StyledLink = styled(Link)`
	position: relative;
	transition: all .1s ease-out;
    font-family: "Open Sans";
    color: #2B194D;
    text-decoration: none;
    margin: auto;
    ${Slide};

    &:after {
        content: '';
        position: absolute;
        top: 110%;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(0, 0, 0, .1);
        opacity: 0;
        transition: opacity .3s, transform .3s;
        transform: translateY(10px);
    };

    &:hover:after {
        opacity: 1;
        transform: translateY(0);
    };
`;