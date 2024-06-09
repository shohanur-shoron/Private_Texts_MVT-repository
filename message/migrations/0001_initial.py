# Generated by Django 5.0.6 on 2024-06-09 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('messageid', models.CharField(max_length=150, primary_key=True, serialize=False)),
                ('message', models.TextField()),
                ('password', models.CharField(max_length=11)),
                ('maxView', models.PositiveIntegerField()),
                ('views', models.PositiveIntegerField()),
                ('time', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]