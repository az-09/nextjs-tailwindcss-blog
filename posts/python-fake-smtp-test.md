---
title: 'Python - Fake Smtp and test email'
description: 'How to run a fake smtp server and send a test email then save it to mail folder'
date: '2021-01-01'
---
### Steps
0. End result. Save a test e-mail message to mail folder
    ```
    b'From: From Person <from_email@test.com>
    To: To Person <to_email@test.com>
    Subject: Fake SMTP e-mail test

    This is a fake e-mail message.'
    ```
    ![](https://github.com/taeheechoi/python-fake-smtp-test/blob/main/images/0.jpg?raw=true)

1. Create fake-smtp.py and copy / paste following codes.
    ``` python
    import argparse
    import asyncore
    import smtpd
    from datetime import datetime
    from pathlib import Path


    def get_date_time_stamp():
        today = datetime.now()
        timestamp = str(today.timestamp()).split('.')[0]
        return f'{today:%m_%d_%Y}_{timestamp}' # 10_26_2021_1635302925

    class FakeSMTPServer(smtpd.SMTPServer):
        def __init__(*args, **kwargs):
            smtpd.SMTPServer.__init__(*args, **kwargs)
            print ('Running fake smtp server')

        def process_message(*args, **kwargs):

            destination = Path.cwd() / f'mail/{get_date_time_stamp()}.eml'
            
            with open (destination, 'w') as file:
                file.writelines(str(args[4]).replace('\\n', '\n')) # email content only and replace \n to newline

    if __name__ == '__main__':

        parser = argparse.ArgumentParser()
        parser.add_argument('-s', '--server', type=str, default='127.0.0.1', help='server to listen on. Default 127.0.0.1')
        parser.add_argument('-p', '--port', type=int, default=2525, help='port to listen on. Default 2525.')
        args = parser.parse_args()
        # python fake_smtp.py -s 127.0.0.1 -p 2525
        
        smtp_server = FakeSMTPServer((args.server, args.port), None)
        
        try:
            asyncore.loop()
        except KeyboardInterrupt:
            smtp_server.close()

    ```
2. Create test-email.py and copy / paste following codes
    ```python
    import smtplib

    from_email = 'from_email@test.com'
    to_emails = ['to_email@test.com']

    message = '''From: From Person <from_email@test.com>
    To: To Person <to_email@test.com>
    Subject: SMTP e-mail test

    This is a fake e-mail message.
    '''

    if __name__ == '__main__':
        try:
            mail = smtplib.SMTP('127.0.0.1', 2525) # Enter host and port from fake_server.py
            mail.sendmail(from_email, to_emails, message)         
            print ('Successfully sent email')
        
        except:
            print ('Error: unable to send email')
    ``` 

3. Run fake-smtp.py. Ctrl + F5 or Right click >> "Run Python File in Terminal"  within VS Code or run it manually if specific host and IP are required.
    ```
    $ python fake_smtp.py -s 123.456.678.9 -p 25
    ```
 

5. Open a new terminal and run fake-email.py. Host and port must match with fake-smtp.py
    ```
    $ python fake_email.py 
    ```

### [Github](https://github.com/taeheechoi/python-fake-smtp-test.git)