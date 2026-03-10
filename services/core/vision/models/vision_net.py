import torch
import torch.nn as nn
import torch.nn.functional as F


class VisionNetBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()

        self.block = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),

            nn.Conv2d(out_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
        )

    def forward(self, x):
        return self.block(x)
    

class VisionNetAdapter(nn.Module):
    def __init__(self, in_channels=3, num_classes=1):
        super(VisionNetAdapter, self).__init__()
        
        self.in_channels = in_channels
        self.num_classes = num_classes

        self.conv1 = nn.Conv2d(in_channels, 16, 3, padding=1)
        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)

        self.conv3 = nn.Conv2d(32, 16, 3, padding=1)
        self.conv4 = nn.Conv2d(16, num_classes, 1)

        self.pool = nn.MaxPool2d(2)

    def forward(self, x):

        x = F.relu(self.conv1(x))
        x = self.pool(x)

        x = F.relu(self.conv2(x))
        x = self.pool(x)

        x = F.interpolate(x, scale_factor=2)
        x = F.relu(self.conv3(x))

        x = F.interpolate(x, scale_factor=2)

        x = self.conv4(x)

        return x