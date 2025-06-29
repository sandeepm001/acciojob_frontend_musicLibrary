export const mfConfig = {
  name: "music_library1",
  filename:"remoteEntry.js",
  exposes: {
    "./Header":"./src/Header.jsx",
    "./Footer":"./src/Footer.jsx",
    "./MusicLibrary":"./src/MusicLibrary.jsx"
  },
  shared: ["react", "react-dom"],
   dts: false ,
};
