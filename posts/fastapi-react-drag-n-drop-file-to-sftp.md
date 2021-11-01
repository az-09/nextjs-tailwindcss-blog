---
title: 'FastAPI, React - Drag n Drop to upload files to Sftp server'
description: 'Drag and Drop files to browser to upload the files to Sftp server'
date: '2021-10-31'
---
### Prerequisites 
- [Upload files to sftp using ssh keys](https://www.taeheechoi.com/posts/python-sftp-using-ssh-keys-) 

### Steps
0. End result. Receive an email from server.
    ![](https://github.com/az-09/fastapi-react-upload-file-sftp/blob/main/images/0.jpg?raw=true)

    ![](https://github.com/az-09/fastapi-react-upload-file-sftp/blob/main/images/4.jpg?raw=true)

1. Clone git. 
    ```
    clone https://github.com/az-09/fastapi-react-upload-file-sftp.git .
    ```

2. Create a virtual environment for backend and install dependencies then run app. Make sure to generate id_rsa (See prerequisite).  
    ```
    $ cd backend
    $ python3 -m venv venv
    $ source venv/bin/activate
    (venv) $ pip install -r requirements.txt
    (venv) $ python app.py
    ```
3. Open a new terminal and install packages for frontend
    ```
    $ cd frontend
    $ npm install
    $ npm start 
    ```
4. Note app.py in backend
- Handle Cors
    ```python
    from fastapi.middleware.cors import CORSMiddleware

    origins = [
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:3000',
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    ```
- Get. Response model
    ```python
    import glob
    from typing import List
    from pydantic import BaseModel
    
    class LocalFile(BaseModel):
        name: str

    @app.get('/files/', response_model=List[LocalFile])
    async def get_list_files():
        file_list = []
        for file in glob.glob('./data/*.*'):
            file_list.append({'name': Path(file).name}) # Path(file).name file name with ext only
        return file_list 

    ```
5. Note DragDropFileUpload.js
    ```javascript
        const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    ```

### [Github](https://github.com/az-09/fastapi-react-upload-file-sftp.git)


### References
- https://fastapi.tiangolo.com/tutorial/request-files/
- https://stackoverflow.com/questions/63580229/how-to-save-uploadfile-in-fastapi
- https://www.bezkoder.com/drag-drop-file-upload-react-hooks/
- https://stackoverflow.com/questions/61497145/pydantic-model-for-array-of-jsons
- https://www.bezkoder.com/node-js-express-file-upload/
- https://react-dropzone.js.org/
- https://www.codegrepper.com/code-examples/whatever/bootstrap+list+no+bullets