---
title: 'Python - Send an email with attachments'
description: 'Send an email with attachments using Python and Gmail smtp'
date: '2021-01-01'
---
### Steps
0. End result. Email with 2 attachments. data1.csv, data2.csv
    ![](https://github.com/taeheechoi/python-send-email-with-attachments/blob/master/images/0.jpg?raw=true)

1. Create an app password on Gmail. https://myaccount.google.com/security
    ![](https://github.com/taeheechoi/python-send-email-with-attachments/blob/master/images/1.jpg?raw=true)
    ![](https://github.com/taeheechoi/python-send-email-with-attachments/blob/master/images/2.jpg?raw=true)
    ![](https://github.com/taeheechoi/python-send-email-with-attachments/blob/master/images/3.jpg?raw=true)
    ![](https://github.com/taeheechoi/python-send-email-with-attachments/blob/master/images/4.jpg?raw=true)

2. Make a new directory, cd into the folder and open VS code.
    ```
    $ mkdir python-send-email-with-attachments
    $ cd python-send-email-with-attachments
    $ code .
    ```

3. Create a new virtual env and activate it on terminal within VS Code.
    ```
    $ python3 -m venv venv
    $ source venv/bin/activate
    ```

4. Create gmail.py file, .env file and data files for testing on the root directory.
    ```
    .
    +-- gmail.py
    +-- .env
    +-- venv
    +-- data
        +-- data1.csv
        +-- data2.csv
    ```

5. Open .env and add variables.
    ```
    EMAIL_ID=youremail@gmail.com
    EMAIL_PASSWORD=app password 16 characters
    TO_EMAIL=test1@gmail.com;test2@gmail.com
    ```

6. install dotenv library to use .env file.
    ```
    $ pip install python-dotenv
    ```

7. Open gmail.py and copy/paste following codes.
    ```python
    import os
    import smtplib
    import ssl
    from email import encoders
    from email.header import Header
    from email.mime.base import MIMEBase
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from glob import glob
    from pathlib import Path

    from dotenv import load_dotenv

    load_dotenv()

    def email_with_attachment(header: str, recipient: list, body: str, attachments: list) -> None:
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"

    from_email = os.getenv("EMAIL_ID")
    email_password = os.getenv("EMAIL_PASSWORD")

    message = MIMEMultipart()
    message['From'] = from_email
    message['To'] = email_password
    message['Subject'] = Header(header, 'utf-8')

    if(attachments is not None):
        message.attach(MIMEText(body, 'plain', 'utf-8'))

        for attachment in attachments:
            attachment = open(attachment, 'rb')
            attachment_name = os.path.basename(str(attachment.name))

            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition',
                            'attachement; filename={}'.format(attachment_name))
            message.attach(part)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(from_email, email_password)
        server.sendmail(from_email, recipient, message.as_string())


    if __name__ == '__main__':

    to_email = os.getenv("TO_EMAIL").split(';')
    attachments = glob('data/*.csv')
    
    email_with_attachment(header='header...', recipient=to_email, body='body...', attachments=attachments)
    ```

8. Run gmai.py. Ctrl + F5 or Right click >> "Run Python File in Terminal"  within VS Code.

### [Github](https://github.com/taeheechoi/python-send-email-with-attachments)

### References
- https://realpython.com/python-send-email
