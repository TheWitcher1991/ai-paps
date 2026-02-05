def cvat_paginated_list_to_dict(paginated_list):
    return {
        "count": paginated_list.count,
        "next": paginated_list.next,
        "previous": paginated_list.previous,
        "results": [obj.to_dict() if hasattr(obj, "to_dict") else dict(obj) for obj in paginated_list.results],
    }
