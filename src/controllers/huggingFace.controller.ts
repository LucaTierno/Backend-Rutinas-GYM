import { HfInference } from "@huggingface/inference";
import { RequestExt } from "../interfaces/requestExt.interface";
import { NextFunction, Response } from "express";

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

const handleMessageApi = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body.userMessage);

  try {
    const { userMessage } = req.body;

    if (!userMessage) {
      return res
        .status(400)
        .json({ error: "El mensaje del usuario es obligatorio" });
    }

    const response = await hf.textGeneration({
      model: "gpt2",
      inputs: userMessage,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.5,
      },
    });

    return res.status(200).json({ response: response.generated_text });
  } catch (error) {
    console.error("Error al conectarse con la API de Hugging Face:", error);
    return res.status(500).json({
      error:
        "Lo siento, no pude procesar tu solicitud. Intenta de nuevo más tarde.",
    });
  }
};

export const messageApiController = {
  handleMessageApi,
};
