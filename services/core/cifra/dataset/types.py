import datetime
from dataclasses import dataclass
from typing import List, Literal, Optional


@dataclass
class Dataset:
    id: int
    dataset_id: str
    name: str
    description: str
    size: int
    capture_type: str
    color_index: str
    updated_at: datetime
    marked_images: int
    total_images: int


@dataclass
class DatasetCollect:
    id: int
    image_id: str
    image_name: str
    dataset_id: str
    minio_path: str
    image_size: List[int]
    image_class: Optional[str]
    updated_at: datetime
    image_quality: Optional[float] = None
    frame_id: Optional[int] = None
    acquisition_time_utc: Optional[datetime] = None
    camera_id: Optional[int] = None
    platform_id: Optional[int] = None
    greenhouse_id: Optional[int] = None
    row_id: Optional[int] = None
    plant_id: Optional[int] = None
    temp_int: Optional[float] = None
    temp_ext: Optional[float] = None
    rh_percent: Optional[float] = None
    co2_ppm: Optional[int] = None
    soil_moisture_percent: Optional[float] = None
    iso: Optional[int] = None
    exposure_time_ms: Optional[float] = None
    aperture_f: Optional[float] = None
    blur_metric: Optional[float] = None
    overexp_percent: Optional[float] = None
    underexp_percent: Optional[float] = None
    comments: Optional[str] = None


@dataclass
class Bounds:
    minX: float
    minY: float
    maxX: float
    maxY: float


@dataclass
class Point:
    x: float
    y: float


@dataclass
class Creator:
    isGuest: bool
    id: str


@dataclass
class Geometry:
    bounds: Bounds
    points: List[List[float]]


@dataclass
class Selector:
    type: str  # "POLYGON", "RECTANGLE", etc.
    geometry: Geometry
    creator: Creator
    created: datetime


@dataclass
class Body:
    value: str
    annotation: str


@dataclass
class Target:
    annotation: str
    selector: Selector


@dataclass
class Figure:
    id: str
    bodies: List[Body]
    target: Target


@dataclass
class Markup:
    image_quality: Optional[float]
    image_class: str
    image_size: List[int]
    figures: List[Figure]
    relative: bool


@dataclass
class NextImage:
    id: int
    image_name: str
    image_id: str


@dataclass
class ImageMeta:
    markup: Markup
    next_image: NextImage
    total_images: Optional[int] = None


MarkupClass = List[str]


@dataclass
class DatasetsResponse:
    datasets: List[Dataset]


@dataclass
class DatasetCollectResponse:
    images: List[DatasetCollect]


@dataclass
class MarkupClassesResponse:
    markup_classes: MarkupClass


@dataclass
class ImageMetaResponse(ImageMeta):
    pass


@dataclass
class DatasetCollectRequest:
    dataset_id: str
    unmarked_only: bool = False


@dataclass
class MarkupClassesRequest:
    markup_type: Literal["figures", "images"]


@dataclass
class ImageMetaRequest:
    image_id: str
