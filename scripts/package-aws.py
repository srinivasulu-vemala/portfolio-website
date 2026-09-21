import os
import sys
import zipfile

def package_aws():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dist_dir = os.path.join(base_dir, "dist", "portfolio", "browser")
    zip_path = os.path.join(base_dir, "portfolio-aws-deploy.zip")

    if not os.path.exists(dist_dir):
        print(f"Error: Build directory not found at {dist_dir}")
        print("Please run 'npm run build' first.")
        sys.exit(1)

    print(f"Packaging AWS deployment bundle from: {dist_dir}")
    print(f"Target archive: {zip_path}")

    # Remove existing zip if present
    if os.path.exists(zip_path):
        os.remove(zip_path)

    file_count = 0
    total_uncompressed_bytes = 0

    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for root, _, files in os.walk(dist_dir):
            for file in sorted(files):
                abs_file_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_file_path, dist_dir)
                
                # CRITICAL: Force POSIX forward slashes for Linux/AWS S3/Amplify compatibility
                posix_entry_name = rel_path.replace("\\", "/")
                
                zf.write(abs_file_path, arcname=posix_entry_name)
                file_count += 1
                total_uncompressed_bytes += os.path.getsize(abs_file_path)

    # Verification of generated zip
    print("\n--- Verifying Zip Entries ---")
    backslash_errors = []
    sample_entries = []
    
    with zipfile.ZipFile(zip_path, "r") as zf:
        for info in zf.infolist():
            # Check for illegal Windows backslashes in stored entry names
            if "\\" in info.filename:
                backslash_errors.append(info.filename)
            if len(sample_entries) < 10 or "fonts" in info.filename or "profile" in info.filename:
                sample_entries.append(info.filename)

    if backslash_errors:
        print(f"ERROR: Found {len(backslash_errors)} entries with backslashes:")
        for err in backslash_errors[:5]:
            print(f"  - {err}")
        sys.exit(1)

    zip_size_bytes = os.path.getsize(zip_path)
    print(f"SUCCESS: Packaged {file_count} files into '{os.path.basename(zip_path)}'.")
    print(f"Raw Size: {total_uncompressed_bytes / 1024:.1f} KB -> Compressed: {zip_size_bytes / 1024:.1f} KB")
    print("All entries strictly verified with POSIX forward slashes ('/').")
    print("\nSample entries:")
    for entry in sample_entries[:15]:
        print(f"  [POSIX] {entry}")

if __name__ == "__main__":
    package_aws()
