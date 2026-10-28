import os
import re

src_dir = r'C:\Users\ara\Downloads\PROYECTOS KINDEV\MH\src'
replaced_files = []

for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace /assets/images/*.jpg and *.png with .webp
            def repl(m):
                path = m.group(1)
                return f"{path}.webp"

            new_content = re.sub(r'(\.{1,2}/assets/images/[a-zA-Z0-9_\-]+)\.(?:jpg|png)', repl, content)
            
            if new_content != content:
                with open(fp, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                replaced_files.append(f)

print('Updated files with .webp:', replaced_files)
