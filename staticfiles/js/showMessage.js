const submit = document.getElementById('submit')

submit.addEventListener('click', function() {
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

        const password = document.getElementById('password');
        const timeBar = document.getElementById('timeBar')
        const main = document.getElementById("main")
        const messageDiv = document.getElementById('messageDiv')
        if(passwordF === password.value){
            if(maxViewsF<viewsF){
                alert('message reached its view capacity!!!')
            }
            else{
                main.style.display = 'none';
                messageDiv.style.display = 'flex';

                document.getElementById('totalView').innerText = `Total Views: ${viewsF}`
                document.getElementById('messageText').innerText = messageF
                

                if(timeF != -1){
                    document.getElementById('viewTime').innerText = `Total View Time: ${timeF}s`
                    timeBar.style.animation = `timer ${timeF}s linear`;
                    timeBar.style.width = `0%`
                    setTimeout(() => {
                        window.location.href = window.location.href;
                    }, timeF*1000);
                }
                else{
                    document.getElementById('viewTime').innerText = `Total View Time: Unlimited`
                }
            }
            
        }
        else{
            password.style.borderColor = 'red';
            alert('Wrong Password!')
        }

    })
    .catch(e => {
        console.error('Error fetching message details:', e);
    });

    

});