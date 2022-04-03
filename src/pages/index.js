import * as React from "react"
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';

import SEO from '../components/SEO';
import { DrawSkills } from "../components/DrawSkills";
import { ExpandInfo } from "../components/ExpandInfo";
import { Fade, FadeAndSlide, Scale, Bounce } from "../components/styles/Animations";

import filler from '../images/amends/9.jpg';

export const data = graphql`
    query {
        profilePic: contentfulAsset(contentful_id: {eq: "6z4EKuoA7WjfxmJpPeZNbN"}) {
            file {
                url
            }
        }
        # find way to make this less repetitive?..
        header: contentfulTitle(contentful_id: {eq: "1WS3lEghvb0lRJ5lDWsf8"}) {
            title
        }
        skills: contentfulTitle(contentful_id: {eq: "3vVyaoJvLxiaHFjfKhLYCx"}) {
            title
        }
        clients: contentfulTitle(contentful_id: {eq: "2407IlqEXcDygi0AIN8sZq"}) {
            title
        }
        softwareInfo: contentfulTitle(contentful_id: {eq: "4ChLhWZjJEhMhpnkua5uX0"}) {
            title
        }
        code: contentfulTitleAndParagraph(contentful_id: {eq: "jrarOEY1eHz0reoXAIaXr"}) {
            title
            info: paragraph {
                raw
            }
        }
        sketch: contentfulTitleAndParagraph(contentful_id: {eq: "fidVhlUq5pHcCvkgbDA69"}) {
            title
            info: paragraph {
                raw
            }
        }
        ux: contentfulTitleAndParagraph(contentful_id: {eq: "DOXv0nuVEDX2vXjZE6BS9"}) {
            title
            info: paragraph {
                raw
            }
        }
        allContentfulProject {
            projects: nodes {
                id
                slug
                client {
                    name
                    logo: logoWhite {
                        gatsbyImageData(placeholder: BLURRED, width: 180)
                    }
                    logoColour: logo {
                        gatsbyImageData(placeholder: BLURRED, width: 180)
                    }
                }
                title
                preview {
                    thumbnail {
                        file {
                            url
                        }
                    }
                }
                indexOrder
            }
        }
        contentfulSoftware(contentful_id: {eq: "t6VMdS6zTDbOGiGVkXDZz"}) {
            software: softwareCollection {
                id
                title
                gatsbyImageData(placeholder: BLURRED, height: 75)
            }
        }
    }
`;

export default function IndexPage({ data }) {

    const { profilePic, header, skills, clients, softwareInfo, code, sketch, ux } = data;

    const { software } = data.contentfulSoftware;
    const { projects } = data.allContentfulProject;

    projects.sort((a, b) => a.indexOrder - b.indexOrder);

    return (
        <>
            <SEO title="Home" />
            <main>
                <Intro>
                    <ProfileImageContainer>
                        <Profile src={`${profilePic?.file?.url}`} alt="me" width="320" height="320" />
                    </ProfileImageContainer>
                    <H1 $duration={1} $delay={1.5}>{header.title}</H1>
                </Intro>
                {/* Skills */}
                <InView threshold={1} triggerOnce={true}>
                    {({ inView, ref }) => (
                        <Section className="purple">
                            <h2>{skills.title}</h2>
                            <List ref={ref}>
                                <ListItem>
                                    <DrawSkills skill="code" active={inView} />
                                    <FadeContainer $active={inView} duration={2}>
                                        <ExpandInfo content={code} />
                                    </FadeContainer>
                                </ListItem>
                                <ListItem>
                                    <DrawSkills skill="sketch" active={inView} />
                                    <FadeContainer $active={inView} duration={2}>
                                        <ExpandInfo content={sketch} />
                                    </FadeContainer>
                                </ListItem>
                                <ListItem>
                                    <DrawSkills skill="ux" active={inView} />
                                    <FadeContainer $active={inView} duration={2}>
                                        <ExpandInfo content={ux} />
                                    </FadeContainer>
                                </ListItem>
                            </List>
                        </Section>
                    )}
                </InView>
                {/* Blank */}
                <Filler/>
                {/* Projects */}
                <InView threshold={0.3} triggerOnce={true}>
                    {({ inView, ref }) => (
                        <WorkSection>
                            <H2 aria-label="Projects I've worked on for clients">{clients.title}</H2>
                            <WorkList ref={ref}>
                                {projects?.map((project, i) => (
                                    <WorkItem key={project?.id}>
                                        <WorkLink 
                                            to={`/work#${project?.slug}`} 
                                            aria-label={`${project?.title} for ${project?.client?.name}`}
                                            $active={inView} 
                                            $delay={i * 0.2} 
                                        >
                                            <ImageContainer background={`${project?.preview?.thumbnail?.file?.url}`}>
                                                <WorkImage 
                                                    image={project?.client?.logo ? getImage(project.client.logo) : getImage(project.client.logoColour)} 
                                                    imgStyle={{width: "80%", height: "auto", margin: "auto"}}
                                                    alt={project?.client?.name} 
                                                />
                                            </ImageContainer>
                                        </WorkLink>
                                    </WorkItem>
                                ))}
                            </WorkList>
                        </WorkSection>
                    )}
                </InView>
                {/* Software */}
                <InView threshold={0.3} triggerOnce={true}>
                    {({ inView, ref }) => (
                        <SoftwareSection className="purple">
                            <H2 aria-label="Software I've used">{softwareInfo.title}</H2>
                            <SoftwareList ref={ref}>
                                {software?.map((software) => (
                                    <Software $active={inView} key={software?.id}>
                                        <SoftwareLogo 
                                            image={getImage(software)} 
                                            alt={software?.title} 
                                            objectFit="contain" 
                                        />
                                    </Software>
                                ))}
                            </SoftwareList>
                        </SoftwareSection>
                    )}
                </InView>
            </main>
        </>
    );
};

