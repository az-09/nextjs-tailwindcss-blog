---
title: 'FastAPI - Run a function after POST method'
description: 'Send an email with attachments after POST to job uri'
date: '2021-01-01'
---
### Prerequsites
- [Send an email with attachments](https://www.taeheechoi.com/posts/python-send-%20an-email-with-attachments) 

### Steps
0. End result. Receive an email from server.
    ![](https://github.com/az-09/python-send-email-with-attachments/blob/master/images/0.jpg?raw=true)
    ![](https://github.com/az-09/fastapi-run-script-after-post/blob/main/images/0.jpg?raw=true)

1. Create a virtual environment and activate it.
    ```
    $ python3 -m venv venv
    $ source venv/bin/activate
    ```
2. Install dependencies. 
    ```
    (venv) $ pip install fastapi uvicorn[standard] python-dotenv
    (venv) clone https://github.com/az-09/python-send-email-with-attachments.git .
    ```
3. Rename .env_sample to .env and update environment variables with your credentials.
    ```
    EMAIL_ID=youremail@gmail.com
    EMAIL_PASSWORD=app password 16 characters
    TO_EMAIL=test1@gmail.com;test2@gmail.com
    ```
4. Create a new python file and paste below code.  eg) app.py
    ```python
    import os
    from datetime import datetime
    from glob import glob
    from typing import Optional

    from fastapi import FastAPI
    from pydantic import BaseModel, validator
    import uvicorn

    from gmail import email_with_attachment

    app = FastAPI()

    class DateTimeModeMixin(BaseModel):
        # To add timestamp script executed, https://pydantic-docs.helpmanual.io/usage/validators/
        created_at: datetime = None

        @validator("created_at", pre=True, always=True)
        def default_datetime(cls, value:datetime) -> datetime:
            return value or datetime.now()

    class Job(DateTimeModeMixin):
        name: str
        description: Optional[str]

    jobs = []

    def job_email_with_attachment():
        to_email = os.getenv("TO_EMAIL").split(';')
        attachments = glob('data/*.csv')
        email_with_attachment(header='header...', recipient=to_email, body='body...', attachments=attachments)

    @app.get('/jobs')
    async def get_jobs():
        return jobs

    @app.post('/jobs', status_code=201)
    async def add_job(job: Job):
        jobs.append(job)
        job_email_with_attachment()
        return jobs

    if __name__ == '__main__':
        uvicorn.run(app)
    ```

5. Run app.py. Ctrl + F5 or Right click >> "Run Python File in Terminal" within VS Code.

6. Install VS extension "REST Client."
    ![](https://github.com/az-09/fastapi-run-script-after-post/blob/main/images/1.jpg?raw=true)

7. Click "Send Request" on test.http file.
    ![](https://github.com/az-09/fastapi-run-script-after-post/blob/main/images/2.jpg?raw=true)

### [Github](https://github.com/az-09/fastapi-run-script-after-post.git)
