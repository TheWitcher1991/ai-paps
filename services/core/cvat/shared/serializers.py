from rest_framework import serializers


class CVATPaginatedListSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    next = serializers.URLField(required=False)
    previous = serializers.URLField(required=False)
    results = serializers.ListField(child=serializers.DictField())

    class Meta:
        fields = ("count", "next", "previous", "results")
