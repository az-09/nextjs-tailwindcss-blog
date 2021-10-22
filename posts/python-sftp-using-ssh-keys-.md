---
title: 'Python - Upload files to sftp using ssh keys'
description: 'Upload files to sftp site using ssh keys on Ubuntu(WSL)'
date: '2021-01-01'
---
### Steps
0. End result. Upload two files to sftp server.
    ```
    Files have been uploaded to sftp successfully.
    ```
    ![](https://github.com/az-09/python-sftp-using-ssh-keys/blob/main/images/0.jpg?raw=true)

1. Create a virtual environment and activate.
    ```
    $ python3 -m venv venv
    $ source venv/bin/activate
    ```
2. Install dependencies. 
    ```
    (venv) $ pip install python-dotenv
    (venv) $ pip install wheel
        Package wheel is required due to error below while installing pysftp.

        error: invalid command 'bdist_wheel'
        ----------------------------------------
        ERROR: Failed building wheel for pysftp
    (venv) $ pip install pysftp
    ```
3. Generate private and public keys.
    ```
    (venv) $ ssh-keygen -t rsa -b 4096 -C "demo for taeheechoi.com"
        Generating public/private rsa key pair.
        Enter file in which to save the key (/home/ubuntu/.ssh/id_rsa): # Enter
        Enter passphrase (empty for no passphrase): # Enter
        Enter same passphrase again: # Enter
        Your identification has been saved in /home/ubuntu/.ssh/id_rsa
        Your public key has been saved in /home/ubuntu/.ssh/id_rsa.pub
        The key fingerprint is:
        SHA256:1xO35pPIcmQtvxTCUmy3rwX6FnladZpbDUk3F5UG254 demo for taeheechoi.com
        The key's randomart image is:
        +---[RSA 4096]----+
        |             ...=|
        |           .  ++o|
        |            =o++o|
        |           = =+o+|
        |        S o O BE+|
        |         . = X===|
        |          . = *Bo|
        |           o o+= |
        |             .+  |
        +----[SHA256]-----+
    ```
4. Confirm keys are generated.
    ```
    (venv) $ ls ~/.ssh/id_*
    /home/ubuntu/.ssh/id_rsa  /home/ubuntu/.ssh/id_rsa.pub
    ```
5. Copy private key to root within VS code.
    ```
    (venv) $ cp ~/.ssh/id_rsa .
    ```
6. Restart ssh service.
    ```
    (venv) $ sudo service ssh restart
    ```
7. Rename public key to authorized_keys.
    ```
    (venv) $ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
    ```
8. Edit sshd_config to allow to use keys.
    ```
    (venv) $ sudo vi /etc/ssh/sshd_config
        Click Insert key
        Uncomment AuthorizedKeysFile
            AuthorizedKeysFile      .ssh/authorized_keys .ssh/authorized_keys2
        Click Esc then type :wq
    ```
9. Restart ssh service.
    ```
    (venv) $ sudo service ssh restart
    ```
10. Create a target folder "sftp" on the server.
    ```
    (venv) $ mkdir ~/sftp
    ```
11. Create .env file to enter host and credentials.
    ```
    SFTP_IPADDRESS=127.0.0.1
    SFTP_USERID=ubuntu
    SFTP_PRIVATE_KEY=id_rsa
    ```
12. Create a new python file and paste below code.  eg) demo.py
    ```python
    import os
    from pathlib import Path
    from typing import List

    import pysftp
    from dotenv import load_dotenv

    load_dotenv()

    def file_list() -> List[str]:
        return [str(path) for path in Path().glob('data/*.*')] # path for all files in data folder

    def main():
        sftp_host = os.getenv("SFTP_IPADDRESS")
        sftp_userid = os.getenv("SFTP_USERID")
        sftp_private_key = os.getenv("SFTP_PRIVATE_KEY")
   
        try:
            with pysftp.Connection(host=sftp_host, username=sftp_userid, private_key=sftp_private_key, port=22, cnopts=cnopts) as sftp:
                with sftp.cd('sftp'):
                    for file in file_list():
                        sftp.put(file)
                    print('Files have been uploaded to sftp successfully.')
        except:
            print('Upload has failed.')

    if __name__ == '__main__':
        main()

    ```

13. Run demo.py. Ctrl + F5 or Right click >> "Run Python File in Terminal"  within VS Code.

### [Github](https://github.com/az-09/python-sftp-using-ssh-keys.git)