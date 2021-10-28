---
title: 'Python - Move a text file to a folder automatically'
description: 'Monitor two folders "foo and bar" and move only text file created to home folder.'
date: '2021-01-01'
---
### Steps
0. End result. Move only text files created on foo and bar folders to home folder 
    ![](https://github.com/az-09/python-move-new-file-to-directory/blob/main/images/0.jpg?raw=true)

1. Create demo.py and copy / paste following codes.
    ``` python
    import shutil
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
            
            shutil.move(event.src_path, self.target_folder) # move source file to target folder

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
            event_handler = FolderHandler(target_folder=folder['target_folder'], patterns=['*.txt'],  ignore_directories=True, case_sensitive=False)
            
            observer.schedule(event_handler,  folder['source_folder'],  recursive=True)

        observer.start()

        try:
            while True:
                time.sleep(1)

        except KeyboardInterrupt:
            observer.stop()

        observer.join()
    ```
2. Run demo.py. Ctrl + F5 or Right click >> "Run Python File in Terminal"  within VS Code.

3. Create text files in foo and bar folders. 

4. Create files in other formats in food and bar folders.

### [Github](https://github.com/az-09/python-move-new-file-to-directory)