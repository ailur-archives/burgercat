from werkzeug.security import generate_password_hash, check_password_hash

passwordthing = input("insert pass: ")
print(generate_password_hash(passwordthing))