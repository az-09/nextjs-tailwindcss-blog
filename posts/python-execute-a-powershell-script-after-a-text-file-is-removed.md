---
title: 'Python - Execute a powershell script after a text file is removed from a folder'
description: 'Monitor two folders "foo and bar" and execute a powershell script if a text file is removed.'
date: '2021-01-01'
---
### Prerequisites 
- [Move a text file to a folder automatically](https://www.taeheechoi.com/posts/python-move-a-text-file-to-a-folder-automatically) 

### Steps
0. End result. Output src_path and target_folder name to console.

    ![](https://github.com/az-09/python-move-or-remove-file-then-execute-powershell/blob/main/images/0.jpg?raw=true)

1. Create demo.py and copy / paste following codes.
    ``` python
    import shutil
    import subprocess
    import time

    from watchdog.events import PatternMatchingEventHandler
    from watchdog.observers import Observer


    class FolderHandler(PatternMatchingEventHandler):

        def __init__(self, target_folder, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.target_folder = target_folder

        def on_created(self, event):
            # to prevent PermissionError: [Errno 13] Permission denied:
            time.sleep(1)

            # move source file to target folder
            shutil.move(event.src_path, self.target_folder)

        def on_deleted(self, event):
            # to prevent PermissionError: [Errno 13] Permission denied:
            time.sleep(1)

            command = ['PowerShell', '-ExecutionPolicy', 'Unrestricted', f"./powershell.ps1 -src_path '{event.src_path}' -target_folder '{self.target_folder}'"]

            subprocess.call(command)


    if __name__ == '__main__':
        # source_folder: watching folder, target_folder: move file to folder.
        folders = {
            'foo': {
                'source_folder': './foo',
                'target_folder': './home'
            },
            'bar': {
                'source_folder': './bar',
                'target_folder': './home'
            }
        }

        observer = Observer()

        for _, folder in folders.items():
            # patterns: txt file only
            event_handler = FolderHandler(target_folder=folder['target_folder'], patterns=[
                                        '*.txt'],  ignore_directories=True, case_sensitive=False)
            observer.schedule(
                event_handler,  folder['source_folder'],  recursive=True)

        observer.start()

        try:
            while True:
                time.sleep(1)

        except KeyboardInterrupt:
            observer.stop()

        observer.join()
    ```

2. Create a powershell.ps1 then copy / paste following codes.
    ``` powershell
    param(
    [string]$src_path,
    [string]$target_folder
    )

    Write-Output "src_path: " $src_path "target_folder: " $target_folder
    ```

3. Run demo.py. Ctrl + F5 or Right click >> "Run Python File in Terminal" within VS Code.

4. Create a text file in foo and bar folders. After the file is removed, output appears.   


### [Github](https://github.com/az-09/python-move-or-remove-file-then-execute-powershell.git)