import torch
import numpy as np


def iou_score(pred, target, num_classes, smooth=1e-6):
    iou_per_class = []
    pred = torch.softmax(pred, dim=1)
    pred = pred.argmax(dim=1)
    
    for cls in range(num_classes):
        pred_cls = (pred == cls).float()
        target_cls = (target == cls).float()
        
        intersection = (pred_cls * target_cls).sum()
        union = pred_cls.sum() + target_cls.sum() - intersection
        
        iou = (intersection + smooth) / (union + smooth)
        iou_per_class.append(iou.item())
    
    return np.mean(iou_per_class)


def calculate_confusion_matrix(pred, target, num_classes):
    pred = torch.softmax(pred, dim=1)
    pred = pred.argmax(dim=1)
    
    conf_matrix = torch.zeros(num_classes, num_classes, device=pred.device, dtype=torch.long)
    
    flat_pred = pred.flatten()
    flat_target = target.flatten()
    
    for t, p in zip(flat_target, flat_pred):
        if t < num_classes and p < num_classes:
            conf_matrix[t, p] += 1
    
    return conf_matrix


def precision_score(pred, target, num_classes, average=True):
    conf_matrix = calculate_confusion_matrix(pred, target, num_classes)
    
    precision_per_class = []
    for cls in range(num_classes):
        tp = conf_matrix[cls, cls].item()
        fp = conf_matrix[:, cls].sum().item() - tp
        
        precision = tp / (tp + fp + 1e-6)
        precision_per_class.append(precision)
    
    if average:
        return np.mean(precision_per_class)
    return precision_per_class


def recall_score(pred, target, num_classes, average=True):
    conf_matrix = calculate_confusion_matrix(pred, target, num_classes)
    
    recall_per_class = []
    for cls in range(num_classes):
        tp = conf_matrix[cls, cls].item()
        fn = conf_matrix[cls, :].sum().item() - tp
        
        recall = tp / (tp + fn + 1e-6)
        recall_per_class.append(recall)
    
    if average:
        return np.mean(recall_per_class)
    return recall_per_class


def f1_score(pred, target, num_classes, average=True):
    precision = precision_score(pred, target, num_classes, average=False)
    recall = recall_score(pred, target, num_classes, average=False)
    
    f1_per_class = []
    for p, r in zip(precision, recall):
        f1 = 2 * p * r / (p + r + 1e-6)
        f1_per_class.append(f1)
    
    if average:
        return np.mean(f1_per_class)
    return f1_per_class


def accuracy_score(pred, target):
    pred = torch.softmax(pred, dim=1)
    pred = pred.argmax(dim=1)
    
    correct = (pred == target).sum().item()
    total = target.numel()
    
    return correct / total


class SegmentationMetrics:
    def __init__(self, num_classes):
        self.num_classes = num_classes
        self.reset()
    
    def reset(self):
        self.total_iou = 0
        self.total_precision = 0
        self.total_recall = 0
        self.total_f1 = 0
        self.total_accuracy = 0
        self.count = 0
    
    def update(self, pred, target):
        self.total_iou += iou_score(pred, target, self.num_classes)
        self.total_precision += precision_score(pred, target, self.num_classes)
        self.total_recall += recall_score(pred, target, self.num_classes)
        self.total_f1 += f1_score(pred, target, self.num_classes)
        self.total_accuracy += accuracy_score(pred, target)
        self.count += 1
    
    def compute(self):
        if self.count == 0:
            return {
                "iou": 0.0,
                "precision": 0.0,
                "recall": 0.0,
                "f1": 0.0,
                "accuracy": 0.0,
            }
        
        return {
            "iou": self.total_iou / self.count,
            "precision": self.total_precision / self.count,
            "recall": self.total_recall / self.count,
            "f1": self.total_f1 / self.count,
            "accuracy": self.total_accuracy / self.count,
        }
