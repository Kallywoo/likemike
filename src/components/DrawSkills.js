import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// import { ReactComponent as Code } from '../images/code.svg';
// import { ReactComponent as Sketch } from '../images/sketch.svg';
// import { ReactComponent as UX } from '../images/ux.svg';
// import code from '../images/code.svg';
// import sketch from '../images/sketch.svg';
// import ux from '../images/ux.svg';

export const DrawSkills = ({ skill, active }) => {

    const paths = useRef(null);

    useEffect(() => {

        paths.current = document.querySelectorAll(`.${skill} path`);
        // console.log("paths", paths);
        
        if (active) {
            for (let i = 0; i < paths.current.length; i++) {
                let currentIndex = paths.current[i];
                let indexLength = currentIndex.getTotalLength();
                currentIndex.style.strokeDasharray = indexLength;
                currentIndex.style.strokeDashoffset = indexLength;
            };
        };

    }, [skill, active]);

    return (
        <>
        {active ? skill === "code" &&
            <Skill className="code">
                <SVG version="1.1" id="Code" x="0px" y="0px"
                        width="300px" height="300px" viewBox="0 0 600 600" enableBackground="new 0 0 300 300">
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M266.44,438.697c0,0-103.303-0.018-150.038-0.018
                        c-11.173,0-20.568-12.466-20.568-26.606c0-58.527,0-174.941,0-234.11c0-13.886,10.86-23.037,20.57-23.037
                        c98.919,0,264.528,0,365.371,0c14.838,0,24.674,10.25,24.674,23.038c0,58.802,0,176.406,0,235.208
                        c0,14.474-10.352,25.503-24.674,25.503c-43.453,0-172.717,0-172.717,0L266.44,438.697z"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M488.944,195.065V422H113.5V195.065H488.944z"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M438,174.25c0,3.728-3.022,6.75-6.75,6.75
                        s-6.75-3.022-6.75-6.75s3.022-6.75,6.75-6.75S438,170.522,438,174.25z"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M459.541,174.25c0,3.728-3.022,6.75-6.75,6.75
                        s-6.75-3.022-6.75-6.75s3.022-6.75,6.75-6.75S459.541,170.522,459.541,174.25z"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M480.75,174.25c0,3.728-3.022,6.75-6.75,6.75
                        s-6.75-3.022-6.75-6.75s3.022-6.75,6.75-6.75S480.75,170.522,480.75,174.25z"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeMiterlimit="10" d="M240.536,373.25
                        L173.5,308.769l67.674-64.27"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeMiterlimit="10" d="M359.284,244.499
                        l67.036,64.481l-67.674,64.27"/>
                    <path fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M267.563,373.25l63.418-128.751"/>
                </SVG>
            </Skill>
        : null}
        {active ? skill === "sketch" &&
            <Skill className="sketch">
                <SVG version="1.1" id="Sketch" x="0px" y="0px"
                    width="300px" height="300px" viewBox="0 0 600 600" enableBackground="new 0 0 300 300">
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M343.675,242.68l88.909,113.406L265.592,468.081
                        L133.599,289.59l163.319-106.55l33.476,43.32"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M268.226,200.54
                        c0.778-3.655-0.731-1.709-0.226-10.04c0.35-5.751,2-16,11-18.5c7.654-2.126,15.875,12.04,12.918,29.5"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M246.011,215.435
                        c0.778-3.655-0.731-1.709-0.226-10.04c0.35-5.751,2-16,11-18.5c7.654-2.126,15.875,12.04,12.918,29.5"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M224.37,229.751
                        c0.778-3.655-0.731-1.709-0.226-10.04c0.35-5.751,2-16,11-18.5c7.654-2.126,15.875,12.04,12.918,29.5"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M202.729,243.607
                        c0.778-3.655-0.731-1.709-0.226-10.04c0.35-5.751,2-16,11-18.5c7.654-2.126,15.875,12.04,12.918,29.5"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M181.087,258.019
                        c0.778-3.655-0.731-1.709-0.226-10.04c0.35-5.751,2-16,11-18.5c7.654-2.126,15.875,12.04,12.918,29.5"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M159.446,271.875
                        c0.778-3.655-0.731-1.709-0.226-10.04c0.35-5.751,2-16,11-18.5c7.654-2.126,15.875,12.04,12.918,29.5"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M137.93,285.37c0.778-3.655-0.731-1.709-0.226-10.04
                        c0.35-5.751,2-16,11-18.5c7.654-2.126,15.875,12.04,12.918,29.5"/>
                    <path fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M307,314l3-9"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M309,307l1-26.721c0,0,7.771-1.097,10.024,0
                        c2.055,1,5.642,7.196,5.642,7.196L309,307z"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M311.02,275.619L348,182c0,0,7.037-1.099,9,0
                        c2.505,1.402,6,9.788,6,9.788l-35,92.19c0,0-4.061-6.83-6.334-7.979C319.288,274.799,311.02,275.619,311.02,275.619z"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M384,140l-17,49.788c0,0-4.021-10.092-7-11.788
                        c-2.824-1.608-13,0-13,0l18-48c0,0,8.521-1.191,11,0c4.328,2.08,12,15,12,15l-15,45.788"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M432.584,363.333L265,476L134.599,300"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M432.084,370.333L264.5,484L134.1,308"/>
                </SVG>
            </Skill>
        : null}
        {active ? skill === "ux" &&
            <Skill className="ux">
                <SVG version="1.1" id="UX" x="0px" y="0px"
                        width="300px" height="300px" viewBox="0 0 600 600" enableBackground="new 0 0 300 300">
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M383.5,183.039c32.9,0,75.815,0,99.5,0
                        c13.5,0,22.449,9.326,22.449,20.96c0,53.5,0,160.5,0,214c0,13.168-9.418,23.203-22.449,23.203c-39.535,0-157.143,0-157.143,0v15.306
                        c0,0,46.893,0,62.244,0c2.552,0,2.551,10.204,0,10.204c-24.352,0-133.352,0-164.408,0c-2.545,0-2.545-10.184,0-10.184
                        c12.431,0,63.388,0,63.388,0v-15.306c0,0-128.562-0.017-171.082-0.017c-10.166,0-18.714-11.342-18.714-24.207
                        c0-53.25,0-159.167,0-213c0-12.634,9.881-20.96,18.715-20.96c53.868,0,147.858,0,229.5,0"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M368,204h115v213H115.5V204h217"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M312.5,429.5c0,3.59-2.91,6.5-6.5,6.5
                        s-6.5-2.91-6.5-6.5s2.91-6.5,6.5-6.5S312.5,425.91,312.5,429.5z"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M306,283.5v107H144.5v-127h150"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M144.5,247v-30H305v30H144.5z"/>
                    <path fill="#none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M325.5,263.5h141"/>
                    <path fill="#none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M326.5,304h141"/>
                    <path fill="#none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M326.5,324.876h141"/>
                    <path fill="#none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M325.5,283.5h141"/>
                    <path fill="#none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M326.5,390.5h141"/>
                    <path fill="#none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M326.5,346h141"/>
                    <path fill="#none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M326.5,369h141"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M205,367c0,0,14.124-12.995,16-17
                        c4.333-9.248,5.376-31.023,12.334-38.5c7.187-7.723,34.333-9.5,34.333-9.5L284,314.334c0,0-5.43,37.554-18.333,45.542
                        C253.506,367.404,205,367,205,367z"/>
                    <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterlimit="10" d="M278.667,290L404,89.333c0,0,19.393-1.189,25,3
                        C433.943,96.026,439,113,439,113L292.334,300.666L278.667,290z"/>
                </SVG>
            </Skill>
        : null}
        </>
    );
};

const Draw = keyframes`
    to {
        stroke-dashoffset: 0
    };
`;

const Skill = styled.div`
    path {
        animation: ${Draw} 1s linear forwards;
    };
`;

const SVG = styled.svg`
    width: 100%;
`;