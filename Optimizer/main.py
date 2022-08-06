import json, os

from fastapi import FastAPI, UploadFile, File
from optimizer import Optimizer
from fastapi.responses import JSONResponse, Response
import librosa

app = FastAPI()

@app.post("/")
def solution(times, balls:int, loop=False):
    times = list(map(float, str(times).replace('[','').replace(']', '').replace(',', ' ').split()))

    op = Optimizer(times, balls, loop)
    op.solve()
    sol = op.get_solution()

    result = {
        'times': times,
        'balls': balls,
        'loop': loop,
        'distribution_balls': sol
    }

    return Response(
        status_code=200,
        content=result,
        headers={
            'access-control-allow-origin': '*',
        }
    )

# ! Si se sube un audio como obtengo el audio?? :/
@app.post("/sound")
def solution_with_sound(balls:int, loop:bool, file: UploadFile = File(...)):
    print(balls, loop, file.filename)

    # write file to disk
    with open(file.filename, 'wb') as f:
        f.write(file.file.read())
    
    # load audio
    y, sr = librosa.load(file.filename)
    onset_frames = librosa.onset.onset_detect(y, sr=sr, wait=1, pre_avg=1, post_avg=1, pre_max=1, post_max=1)
    onset_times = librosa.frames_to_time(onset_frames)

    op = Optimizer(onset_times, balls, loop)
    prob_sol = op.solve()
    sol = op.get_solution()

    result = {
        'prob_sol': prob_sol,
        'balls': balls,
        'loop': loop,
        'distribution_balls': sol
    }

    # delete file from disk
    os.remove(file.filename)

    return JSONResponse(
        status_code=200,
        content=result,
        headers={
            'access-control-allow-origin': '*',
        }
    )

