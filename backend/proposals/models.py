from django.db import models

class Proposal(models.Model):
    class Status(models.TextChoices):
        NEW = 'new', 'Ny'
        REVIEWED = 'reviewed', 'Gjennomgått'
        APPROVED = 'approved', 'Godkjent'
        REJECTED = 'rejected', 'Avslått'

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title