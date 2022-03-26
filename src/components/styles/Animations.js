import { css, keyframes } from 'styled-components';

export const FadeAnimation = keyframes`
    to { opacity: 1; }
`;

export const SlideAnimation = keyframes`
    to { transform: matrix(1, 0, 0, 1, 0, 0); }
`;

export const FadeAndSlideAnimation = keyframes`
    to { opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0); }
`;

export const ScaleAnimation = keyframes`
    to { transform: translate3d(0,0,0) scale(1); }
`;

export const BounceAnimation = keyframes`
    12% { opacity: .2; transform: translate3d(0,0,0) scale(0.25); }
    23% { opacity: .95; transform: translate3d(0,0,0) scale(0.95); }
    24% { opacity: 1; transform: translate3d(0,0,0) scale(1); }
    25% { opacity: .95; transform: translate3d(0,0,0) scale(0.975); }
    33% { opacity: .75; transform: translate3d(0,0,0) scale(0.75); }
    43% { opacity: .7; transform: translate3d(0,0,0) scale(0.7); }
    48% { opacity: .75; transform: translate3d(0,0,0) scale(0.75); }
    58% { opacity: .9; transform: translate3d(0,0,0) scale(1); }
    63% { transform: translate3d(0,0,0) scale(0.95); }
    73% { transform: translate3d(0,0,0) scale(1); }
    76% { transform: translate3d(0,0,0) scale(0.98); }
    78% { opacity: 1; transform: translate3d(0,0,0) scale(1); }
    100% { opacity: 1; transform: translate3d(0,0,0) scale(1); }
`;

export const Fade = ({ $duration, $delay }) => css`
    opacity: 0;
    animation: 
    /* duration: */ ${`${$duration || 1}s`}
    /* timing: */ ease-out
    /* delay: */ ${`${$delay || 0}s`}
    /* iteration: */ 1
    /* direction: */ normal
    /* fill mode: */ forwards
    /* play state: */ running
    /* name: */ ${FadeAnimation};
`;

export const Slide = ({ $duration, $delay }) => css`
    transform: matrix(1, 0, 0, 1, 0, -200);
    animation: 
    /* duration: */ ${`${$duration || 0.5}s`}
    /* timing: */ ease-in-out
    /* delay: */ ${`${0.4 + $delay}s`}
    /* iteration: */ 1
    /* direction: */ normal
    /* fill mode: */ forwards
    /* play state: */ running
    /* name: */ ${SlideAnimation};
`;

export const FadeAndSlide = ({ $dip, $duration, $delay }) => css`
    opacity: 0;
    transform: ${$dip === 1 ? "translate3d(0px, 90px, 0px);" : "matrix(1, 0, 0, 1, 0, 50);"};
    animation: 
    /* duration: */ ${$dip === 1 ? `${$duration || 0.7}s` : `${$duration || 0.75}s`}
    /* timing: */ ease-out
    /* delay: */ ${`${$delay || 0}s`}
    /* iteration: */ 1
    /* direction: */ normal
    /* fill mode: */ forwards
    /* play state: */ running
    /* name: */ ${FadeAndSlideAnimation};
`;

export const Scale = ({ $duration, $delay }) => css`
    transform: translate3d(0px, 0px, 0px) scale(0);
    animation: 
    /* duration: */ ${`${$duration || 0.75}s`}
    /* timing: */ ease
    /* delay: */ ${`${$delay || 0}s`}
    /* iteration: */ 1
    /* direction: */ normal
    /* fill mode: */ forwards
    /* play state: */ running
    /* name: */ ${ScaleAnimation};
`;

export const Bounce = css`
    opacity: .2;
    transform: translate3d(0px, 0px, 0px) scale(0);
    animation: 
    /* duration: */ ${`1.6s`}
    /* timing: */ linear
    /* delay: */ ${`0s`}
    /* iteration: */ 1
    /* direction: */ normal
    /* fill mode: */ forwards
    /* play state: */ running
    /* name: */ ${BounceAnimation};
`;