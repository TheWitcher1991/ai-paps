import os

import torch


class CUDA:

    def get_device():
        if torch.cuda.is_available():
            return "cuda"
        return "cpu"

    def configure_cuda():
        if not torch.cuda.is_available():
            return {
                "device": "cpu",
                "amp": False,
                "pin_memory": False,
                "num_workers": 0,
            }

        torch.backends.cudnn.benchmark = True
        torch.backends.cuda.matmul.allow_tf32 = True
        torch.backends.cudnn.allow_tf32 = True

        return {
            "device": torch.device("cuda"),
            "amp": True,
            "pin_memory": True,
            "num_workers": min(8, os.cpu_count()),
        }


cuda = CUDA()
