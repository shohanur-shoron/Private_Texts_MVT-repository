from django.db import models

class Message(models.Model):
    messageid = models.CharField(max_length=150, primary_key=True)
    message = models.TextField()
    password = models.CharField(max_length=11)
    maxView = models.PositiveIntegerField()
    views = models.PositiveIntegerField(default=0)
    time = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return self.messageid
    
