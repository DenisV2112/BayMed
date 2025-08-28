import mongoose from "mongoose";

const calculationSchema = new mongoose.Schema(
  {
    scaleKey: { type: String, required: true }, // ejemplo: "cha2ds2_vasc"
    input: { type: Object, required: true }, // datos ingresados por el usuario
    result: { type: Number, required: true }, // puntaje total
    interpretation: { type: String }, // interpretación según la escala
  },
  { timestamps: true }
);

export default mongoose.model("Calculation", calculationSchema);
