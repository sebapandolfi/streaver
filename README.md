# Next.js and Prisma Blog App

Welcome to our Next.js and Prisma-powered blog application! This web app allows users to view and filter posts by the userId of the authors. Users can also delete posts with a confirmation modal.

## Getting Started

1. **Clone the repository to your local machine:**

```bash
git clone https://github.com/sebapandolfi/streaver.git
```

2. **Install dependencies:**

```bash
cd streaver
npm install
```

3. **Set up the database:**

   a. Create a `.env` file in the root of the project and add your database connection details:

   ```env
        DATABASE_URL="file:./dev.db"
   ```

   b. Run the migration script to create the necessary tables:

   ```bash
   npx prisma migrate dev
   ```

   c. Seed the tables with data:

   ```bash
    npm run seed
   ```
    In case of use Node 18, change in `package.json` the seed command to
  ```bash
    ts-node --esm ./scripts/seed.mts
   ```

4. **Run the development server:**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app in action!

## Features

### 1. List of Posts

Navigate to the `/posts` page to view all the posts. The posts are displayed as cards.

### 2. Delete Posts

Each post card has a "Delete" Icon. Clicking the button opens a confirmation modal to delete the post.

### 3. Error Handling

If there's an error retrieving posts or deleting a post, an error message will be displayed to the user.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. I welcome your feedback and improvements!

**Disclaimer:** This project was developed without prior knowledge of Next.js and Prisma, and it was completed within 15 hours of work. I appreciate your understanding and encourage contributions to enhance the application.

Happy coding! 🚀


