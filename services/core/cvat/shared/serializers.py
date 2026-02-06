from rest_framework import serializers


class CVATPaginatedListSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    next = serializers.URLField(required=False, allow_null=True)
    previous = serializers.URLField(required=False, allow_null=True)
    results = serializers.ListField()

    class Meta:
        fields = ("count", "next", "previous", "results")


class CVATSummarySerializer(serializers.Serializer):
    count = serializers.IntegerField(required=False, default=0)
    url = serializers.URLField(required=False, allow_null=True)

    class Meta:
        fields = ("count", "url")
