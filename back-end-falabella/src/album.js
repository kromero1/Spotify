import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
  album_type: String,
  artists: Object,
  external_urls: {
    spotify: String,
  },
  href: String,
  id: String,
  images: [Object, [Object], [Object]],
  name: String,
  release_date: String,
  release_date_precision: String,
  total_tracks: Number,
  type: String,
  uri: String,
});

export default mongoose.model("album", albumSchema);