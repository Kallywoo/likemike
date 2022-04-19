import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import { TransitionLink } from './TransitionLink';

export const Header = ({ props }) => {

    const { pathname } = props;

    const data = useStaticQuery(graphql`
        query {
            profilePic: contentfulAsset(contentful_id: {eq: "6z4EKuoA7WjfxmJpPeZNbN"}) {
                gatsbyImageData(placeholder: BLURRED, width: 60)
            }
        }
    `);

    const { profilePic } = data;

    const { ref: navRef, inView: navInView } = useInView({
        threshold: 0,
    });

    const { ref: proRef, inView: proInView } = useInView({
        threshold: 0,
        initialInView: true
    });

    const isMain = pathname === "/";

    return (
        <>
            <StyledHeader scrolled={!navInView ? true : false}>
                <SkipLink href="#skip">Skip to main content</SkipLink>
                <Navigation> {/* no ul/li due to transition not working from stacking order */}
                    <Links scrolled={!navInView ? true : false}>
                        <TransitionLink to="/" delay={isMain ? 1.5 : 0.1}>home</TransitionLink>
                        <TransitionLink to="/about" delay={isMain ? 1.6 : 0.2}>about</TransitionLink>
                        <TransitionLink to="/work" delay={isMain ? 1.7 : 0.3}>work</TransitionLink>
                        <TransitionLink to="/contact" delay={isMain ? 1.8 : 0.4}>contact</TransitionLink>
                    </Links>
                </Navigation>
                <ProfileContainer scrolled={!proInView ? true : false}>
                    <GatsbyImage image={profilePic?.gatsbyImageData} alt="me" aria-hidden={true} />
                </ProfileContainer>
            </StyledHeader>
            <div ref={navRef} /> {/* imitate an "on scroll" for the navigation */}
            <ProfileTrigger className={pathname === "/" ? "home" : null} ref={proRef} /> {/* profile picture (split for home page) */}
        </>
    );
};

const StyledHeader = styled.header`
    background-color: ${props => props.scrolled ? `rgba(242,241,244,85%)` : `rgba(242,241,244,100%)`};
    position: fixed;
    width: 100%;
    z-index: 1;
    transition: all 0.25s ease;

    &:hover {
        background-color: rgba(242,241,244,100%);
    };
`;

const SkipLink = styled.a`
    position: absolute;
    top: -1000%;

    &:focus {
        /* display: inline-block; */
        /* position: relative; */
        top: 0;
        left: 33%;
        right: 33%;
        background-color: white;
        color: #2B194D;
        padding: 0.5em 2em;
        text-align: center;
        text-decoration: none;
        box-shadow: 3px 3px 3px #333333;
        border-radius: 3px;
        z-index: 4;

        @media only screen and (max-width: 560px) {
            background-color: #1f2327;
            color: white;
            box-shadow: none;
        };
    };
`;

const Navigation = styled.nav`
    display: flex;
    margin: 0 auto;
    max-width: 1280px;
`;

const Links = styled.div`
    display: flex;
    width: ${props => props.scrolled ? "25%" : "100%"};
    margin: ${props => props.scrolled ? "0.75em" : "0.9em 0em"};
    margin-left: auto;
    padding: 0;
    transition: all 0.25s ease;

    @media only screen and (max-width: 767px) {
        width: ${props => props.scrolled ? "50%" : "100%"};
    };

    @media only screen and (max-width: 414px) {
        width: 100%;
        margin-right: 0;
    };
`;

const ProfileContainer = styled.div`
    position: absolute;
    width: 60px;
    top: ${props => props.scrolled ? "0px" : "-100px"};
    transition: all 0.25s ease;
    padding: 0.65em;
    z-index: -1;

    @media only screen and (max-width: 414px) {
        display: none;
    };
`;

const ProfileTrigger = styled.div`
    pointer-events: none;
    
    &.home {
        position: absolute;
        top: 52%;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 5px;
        /* background-color: black;
        z-index: 999; */

        @media only screen and (max-width: 767px) {
            top: 45%;
        };

        @media only screen and (max-width: 480px) {
            top: 36%;
        };
    };
`;