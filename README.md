burgercat: burger social media

### self hosting:
this guide assumes you have git and python3 installed

```
git clone https://codeberg.org/burger-software/burgercat
cd burgercat
python init_db
python main
```

### zero downtime restarts:
- launch new burgercat server
- close previous server

### contribution guidelines:
- please check that your PR does not break anything
- unless absolutely nessecary, avoid adding dependecies
- for consistency, use quotation marks, not apostrophes when possible