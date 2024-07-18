import { useState } from 'react';

function UploadFile({ setAmount }) {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
    document.getElementById('inputFile').click()
  }
  
  async function handleSubmit(event) {
    event.preventDefault()
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
    if (res.amount) {
        setAmount(Number(res.amount.replace('.','').replace(/,/g, '.')))
    }
    return
  }

  return (
    <div className="UploadFile">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange}/>
          <button id="inputFile" type="submit" style={{visibility:"hidden"}} >Upload</button>
        </form>
    </div>
  );
}

export default UploadFile;