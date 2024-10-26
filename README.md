
# BlogShot

BlogShot is a full-stack web application designed for creating and managing blog posts. It features user authentication, post creation, and category management. The application is built using Node.js, Express, MongoDB for the backend, and React for the frontend.

# Preview

![BlogShot](https://github.com/user-attachments/assets/c3ee9ca8-31ec-45bc-8048-ead9b05223c0)

## Features

- User Authentication: Register, login, and logout functionalities.
- Post Management: Create, update, delete, and view blog posts.
- Category Management: Organize posts into categories.
- File Upload: Upload images for blog posts.
- Responsive Design: Works on various devices and screen sizes.

## Technologies Used

- **Frontend:** React, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Environment Variables:** dotenv
- **CORS:** Enabled for cross-origin requests

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/blogFullstack.git
   cd blogFullstack
   ```

2. **Backend Setup:**
   - Navigate to the `api` directory:
     ```bash
     cd api
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `api` directory and add your MongoDB URI and JWT secret:
     ```
     MONGO_URL=your_mongo_db_uri
     JWT_SECRET=your_jwt_secret
     ```

3. **Frontend Setup:**
   - Navigate to the `client` directory:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

## Running the Application

1. **Start the Backend Server:**
   - In the `api` directory, run:
     ```bash
     npm start
     ```
   - The backend server will run on `http://localhost:3003`.

2. **Start the Frontend Server:**
   - In the `client` directory, run:
     ```bash
     npm start
     ```
   - The frontend server will run on `http://localhost:5173`.

## Usage

- Visit `http://localhost:5173` in your browser to access the application.
- Register a new account or log in with existing credentials.
- Create, edit, and delete blog posts.
- Organize posts into categories.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact [satyapriyobiswas1@gmail.com](mailto:satyapriyobiswas1@gmail.com).




