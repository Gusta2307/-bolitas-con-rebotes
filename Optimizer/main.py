import json
from fastapi import FastAPI, UploadFile, File
from optimizer import Optimizer
# import librosa

app = FastAPI()

@app.post("/")
def solution(times, balls:int, loop=False):
    times = list(map(float, str(times).replace('[','').replace(']', '').replace(',', ' ').split()))

    op = Optimizer(times, balls, loop)
    op.solve()
    sol = op.get_solution()

    return json.dumps(
        {
            'times': times,
            'balls': balls,
            'loop': loop,
            'distribution_balls': sol
        }
    )

# ! Si se sube un audio como obtengo el audio?? :/
@app.post("/sound")
def solution_with_sound(balls:int, loop:bool, file: UploadFile = File(...)):
    print(balls, loop, file)
    print(file.filename)
    print(file.file)

    return "PEPPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"

    # x, sr = librosa.load(file.filename)
    # l
    # onset_frames = librosa.onset.onset_detect(x, sr=sr, wait=1, pre_avg=1, post_avg=1, pre_max=1, post_max=1)
    # onset_times = librosa.frames_to_time(onset_frames)

    # print(onset_times)
    
