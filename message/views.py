from django.shortcuts import render
from .models import Message
from django.contrib import messages
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.shortcuts import get_object_or_404


def index(request):
    base_url = request.build_absolute_uri('/').rstrip('/')
    context = {
        'link':base_url,
    }
    return render(request, 'message.html',context)

def generateLink(request):
    base_url = request.build_absolute_uri('/').rstrip('/')
    
    if request.method == 'POST':
        message_text = request.POST.get('message')
        password = request.POST.get('password')
        max_views = int(request.POST.get('maxView', 1))
        url_suffix = request.POST.get('url')
        is_time_limited = request.POST.get('isTime') == 'on'
        time_limit = int(request.POST.get('time', 0)) if is_time_limited else -1
        
        message_ids = [msg.messageid for msg in Message.objects.all()]
        
        if url_suffix in message_ids:
            obj = Message.objects.get(messageid=url_suffix)
            if obj.views >= obj.maxView:
                obj.delete()
            else:
                messages.info(request, 'This URL already exists, please try another one!')
                return redirect('index')
        
        messageObj = Message.objects.create(
            messageid=url_suffix,
            message=message_text,
            password=password,
            maxView=max_views,
            time=time_limit
        )
        
        messageObj.save()
        
        generatedURL = base_url+'/msg/'+url_suffix
        
        return render(request, 'showLink.html', {'url':generatedURL})
    

def verifyPassword(request, id):
    
    return render(request, 'password.html')


@require_GET
def get_message_details(request, message_id):
    message = get_object_or_404(Message, messageid=message_id)
    
    # Increment view count
    message.views += 1
    message.save()

    # Prepare the response
    response_data = {
        'message': message.message,
        'password': message.password,  # Warning: Sending plaintext password!
        'views': message.views,
        'maxView': message.maxView,
        'time': message.time,
    }

    return JsonResponse(response_data)
