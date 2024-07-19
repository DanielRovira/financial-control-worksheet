import './styles.css'
import { useEffect } from 'react';

function UploadFile({ isDragActive, acceptedFiles, setUploadedData }) {

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
      const res = await fetch(`/api/financial-control/uploadFile`,
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
        <p>Drop the files here ...</p>
    </div>
    )
}

export default UploadFile;