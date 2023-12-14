import { Document, model, Schema, Types } from "mongoose";


export interface ISong extends Document {
    title: string;
    album: string;
    artist: string;
    genre: string;
}


const songSchema: Schema = new Schema({
    title: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      default: "single"
    },
    artist: {
      type: String,
      required: true
    },
    genre: {
        type: String,
        require: true
    }
  });


const Song = model<ISong>("Song", songSchema);

export default Song;