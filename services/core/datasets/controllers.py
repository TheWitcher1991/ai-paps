from packages.framework.controllers import ModelSetBaseSetController


class DatasetSetController(ModelSetBaseSetController):
    prefix = "datasets"


class DatasetAssetSetController(ModelSetBaseSetController):
    prefix = "assets"