const SoftwareLogo = styled(GatsbyImage)`
    height: 100%;

    div {
        width: 100%;
        height: 100%;
    };
`;

const Section = styled.section`
    display: flex;
    align-items: center;
    flex-flow: column wrap;
    padding: 2rem 0;
    text-align: center;

    &.purple {
        color: white;
        background-color: #2b194d;
    };

    @media only screen and (max-width: 767px) {
        padding-left: 2em;
        padding-right: 2em;
    };

    @media only screen and (max-width: 480px) {
        padding-left: 1em;
        padding-right: 1em;
    };
`;

const WorkSection = styled(Section)`
    margin: 0 auto;
    max-width: 1280px;
    padding-bottom: 5rem;
`;

const SoftwareSection = styled(Section)`
    padding-bottom: 4rem;
`;

const Intro = styled(Section)`
    padding-top: 0;
    padding-bottom: 0;
    max-width: 1280px;
    margin: 0 auto;

    @media only screen and (max-width: 767px) {
        margin: 0px 2em;
    };
`;

const ProfileImageContainer = styled.div`
    margin: 15vh auto;
    width: 25%;
    ${Bounce};

    @media only screen and (max-width: 767px) {
        width: 40%;
        margin: 6em auto 3em;
    };

    @media only screen and (max-width: 480px) {
        width: 50%;
    };
`;

const Profile = styled.img`
    width: 100%;
    height: auto;
`;

const H1 = styled.h1`
    ${FadeAndSlide};
`;

const H2 = styled.h2`
    margin-bottom: 12vh;

    @media only screen and (max-width: 767px) {
        margin-bottom: 0;
    };
`;

const WorkItem = styled.li`
    width: 33%;
    margin: 2rem auto;
    min-width: 200px;

    @media only screen and (max-width: 480px) {
        width: 100%;
    };
`;

const WorkLink = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    transform: translate3d(0,0,0) scale(0);
    ${props => props.$active ? Scale : null};

    &:focus div { /* doesn't work when on their individual styles */
        background-image: none;
        opacity: 1;
    };
`;

const ImageContainer = styled.div`
    background-color: #2b194d;
    display: inline-block;
    width: 200px;
    height: 200px;
    border: 6px solid #2b194d;
    border-radius: 100%;
    overflow: hidden;
    background-image: url(${props => props.background});

    &:hover {
        background-image: none;
    };

    @media only screen and (max-width: 767px) {
        background-image: none;
        width: 175px;
        height: 175px;
    };
`;

const WorkImage = styled(GatsbyImage)`
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.5s linear 0s;
    vertical-align: middle;
    clip-path: circle(54%);

    &:hover {
        opacity: 1;
    };

    @media only screen and (max-width: 767px) {
        opacity: 1;
    };
`;

const List = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    max-width: 1280px;
    width: 100%;
    padding: 0;
    margin-top: 12vh;

    @media only screen and (max-width: 767px) {
        margin-top: 0;
    };
`;

const SoftwareList = styled.ul`
    display: flex;
    flex-flow: row wrap;
    max-width: 1280px;
    justify-content: center;
    padding: 0;
`;

const WorkList = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
    list-style-type: none;
    text-align: center;
    margin: 0 auto;
    width: 33%;

    @media only screen and (max-width: 767px) {
        width: 100%;
    };
`;

const FadeContainer = styled.div`
    opacity: 0;
    ${props => props.$active ? Fade : null};
`;

const Software = styled.li`
    list-style-type: none;
    margin: 4rem;
    height: 75px;
    opacity: 0;
    ${props => props.$active ? Fade : null};

    @media only screen and (max-width: 767px) {
        margin: 3em 2em;
        height: 60px;
    };

    @media only screen and (max-width: 480px) {
        margin: 2em;
        height: 50px;
    };
`;

const Filler = styled.div`
    background-image: url(${filler});
    background-attachment: fixed;
    background-size: cover;
    height: 650px;

    @media only screen and (max-width: 767px) {
        height: 300px;
        min-height: 35vh;
    };
`;