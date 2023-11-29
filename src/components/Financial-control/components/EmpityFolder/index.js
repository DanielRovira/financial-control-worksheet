

import './index.css'
import { useParams } from 'react-router-dom';
import empityFolderImage from './empityFolderImage.svg' //throwIfNamespace: false
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

export default function EmpityFolder({ setAdd }) {
  const params = useParams();
//   setAdd(true); //Quebra o gráfico quando da f5
  return (
      <div className='EmpityFolder'>
          {params.taskTitle === 'TRASH' ? 
          (<p>{lang.empityTrashMessage}</p>) :
          (<p>{lang.empitySheet}</p>)
          }
          <img src={empityFolderImage} alt="Empity Folder" />
      </div>
  )}