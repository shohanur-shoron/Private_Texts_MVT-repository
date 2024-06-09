from django.shortcuts import render
from .models import Message
from django.contrib import messages
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.shortcuts import get_object_or_404


def index(request):
    # Get the base URL of the website
    base_url = request.build_absolute_uri('/').rstrip('/')
    
    # Create a dictionary to pass the base URL to the template
    context = {
        'link': base_url,
    }
    
    # Render the 'message.html' template with the given context
    return render(request, 'message.html', context)

def generateLink(request):
    # Get the base URL of the website
    base_url = request.build_absolute_uri('/').rstrip('/')
    
    # Check if the request method is POST
    if request.method == 'POST':
        # Get the message text from the form
        message_text = request.POST.get('message')
        # Get the password from the form
        password = request.POST.get('password')
        # Get the maximum number of views from the form, default to 1
        max_views = int(request.POST.get('maxView', 1))
        # Get the URL suffix from the form
        url_suffix = request.POST.get('url')
        # Check if the message should be time-limited
        is_time_limited = request.POST.get('isTime') == 'on'
        # Get the time limit from the form, default to -1 if not time-limited
        time_limit = int(request.POST.get('time', 0)) if is_time_limited else -1
        
        # Get all existing message IDs
        message_ids = [msg.messageid for msg in Message.objects.all()]
        
        # Check if the URL suffix already exists
        if url_suffix in message_ids:
            obj = Message.objects.get(messageid=url_suffix)
            # If the message has been viewed too many times, delete it
            if obj.views >= obj.maxView:
                obj.delete()
            else:
                # If the URL exists but is still valid, inform the user to try another one
                messages.info(request, 'This URL already exists, please try another one!')
                return redirect('index')
        
        # Create a new message object with the given data
        messageObj = Message.objects.create(
            messageid=url_suffix,
            message=message_text,
            password=password,
            maxView=max_views,
            time=time_limit
        )
        
        # Save the new message object to the database
        messageObj.save()
        
        # Generate the full URL for the message
        generatedURL = base_url + '/msg/' + url_suffix
        
        # Render the 'showLink.html' template with the generated URL
        return render(request, 'showLink.html', {'url': generatedURL})
    
def verifyPassword(request, id):
    # Render the 'password.html' template to ask for password verification
    return render(request, 'password.html')

@require_GET
def get_message_details(request, message_id):
    # Get the message object with the given ID or return a 404 error if not found
    message = get_object_or_404(Message, messageid=message_id)
    
    # Increment the view count of the message
    message.views += 1
    # Save the updated message object to the database
    message.save()

    # Prepare the response data with message details
    response_data = {
        'message': message.message,
        'password': message.password,  # Warning: Sending plaintext password!
        'views': message.views,
        'maxView': message.maxView,
        'time': message.time,
    }

    # Return the response data as a JSON object
    return JsonResponse(response_data)
