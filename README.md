# Private_Texts_MVT
# Secret Message Sharing App
![image](https://github.com/ImMirzaShakil/Private_Texts_MVT/assets/158572434/a5a1aa87-d2b1-478f-8aac-9342415bfba2)

A secure, user-friendly Django application for sharing secret messages with password protection, view limits, and optional time limits. Perfect for sharing sensitive information, surprise party plans, or just for fun!
![image](https://github.com/ImMirzaShakil/Private_Texts_MVT/assets/158572434/5879f064-3727-4472-be82-cc7483063c15)

### Installation

1. Clone the repository:
`git clone [https://github.com/yourusername/secret-message-app.git`](https://github.com/ImMirzaShakil/Private_Texts_MVT.git)

2. Create and activate a virtual environment:

### On macOS and Linux
`python3 -m venv venv`<br>
`source venv/bin/activate`

### On Windows
`python -m venv venv`<br>
`venv\Scripts\activate`

3. Install dependencies:
`pip install -r requirements.txt`

4. Apply migrations:
`python manage.py migrate`

5. Run the development server:
`python manage.py runserver`

### Additional Notes
1. Creating a Superuser: To create an admin superuser, run:
   `python manage.py createsuperuser`
   
2. Static Files: To collect static files, run:
   `python manage.py collectstatic`


## 🌟 Features

- **Password Protection**: Every message is locked behind a user-set password.
- **Limited Views**: Set how many times a message can be viewed before it self-destructs.
- **Time Bombs**: Messages can be set to disappear after a certain time, even mid-view!
- **Custom URLs**: Create memorable links for your messages.
- **Real-time Validation**: Password strength checker helps users create strong passwords.
- **Copy to Clipboard**: One-click copying of message links.

## 🚀 Getting Started

### Prerequisites

- Python 3.6+
- pip
- Git

### Running the Development Server

1. Start the Django development server:
`python manage.py runserver`

2. Open your web browser and go to `http://127.0.0.1:8000/` or `http://localhost:8000/`. You should see the message creation page.

## Usage

1. Enter your secret message in the text area.
2. Set a password for the message (must be 6-10 characters long, include at least one number and one special character).
3. Choose the maximum number of times the message can be viewed.
4. Set a custom URL suffix for your message.
5. Optionally, set a time limit for viewing the message.
6. Click "Send" to generate a shareable link.
7. Share the generated link with the intended recipient.
8. The recipient will need to enter the correct password to view the message.

## How It Works

### Backend (Django)

The core functionality is handled by Django views in `views.py`:

1. `index(request)`:
   - This view renders the `message.html` template, which is the main page where users create secret messages.
   - It passes the base URL of the website to the template, which is used to construct the shareable message links.

2. `generateLink(request)`:
   - This view is called when a user submits the message form.
   - It extracts form data: message text, password, max views, URL suffix, and optional time limit.
   - It checks if the URL suffix is unique. If not, it either deletes an expired message with that suffix or prompts the user to choose another.
   - It creates a new `Message` object with the provided data and saves it to the database.
   - Finally, it renders the `showLink.html` template with the generated message URL.

3. `get_message_details(request, message_id)`:
   - This is an AJAX endpoint that returns message details as JSON.
   - It's called when a recipient enters a password to view a message.
   - It increments the view count of the message and returns the message text, password, current views, max views, and time limit.
   - Warning: This function returns the plaintext password, which is a security concern. In production, consider using more secure methods for password verification.

### Frontend (JavaScript)

The frontend logic is split across three JavaScript files:

1. `message.js`:
   - `copyTextToClipboard(text)`: Copies the generated message URL to the clipboard.
   - Event listener for the time limit checkbox: Shows/hides the time input field.
   - `checkPassword(password)`: Validates the password in real-time as the user types. It checks for length (6-10 characters), at least one number, and one special character.
   - `showPassword()`: Toggles password visibility in the input field.

2. `showMessage.js`:
   - This script runs on the message viewing page (`password.html`).
   - When the user clicks the submit button, it extracts the message ID from the URL.
   - It then makes an AJAX GET request to `get_message_details` to fetch message data.
   - If the entered password matches the message password:
     - It checks if the message has exceeded its view limit.
     - If not, it displays the message, updates the view count, and starts the timer if there's a time limit.
     - When the time limit expires, it reloads the page, effectively hiding the message.
   - If the password is incorrect, it alerts the user.

3. `password.js`:
   - Contains a single function `showPassword()`, which toggles the visibility of the password input on the message viewing page.

## Security Considerations

- Passwords are stored and transmitted in plaintext, which is a significant security risk. In a production environment, you should hash passwords before storage and use secure methods for password verification.
- The app doesn't use HTTPS, which means data (including passwords) is sent unencrypted. Always use HTTPS in production.
- There's no rate limiting or CSRF protection on the password submission, which could allow brute-force attacks.

## 🗺️ Roadmap

- [x] Basic message creation and viewing
- [x] Password protection and view limits
- [x] Time-limited messages
- [ ] Password hashing and secure authentication
- [ ] User accounts to manage messages
- [ ] End-to-end encryption
- [ ] API for third-party integrations

## 🔧 Technologies Used

- **Backend**: Django 3.2
- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **AJAX**: jQuery 3.7.1
- **Icons**: Icons8

## 📁 Project Structure

- `secret_messages/`: Django project settings
- `messages/`: Django app
- `models.py`: Defines `Message` model
- `views.py`: Core logic for creating and viewing messages
- `urls.py`: URL patterns for the app
- `templates/`: HTML templates (`message.html`, `password.html`, etc.)
- `static/`: CSS, JavaScript, and images
- `js/`: `message.js`, `showMessage.js`, `password.js`
- `style/`: CSS files
- `images/`: Icons and images

## 🌍 Deployment

1. Set `DEBUG = False` in `settings.py`
2. Configure your production database (e.g., PostgreSQL)
3. Use a production-grade server (e.g., Gunicorn) behind a reverse proxy (e.g., Nginx)
4. Deploy to:
 - Heroku: Follow their [Django deployment guide](https://devcenter.heroku.com/articles/django-app-configuration)
 - AWS: Use Elastic Beanstalk or EC2 with RDS
 - DigitalOcean: Use their Django one-click app or custom droplet

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
