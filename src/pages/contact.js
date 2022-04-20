import * as React from "react";
import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { Fade } from "../components/styles/Animations";
import SEO from '../components/SEO';

export default function ContactPage() {

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        message: "",
        boop: ''
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const body = {
            ...values,
            RECIPIENT: `${process.env.SES_RECIPIENT}`
        };

        // console.log(body);

        const res = await fetch(`${process.env.API_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const text = JSON.parse(await res.text());

        if (res.status >= 400 && res.status < 600) {
            setLoading(false);
            setMessage(''); // clears message if user has already successfully submitted once before an error
            setError(text);
        } else {
            // it worked!
            setLoading(false);
            setError(''); // clears message if user has successfully submitted after an error
            setMessage('Email successfully sent!');
            handleReset();
        };
    };

    const handleReset = () => {
        setValues(initialValues);
    };

    return (
        <>
            <SEO title="Get in touch" />
            <Main>
                <Section>
                    <H2 $duration={0.5} $delay={0.25}>Get in touch...</H2>
                    <Form $duration={0.5} $delay={0.5} onSubmit={handleSubmit}>
                        <Paragraph>Send me a message and I'll respond as soon as I can!</Paragraph>
                        <Fieldset disabled={loading}>
                            <Group>
                                <Input 
                                    id="name"
                                    name="name" 
                                    type="text" 
                                    value={values.name} 
                                    onChange={handleInputChange} 
                                    required
                                />
                                <Label htmlFor="name">Name</Label>
                                <Highlight />
                                <Bar />
                            </Group>
                            <Group>
                                <Input 
                                    id="email"
                                    name="email" 
                                    type="text" 
                                    value={values.email} 
                                    onChange={handleInputChange} 
                                    required
                                />
                                <Label htmlFor="email">Email</Label>
                                <Highlight />
                                <Bar />
                            </Group>
                            <Group>
                                <Input 
                                    as="textarea"
                                    id="message"
                                    name="message" 
                                    type="message" 
                                    value={values.message} 
                                    onChange={handleInputChange} 
                                    required
                                />
                                <Label htmlFor="message">Message</Label>
                                <Highlight />
                                <Bar />
                            </Group>
                            <Input 
                                name="boop"
                                type="boop"
                                value={values.boop}
                                onChange={handleInputChange}
                                className="boop"
                            />
                            <Button type="submit" disabled={loading} aria-label={loading ? "Loading" : "Send"}>Send!</Button>
                            {loading ? 
                                <LoadingContainer>
                                    <Loading>
                                        <Spinner />
                                    </Loading>
                                </LoadingContainer>
                            : null}
                        </Fieldset>
                    </Form>
                    <ResponseContainer>
                        <div aria-live="polite" role="status">
                            {message ? <p>{message}</p> : ''}
                        </div>
                        <div aria-live="assertive">
                            {error ? <RedError>Error: {error}</RedError> : ''}
                        </div>
                    </ResponseContainer>
                </Section>
            </Main>
        </>
    );
};

/* --- loading spinner --- */
/* generated by https://loading.io/ */

const SpinAnimation = keyframes`
    0% { transform: translate(-50%,-50%) rotate(0deg); }
    100% { transform: translate(-50%,-50%) rotate(360deg); }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loading = styled.div`
    position: absolute;
    top: 28%;
    width: 250px;
    height: 250px;
    overflow: hidden;
    background: none;
`;

const Spinner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 84.61px;
    height: 84.61px;
    border: 13.189999999999998px solid #01bcd4;
    border-top-color: transparent;
    border-radius: 50%;

    animation: ${SpinAnimation} 1.4492753623188404s linear infinite;

    box-sizing: content-box;
`;

/* --- animations --- */

const inputHighlight = keyframes`
    from {
		background: #5264AE;
	};
    
	to {
		width: 0;
		background: 0 0;
	};
`;

/* ------------------ */

const Group = styled.div`
    position: relative;
    margin-bottom: 3rem;
`;

const Highlight = styled.span`
    pointer-events: none;
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    opacity: 0.5;
`;

const Bar = styled.span`
    position: relative;
    display: block;
    width: 100%;

    &:before, :after {
        height: 2px;
        width: 0;
        bottom: 1px;
        position: absolute;
        background: #5264AE;
        transition: .2s ease all;
        content: '';
    };

    &:before {
        left: 45%;
    };

    &:after {
        right: 45%;
    };
`;

const Main = styled.main`
    display: flex;
    flex-flow: column wrap;
    margin: 0 auto;
    width: 100%;
    text-align: center;
`;

const Section = styled.section`
    padding-top: 5em;
    min-height: auto;
`;

const H2 = styled.h2`
    ${Fade};
`;

const Paragraph = styled.p`
    font-size: 1rem;
    margin: 0;
    margin-bottom: 2em;
`;

const Form = styled.form`
    width: 300px;
    margin: 0 auto;
    ${Fade};

    @media only screen and (max-width: 480px) {
        width: 275px;
    };
`;

const Fieldset = styled.fieldset`
    margin: 0;
    padding: 0;
    border: none;

    &:disabled {
        opacity: 50%;
    };
`;

const Label = styled.label`
    color: #999;
	font-size: 18px;
	font-weight: 400;
	position: absolute;
	left: 5px;
	top: 10px;
	transition: .2s ease all;
    pointer-events: none;
`;

const LabelTransitions = css`

    &:focus {
        outline: 0;
    };

    &:focus~label, :valid~label {
        top: -20px;
        font-size: 14px;
        color: #5264AE;
    };

    &:focus~${Highlight} {
        animation: ${inputHighlight} .3s ease;
    };

    &:focus~${Bar}:before, :focus~${Bar}:after {
        width: 55%;
    };
`;

const Input = styled.input`
    box-sizing: border-box;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #757575;
    background: 0 0;
    ${LabelTransitions};

    &.boop {
        display: none;
    };
`;

const Button = styled.button`
    background-color: #00BCD4;
    padding: 1em;
    border: none;
    font-size: 1.25rem;
    border-radius: 3px;
    box-shadow: 2px 2px 2px #d7d4de;
    color: white;
    cursor: pointer;
    transition: all .2s ease-out;

    &:hover {
        background: #00d3ee;
        box-shadow: 0 0 8px 5px #d7d4de;
        transition: all .2s ease-out;
    };

    &:disabled {
        background: #00d3ee;
        box-shadow: 0 0 8px 5px #d7d4de;
        cursor: default;
        opacity: 50%;
    };
`;

const ResponseContainer = styled.div`
    margin-top: 1em;
`;

const RedError = styled.p`
    color: #c74747;
    font-size: 2em;
`;
