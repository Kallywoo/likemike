import React from 'react';
import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';

import { Fade, FadeAndSlide } from "../components/styles/Animations";

import instagram from '../images/icons/icons8-instagram.svg';
import linkedin from '../images/icons/icons8-linkedin.svg';
import twitter from '../images/icons/icons8-twitter.svg';
import phone from '../images/icons/phone.svg';
import email from '../images/icons/email.svg';

export const Footer = ({ props }) => {

    const { pathname } = props; // pulled from Layout.js

    const data = useStaticQuery(graphql`
        query {
            footer: contentfulTitle(contentful_id: {eq: "1pzsooT2wJGfsjz6NxY6XZ"}) {
                title
            }
            contact: contentfulContact(contentful_id: {eq: "3GeJQHn4AqGrGuRH4EpSug"}) {
                email
                phone
                instagram
                twitter
                linkedIn
            }
        }
    `);
    
    
    const { footer, contact } = data;

    return (
        <StyledFooter $small={pathname === "/contact" ? true : false}>
            {pathname !== "/contact" ? 
                <H2>{footer.title}</H2> 
            : null}
            <InView triggerOnce={true}>
                {({ inView, ref }) => (
                    <List ref={ref} $duration={1} $active={inView}>
                        <SocialItem>
                            <a href={`https://instagram.com/${contact?.instagram}`} aria-label="Instagram">
                                <SocialIcon src={instagram} alt="" />
                            </a>
                        </SocialItem>
                        <SocialItem>
                            <a href={`https://twitter.com/${contact?.twitter}`} aria-label="Twitter">
                                <SocialIcon src={twitter} alt="" />
                            </a>
                        </SocialItem>
                        <SocialItem>
                            <a href={`https://uk.linkedin.com/pub/${contact?.linkedIn}`} aria-label="LinkedIn">
                                <SocialIcon src={linkedin} alt="" />
                            </a>
                        </SocialItem>
                    </List>
                )}
            </InView>
            {pathname !== "/contact" ? 
                <StyledLink to="/contact">Send me a message</StyledLink> 
            : null}
            <ContactInfo>
                <ContactItem>
                    <ContactLink href={`tel:${contact?.phone.replace(/\s+/g, '')}`}>
                        <Icon src={phone} />
                        {contact?.phone}
                    </ContactLink>
                </ContactItem>
                <ContactItem>
                    <ContactLink href={`mailto:${contact?.email}`}>
                        <Icon src={email} />
                        {contact?.email}
                    </ContactLink>
                </ContactItem>
                <ContactItem>
                    <ContactLink href={`https://twitter.com/${contact?.twitter}`}>
                        <Icon src={twitter} />
                        @{contact?.twitter}
                    </ContactLink>
                </ContactItem>
            </ContactInfo>
            <License>social icons by <a href="http://icons8.com">icons8</a></License>
            {/* email and phone from svgrepo */}
        </StyledFooter>
    );
};

const License = styled.p`
    margin-top: auto;
    margin-left: auto;
    margin-bottom: 1em;
    color: #2b194d;
    text-decoration: none;
`;

const StyledFooter = styled.footer`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    padding: 2em 2em 0;
    min-height: ${props => props.$small ? null : '100vh'};

    @media only screen and (max-width: 767px) {
        min-height: 600px;
    };
`;

const List = styled.ul`
    display: flex;
    flex-flow: row wrap;
    margin: 12vh auto;
    padding: 0;
    width: 100%;
    max-width: 1280px;
    justify-content: center;
    opacity: 0;
    ${props => props.$active ? FadeAndSlide : null};

    @media only screen and (max-width: 960px) {
        margin: 4em auto;
    };
`;

const ContactInfo = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 0;
    padding-bottom: 4em;

    @media only screen and (max-width: 767px) {
        gap: 0 1.5em;
        padding-bottom: 0;
    };
`;

const SocialItem = styled.li`
    list-style-type: none;
    margin: 0 auto;
    padding: 1.25em;
    background-color: #2b194d;
    border-radius: 100%;
    transition: all .1s linear;

    &:hover {
        background-color: #00bcd4;
    };

    @media only screen and (max-width: 767px) {
        padding: 1em;
    };
`;

const ContactItem = styled.li`
    list-style-type: none;
    margin: 3em 1.5em 1em;

    @media only screen and (max-width: 767px) {
        margin: 2em 0 1em;
        font-size: .8em;
    };
`;

const H2 = styled.h2`
    padding: 0.5em 0 0.75em;
    text-align: center;
    ${Fade};
`;

const SocialIcon = styled.img`
    filter: invert(90%) sepia(4%) saturate(78%) hue-rotate(219deg) brightness(106%) contrast(97%);
    width: 120px;

    @media only screen and (max-width: 767px) {
        width: 70px;
    };
`;

const StyledLink = styled(Link)`
    background-color: #00BCD4;
    margin-bottom: 2em;
    padding: 1em;
    border-radius: 3px;
    text-decoration: none;
    color: white;
    font-size: 1.25em;
    box-shadow: 2px 2px 2px #d7d4de;
    transition: all .2s ease-out;
    // this needs to be Droid Sans!

    &:hover {
        background: #00d3ee;
        box-shadow: 0 0 8px 5px #d7d4de;
        transition: all .2s ease-out;
    };
`;

const ContactLink = styled.a`
    color: #2b194d;
    text-decoration: none;
    font-size: 1.75em;
`;

const Icon = styled.img`
    vertical-align: middle;
    width: 25px;
    filter: invert(9%) sepia(29%) saturate(6492%) hue-rotate(252deg) brightness(83%) contrast(93%);
    padding-right: 0.5em;
`;