---
title: 'Python - Search words using multiprocessing and mmap'
description: 'Use multiprocessing and mmap to search words in files quickly'
date: '2021-01-01'
---
### Steps
0. End result. File names that contain search words.
```
    data/sample7.txt, data/sample9.txt, data/sample3.txt
```
1. Create data folder and sample text files in the folder.

2. Create a new python file and paste below code. Update url to the webhook eg) demo.py
```python
    #  https://docs.python.org/3/library/mmap.html
    import mmap
    from multiprocessing import Pool
    from pathlib import Path
    from typing import List

    search_words=['Taehee Choi', 'taeheechoi']

    def file_list() -> List[str]:
        return [str(path) for path in Path().glob('data/*.*')] # path for all files in data folder

    def search_word(file: str) -> str:
        with open(file) as f:
            with mmap.mmap(f.fileno(), length=0, access=mmap.ACCESS_READ) as mm:
                for word in search_words:
                    if mm.find(bytes(word, 'utf-8')) != -1:
                        return f.name # return name only <_io.TextIOWrapper name='data/sample9.txt' mode='r' encoding='utf-8'>

    def main():
        file_found = []
        
        with Pool(4) as pool: # 4 worker processes
            file_found += pool.map(search_word, file_list())
        
        file_name_found = ', '.join([file for file in file_found if file]) 
        
        print(file_name_found)

    if __name__ == '__main__':
        main()
```
5. Run demo.py. Ctrl + F5 or Right click >> "Run Python File in Terminal"  within VS Code.

### [Github](https://github.com/az-09/python-search-words-using-multiprocessing-mmap.git)

### References
- https://docs.python.org/3/library/mmap.html
