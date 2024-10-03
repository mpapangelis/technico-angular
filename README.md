# Technico - Owner Management System

## Overview
Technico is an owner management system developed using Angular for the frontend. This project allows you to **Create**, **Read**, **Update**, and **Delete** (CRUD) owner information. It is designed to handle owner details such as names, email, username, phone number, address, VAT, and password. The system also incorporates form validation to ensure accurate data entry and provides a user-friendly interface.

## Features

- **Create Owner**: A form with validation to create a new owner with details such as name, email, username, VAT, etc.
- **View Owners**: A dynamic list of owners displayed as individual cards. Each card includes details like name, email, username, phone number, and address.
- **Edit Owner**: Allows updating owner information by filling out a form pre-populated with the owner’s current data.
- **Delete Owner**: Soft delete owners by removing them from the list without permanently deleting them from the database.
- **Routing**: Proper routing is implemented to navigate between different pages, such as the home screen, create owner page, and view all owners.

## Pages

- **Home Page**: Displays the application name and links to "Create Owner" and "View Owners".
- **Create Owner Page**: Form to create a new owner with input validation.
- **View Owners Page**: Displays all owners as cards with options to edit or delete owners.
- **Update Owner Page**: Form to update owner information, pre-filled with the owner's current data.

## Technologies Used

- **Angular**: Frontend framework used for building the single-page application (SPA).
- **Bootstrap**: Used for styling and responsive design.
- **Angular Router**: For navigation between different views (home, create, update).
- **Reactive Forms**: Used for form handling and validation.
- **REST API**: Communicates with the backend server to fetch and update owner data.

## Installation

### Clone the repository:

```bash
git clone https://github.com/mpapangelis/technico-angular.git
cd technico-angular
```

### Run the Angular application:

```bash
ng serve
```

### Open your browser and navigate to:

```bash
http://localhost:4200
```
