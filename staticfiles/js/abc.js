document.addEventListener('DOMContentLoaded', function() {
    const messageId = window.location.href.split('/')[4];  // Assumes URL structure is /msg/{messageId}

    fetch(`${messageId}/details/`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let messageF = data.message;
        let viewsF = data.views;
        let maxViewsF = data.maxView; // Assuming the property name is "maxView"
        let timeF = data.time;
        let passwordF = data.password;

    })
    .catch(e => {
        console.error('Error fetching message details:', e);
    });

    

});
