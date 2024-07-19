import './styles.css'
import { useEffect } from 'react';

function UploadFile({ setDesc, setAmount, setProvider, acceptedFiles }) {

  useEffect(() => {
    return () => {
        handleSubmit(acceptedFiles[0])
    };
  }, [acceptedFiles]);
  
  async function handleSubmit(file) {
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
        // setDate(`${res.date.slice(-4)}-${res.date.slice(3,5)}-${res.date.slice(0,2)}`)
        setDesc(file.name.slice(-4,-3) === "." ? file.name.slice(0,-4) : file.name)
        setAmount(Number(res.amount.replace('.','').replace(/,/g, '.')))
        setProvider(res.destiny)
    }
    return
  }
}

export default UploadFile ;