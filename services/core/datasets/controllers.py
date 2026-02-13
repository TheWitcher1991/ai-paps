from packages.framework.controllers import ModelSetBaseSetController


class DatasetSetController(ModelSetBaseSetController):
    prefix = "datasets"


class DatasetAssetSetController(ModelSetBaseSetController):
    prefix = "assets"


class DatasetClassSetController(ModelSetBaseSetController):
    prefix = "classes"


class DatasetAnnotationSetController(ModelSetBaseSetController):
    prefix = "annotations"
