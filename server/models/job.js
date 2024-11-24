import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: String, required: true },
  status: { type: String, required: true },
  note: { type: String, required: false },
});


export const Job = mongoose.model('Job', jobSchema);


