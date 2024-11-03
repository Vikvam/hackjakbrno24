# solver_api.py
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import time
import uuid

from backend.models import DoctorModel, ShiftModel

app = FastAPI()


class SolverInput(BaseModel):
    employees: list[DoctorModel]
    shifts: list[ShiftModel]


jobs = {
    0:
}


def solver_task(job_id, input_data: SolverInput):
    # Simulate a long-running computation
    time.sleep(10)  # Simulate delay
    result = {"message": f"Hello from Python! Received: {input_data.model_dump_json()}"}
    jobs[job_id] = result


@app.post("/solve")
def solve(input: SolverInput, background_tasks: BackgroundTasks):
    print("Received: ", input)
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "Job is running"}
    background_tasks.add_task(solver_task, job_id, input)
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
