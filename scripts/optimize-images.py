import os
import sys
from PIL import Image

TARGET_DIR = os.path.abspath(r'C:\Users\ara\Downloads\PROYECTOS KINDEV\MH\src\assets\images')
EXTENSIONS = ['.jpg', '.jpeg', '.png']

def format_size(bytes_val):
    return f"{bytes_val / 1024:.2f} KB"

def optimize_all():
    total_original = 0
    total_webp = 0
    processed_count = 0

    results = []

    for file in os.listdir(TARGET_DIR):
        name, ext = os.path.splitext(file)
        if ext.lower() not in EXTENSIONS:
            continue

        file_path = os.path.join(TARGET_DIR, file)
        orig_size = os.path.getsize(file_path)
        webp_path = os.path.join(TARGET_DIR, f"{name}.webp")

        try:
            with Image.open(file_path) as img:
                # Save as WebP
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    img.save(webp_path, 'WEBP', quality=85, method=6)
                else:
                    img = img.convert('RGB')
                    img.save(webp_path, 'WEBP', quality=82, method=6)

            webp_size = os.path.getsize(webp_path)
            savings = ((orig_size - webp_size) / orig_size) * 100

            total_original += orig_size
            total_webp += webp_size
            processed_count += 1

            results.append((file, orig_size, webp_size, savings))
        except Exception as e:
            print(f"Error processing {file}: {e}")

    print("------------------------------------------------------------------------------------------------")
    print(f"| {'Archivo Original'.ljust(45)} | {'Original'.ljust(12)} | {'WebP'.ljust(12)} | {'Ahorro'.ljust(10)} |")
    print("------------------------------------------------------------------------------------------------")
    for file, orig_size, webp_size, savings in results:
        print(f"| {file.ljust(45)} | {format_size(orig_size).ljust(12)} | {format_size(webp_size).ljust(12)} | {f'{savings:.1f}%'.ljust(10)} |")
    print("------------------------------------------------------------------------------------------------")
    print(f"\nRESUMEN:")
    print(f"- Total Original: {format_size(total_original)} ({total_original / (1024*1024):.2f} MB)")
    print(f"- Total WebP:     {format_size(total_webp)} ({total_webp / (1024*1024):.2f} MB)")
    total_savings = ((total_original - total_webp) / total_original) * 100
    print(f"- Ahorro Total:   {total_savings:.1f}%\n")

if __name__ == '__main__':
    optimize_all()
