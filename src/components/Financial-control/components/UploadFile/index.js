import './styles.css'
import { useEffect } from 'react';
import uploadImage from './uploadImage.svg' //throwIfNamespace: false
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

function UploadFile({ isDragActive, acceptedFiles, setUploadedData }) {
  const language = useAtomValue(languageAtom)
  const lang = require(`components/Languages/${language}.json`);

  useEffect(() => {
      handleSubmit(acceptedFiles)
  }, [acceptedFiles]); // eslint-disable-line
  
  async function handleSubmit(acceptedFiles) {
    let file = acceptedFiles[0]
    // console.log(file.name)
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      // console.log(Object.fromEntries(formData.entries()))
      const res = await fetch(`/api/finances/uploadFile`,
      {
          method:'POST',
          // headers: { 'Content-Type': 'multipart/form-data' },
          credentials: 'include',
          body: formData
      })
      .then(response => response.json())
      .catch(error => {
          // return (alert("Erro"));
      })
  
      let uploadData = {
        text: res.text,
        fields: res.fields,
        date: res.date,
        desc: file.name.slice(-4,-3) === "." ? file.name.slice(0,-4) : file.name,
        amount: res.amount,
        provider: res.destiny
      }
  
      setUploadedData(uploadData)
    }
    // return
  }

  return (
    <div className="UploadFile" style={{display: isDragActive ? 'flex' : 'none'}}>
      <div className="UploadFileContent">
        <img src={uploadImage} alt="Upload" />
        <p>{lang.dropFile}</p>
      </div>
    </div>
    )
}

export default UploadFile;