## 🚀 Product Management System

Welcome to the Product Management System, a full-stack web application designed to manage product combinations for a directory listing. This platform allows users to add, edit, and list product combinations (e.g., "Aluminium F12 Pipes") by selecting products, materials, and grades, with features for quick editing and bulk updates.

## Overview

✅ The Product Management System is a modern web application built with React for the frontend, Redux for state management, and Node.js with Express for the backend, utilizing MongoDB as the database.  
✅ It provides a user-friendly interface for managing product combinations, including adding new combinations, editing details, and filtering the product list.  
✅ The project aims to streamline the process of managing product directories while ensuring a responsive and scalable design.

## Features

✅ **Add Product Combinations**: Create new product combinations by selecting a product, material, and multiple grades through a modal.  
✅ **Product Listing**: View all product combinations in a table with filtering by product and material, and pagination support.  
✅ **Quick Edit**: Edit combination details (price, shape, length, thickness, etc.) directly from the listing with an expandable form.  
✅ **Bulk Edit**: Update multiple combinations at once using a bulk edit feature.  
✅ **Responsive Design**: Optimized for desktop and mobile devices with custom CSS styling.  
✅ **Error Handling**: Graceful handling of invalid inputs and API errors with user feedback.

## Tech Stack

✅ **Frontend**:  
   - React: For building the user interface.  
   - Redux: For state management.  
   - CSS: For custom styling.  
✅ **Backend**:  
   - Node.js: JavaScript runtime for the server.  
   - Express: Web framework for building the API.  
   - MongoDB: NoSQL database for storing data.  
   - Mongoose: ODM for MongoDB.  
✅ **Tools**:  
   - Postman: For testing API endpoints.  
   - MongoDB Compass: For database management.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)  
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)  
- Git  

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/product-management-system.git
   cd product-management-system
   ```

2. **Install Dependencies**:
   - Install root dependencies:
     ```bash
     npm install
     ```
   - Install server dependencies:
     ```bash
     cd server
     npm install
     ```
   - Install client dependencies:
     ```bash
     cd ../client
     npm install
     ```

3. **Set Up MongoDB**:
   - Ensure MongoDB is running locally on `mongodb://localhost:27017` or update the connection string in `server/server.js` if using a cloud instance.  
   - The database name is `product_management`.

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
     The server will run on `http://localhost:5000`.  
   - Start the frontend:
     ```bash
     cd client
     npm start
     ```
     The frontend will run on `http://localhost:3000`.

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Add Product Combinations**:
   - Click the "Add Products" button to open the modal.  
   - Select a product, material, and one or more grades.  
   - Click "Submit" to add the combinations to the list.

2. **View and Filter Products**:
   - Use the "Products" and "Materials" dropdowns to filter the list.  
   - View details like Material, Unit Length, and Shape in the "Product Details" column.  
   - Use pagination to navigate through the list.

3. **Quick Edit**:
   - Click "Quick Edit" on a combination to expand the row.  
   - Update fields like Price, Shape, Length, etc.  
   - Click "Update" to save changes or "Cancel" to discard.

4. **Bulk Edit**:
   - Select multiple combinations using the checkboxes.  
   - Use the "Bulk Edit" section to apply changes to all selected items.

## Contributing

✅ Fork the repository.  
✅ Create a new branch (`git checkout -b feature/your-feature`).  
✅ Make your changes and commit (`git commit -m "Add your feature"`).  
✅ Push to the branch (`git push origin feature/your-feature`).  
✅ Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Notes for Customization
- **Screenshots**: Replace `path/to/add-product-modal-screenshot.png` and `path/to/product-listing-screenshot.png` with actual paths to screenshots of your application. You can take screenshots of the "Add Product" modal and the product listing table, upload them to your GitHub repository, and link them here.
- **Repository URL**: Update the `git clone` URL with your actual GitHub repository URL.
- **License**: If you’re using a different license, update the "License" section accordingly.
- **Additional Features**: If you add more features (e.g., authentication, server-side pagination), update the "Features" and "API Endpoints" sections to reflect those changes.

This README provides a clear, professional, and visually appealing overview of your Product Management System project, making it easy for others to understand, set up, and contribute to your work on GitHub. Let me know if you need further adjustments!
