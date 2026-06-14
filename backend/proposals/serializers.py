from rest_framework import serializers
from .models import Proposal

class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = ['id', 'title', 'description', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']