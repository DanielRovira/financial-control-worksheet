import React from 'react';
import * as C from './styles';
import { useParams } from "react-router-dom";

const Header = ({ sectionName }) => {
    const params = useParams();
    let section = sectionName.filter((sec) => sec.title === params.taskTitle)[0]
    return (
        <C.Container>
            <C.Header>
                <C.Title>{section ? section.name : ""}</C.Title>
            </C.Header>
        </C.Container>
    );
};
 
export default Header;