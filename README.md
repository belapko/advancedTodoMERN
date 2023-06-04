# How to run this project

# 1. Configure .env file in server folder:

  DATABASE_URL=your url from mongodb "mongodb+srv://username:keypass@cluster0.3t4fkae.mongodb.net/mydb?retryWrites=true&w=majority"
  
  ACCESS_TOKEN_SECRET="generate token or input whatever you want"
  
  REFRESH_TOKEN_SECRET="generate token or input whatever you want"
  
  STATIC=http://localhost:8000/uploads/
  
# 2. Go to server and run "npm install", than run "prisma generate", "npm run dev"

# 3. Go to client and run "npm install", "npm run start"
