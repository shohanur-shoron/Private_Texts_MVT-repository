// Get the submit button element with the id 'submit'
const submit = document.getElementById('submit');

// Add a click event listener to the submit button
submit.addEventListener('click', function() {
    // Extract the message ID from the URL (assuming it's the 5th part of the URL)
    const messageId = window.location.href.split('/')[4];

    // Make a GET request to fetch the message details
    fetch(`${messageId}/details/`)
    .then(response => {
        // Check if the response is not okay (status code is not in the range 200-299)
        if (!response.ok) {
            // Throw an error if the response status is not okay
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Convert the response to JSON
        return response.json();
    })
    .then(data => {
        // Extract data from the response
        let messageF = data.message;
        let viewsF = data.views;
        let maxViewsF = data.maxView; // Assuming the property name is "maxView"
        let timeF = data.time;
        let passwordF = data.password;

        // Get the password input field element
        const password = document.getElementById('password');
        // Get the time bar element
        const timeBar = document.getElementById('timeBar');
        // Get the main content element
        const main = document.getElementById("main");
        // Get the message display div element
        const messageDiv = document.getElementById('messageDiv');

        // Check if the entered password matches the fetched password
        if (passwordF === password.value) {
            // Check if the message has reached its view capacity
            if (maxViewsF < viewsF) {
                // Alert the user if the message has reached its view capacity
                alert('Message reached its view capacity!!!');
            } else {
                // Hide the main content and show the message display div
                main.style.display = 'none';
                messageDiv.style.display = 'flex';

                // Update the total views text
                document.getElementById('totalView').innerText = `Total Views: ${viewsF}`;
                // Update the message text
                document.getElementById('messageText').innerText = messageF;

                // Check if the message has a time limit
                if (timeF != -1) {
                    // Update the total view time text with the time limit
                    document.getElementById('viewTime').innerText = `Total View Time: ${timeF}s`;
                    // Set the time bar animation to countdown
                    timeBar.style.animation = `timer ${timeF}s linear`;
                    timeBar.style.width = `0%`;
                    // Reload the page after the time limit has passed
                    setTimeout(() => {
                        window.location.href = window.location.href;
                    }, timeF * 1000);
                } else {
                    // Update the total view time text to indicate unlimited time
                    document.getElementById('viewTime').innerText = `Total View Time: Unlimited`;
                }
            }
        } else {
            // Highlight the password input field in red and alert the user of a wrong password
            password.style.borderColor = 'red';
            alert('Wrong Password!');
        }
    })
    .catch(e => {
        // Log any errors that occur during the fetch
        console.error('Error fetching message details:', e);
    });
});
