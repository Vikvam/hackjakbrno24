# solver_api.py
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import json
import time
import uuid

app = FastAPI()

class SolverInput(BaseModel):
    input_data: str

jobs = {}

def solver_task(job_id, input_data):
    # Simulate a long-running computation
    time.sleep(10)  # Simulate delay
    result = {"message": f"Hello from Python! Received: {input_data}"}
    jobs[job_id] = result

@app.post("/solve")
def solve(input: SolverInput, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "Job is running"}
    background_tasks.add_task(solver_task, job_id, input.input_data)
    return {"job_id": job_id}

@app.get("/result/{job_id}")
def get_result(job_id: str):
    job = jobs.get(job_id)
    if job is None:
        return {"status": "Job not found"}
    if "status" in job:
        return job
    else:
        return job

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
