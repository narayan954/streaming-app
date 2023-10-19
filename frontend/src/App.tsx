function App() {
  return (
    <>
      <div className="bg-red-600 text-center">Hiiiiii</div>
      <video
        id="videoPlayer"
        className="mx-auto my-10 rounded-lg shadow-lg"
        width="50%"
        controls
        muted={false}
        autoPlay
      >
        <source src="http://localhost:8080/video" type="video/mp4" />
      </video>
    </>
  );
}

export default App;
