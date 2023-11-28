
import { useState, useEffect, useRef } from 'react';

// import { useParams } from 'react-router-dom';
import { IconButton  } from '@mui/material';
import { Sync as SyncIcon,
         CloudDoneOutlined as CloudDoneOutlinedIcon } from '@mui/icons-material';

const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);


const SavingCloud = ({ syncing }) => {
    const [cloudText, setCloudText] = useState('none');
    const timer = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current)
            setCloudText('unset')
            timer.current = setTimeout(() => {
                setCloudText('none')
            }, 4000);
        };
    }, [syncing]);

    return (
        <IconButton disabled>
            {syncing
             ? <><SyncIcon /><p>{lang.saving}</p></>
             : <><CloudDoneOutlinedIcon /><p style={{display: cloudText}}>{lang.saved}</p></>
            }
        </IconButton>
    )
}

export default SavingCloud;