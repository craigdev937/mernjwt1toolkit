import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    completed: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true,
    },
}, { timestamps: true });

NoteSchema.plugin(AutoIncrement, {
    inc_field: "ticket",
    id: "ticketNums", start_seq: 500
});

export const NoteModel = mongoose.model("Note", NoteSchema);


