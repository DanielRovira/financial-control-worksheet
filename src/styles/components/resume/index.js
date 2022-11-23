import React from 'react';
import ResumeItem from '../resumeItem';
import * as C from './styles';

const Resume = () => {
    return ( 
        <C.Container>
            <ResumeItem/>
            <ResumeItem/>
            <ResumeItem/>
        </C.Container>
     );
}
 
export default Resume;