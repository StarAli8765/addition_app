import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import server_url from './config';

function Profile() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState('');

  const handleEdit = (event) => {
    setEdit(!edit);
  }

  const changeName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  }

  const changeBio = (event) => {
    setBio(event.target.value);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files);
    console.log(file)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    if (file){
      for (var x = 0; x < file.length; x++) {
        console.log("added")
        data.append('file', file[x])
      }
    }
    const response = await fetch(server_url + '/api/upload', {
      method: 'POST',
      body: data,
    });
    console.log(response);
    setImgFile(server_url + '/images/Avartar.jpg');
    
    const rep_info = await fetch(server_url + '/api/addinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, bio: bio }),
      });
    console.log(rep_info);
    window.location.reload();
  }

  useEffect( () => {
    async function fetchData(){
      const response = await fetch(server_url + '/api/getinfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Backend calculation failed');
      }

      const data = await response.json();
      console.log(data);
      setName(data.name);
      setBio(data.bio);

      setImgFile(server_url + '/images/Avartar.jpg');
    }
    console.log(server_url);
    fetchData();
  }, []);

  return (
    <div style={{ margin: 'auto', paddingTop: '50px' }} >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button
          className="btn btn-secondary"
          onClick={handleEdit}
        >{edit ? 'View' : 'Edit'}</button>
      </div>
      {
        edit ?
          <form>
            <div className="row mb-3">
              <div className="col-md-4">
                {imgFile ? <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={imgFile} alt="img" /> :
                  <img style={{ maxHeight: '100%', maxWidth: '100%', marginBottom: '20px' }} src={server_url + '/images/Avartar.jpg'} alt="img" />}
                <input
                  className="form-control mb-3"
                  type="file" id="file"
                  accept=".jpg"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-md-8">
                <div className='mb-3'>
                  <input type="text" className="form-control" onChange={changeName} value={name}></input>
                </div>
                <div className='mb-3'>
                  <textarea className="form-control" style={{ minHeight: '200px' }} onChange={changeBio} value={bio}></textarea>
                </div>
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary mt-3"
                onClick={handleSubmit}
              >Upload</button>
            </div>
          </form> :
          <div className="row mb-3">
            <div className="col-md-4">
              {imgFile ? <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={imgFile} alt="img" /> :
                <img style={{ maxHeight: '100%', maxWidth: '100%', marginBottom: '20px' }} src={server_url + '/images/Avartar.jpg'} alt="img" />}
            </div>
            <div className="col-md-8">
              <h3>{name}</h3>
              {bio}
            </div>
          </div>
      }
    </div>
  );
}

export default Profile;