from cvat.annotations.types import AnnotationData
from cvat.rq.types import LabeledData, DataMetaRead


class AnnotationCalculator:

    @staticmethod
    def calculate(meta: DataMetaRead, labeled: LabeledData) -> AnnotationData:
        if not meta:
            return AnnotationData(0, 0, 0)

        total_frames = meta.size or 0

        if not labeled:
            return AnnotationData(
                total=total_frames,
                annotated=0,
                not_annotated=total_frames,
            )

        annotated_frames: set[int] = set()

        for tag in labeled.tags or []:
            if tag.frame is not None:
                annotated_frames.add(tag.frame)

        for shape in labeled.shapes or []:
            if shape.frame is not None and not shape.outside:
                annotated_frames.add(shape.frame)

        for track in labeled.tracks or []:
            for shape in track.shapes or []:
                if shape.frame is not None and not shape.outside:
                    annotated_frames.add(shape.frame)

        annotated = len(annotated_frames)

        return AnnotationData(
            total=total_frames,
            annotated=annotated,
            not_annotated=max(total_frames - annotated, 0),
        )
