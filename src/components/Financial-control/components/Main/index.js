import './styles.css'
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Main = () => {

    return (
        <div className='MainContainer'>
            <div className='Header'>
                <h1>{lang.welcome}</h1>
            </div>
            <div className='SubContainer'>

            </div>
        </div>
    )
}

export default Main