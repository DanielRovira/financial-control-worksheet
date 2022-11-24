import React from 'react';
import Form from './styles/components/Form/index';
import Header from './styles/components/Header';
import Resume from './styles/components/Resume';
import GlobalStyle from './styles/global'

const App = () => {
    return (
        <>
            <Header />
            <Resume />
            <Form />
            <GlobalStyle />
        </>
    );
}
 
export default App;