import json
from fastapi import FastAPI
from optimizer import Optimizer

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
# @app.post("/sound")
# def solution_with_sound():
#     pass