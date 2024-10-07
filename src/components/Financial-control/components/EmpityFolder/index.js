

import './index.css'
import { useParams } from 'react-router-dom';
import empityFolderImage from './empityFolderImage.svg' //throwIfNamespace: false
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/atom';

export default function EmpityFolder() {
    const language = useAtomValue(languageAtom);
    const lang = require(`components/Languages/${language}.json`);
    const params = useParams();

    return (
        <div className='EmpityFolder'>
            {params.taskTitle === 'TRASH' ? 
            (<p>{lang.empityTrashMessage}</p>) :
            (<p>{lang.empitySheet}</p>)
            }
            <img src={empityFolderImage} alt="Empity Folder" />
        </div>
    )}