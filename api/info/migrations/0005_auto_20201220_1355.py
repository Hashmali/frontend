# Generated by Django 3.0.11 on 2020-12-20 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0004_auto_20201220_1352'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='info',
            name='car',
        ),
        migrations.AddField(
            model_name='info',
            name='car',
            field=models.ManyToManyField(blank=True, null=True, to='info.Car'),
        ),
    ]