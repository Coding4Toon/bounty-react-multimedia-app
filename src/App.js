import React, { useState, useEffect } from 'react';
import { data } from './data';
import { Header } from "./components/Header";
import { AudioPlayer } from './components/AudioPlayer';
import { DocumentViewer } from './components/DocumentViewer';
import { VideoPlayer } from './components/VideoPlayer';
import { ImageViewer } from './components/ImageViewer';
import '@fortawesome/fontawesome-free/css/all.css';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function App() {
  const [myFiles, setMyFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePath, setFilePath] = useState("/file-server/")
  const [showChartModal, setShowChartModal] = useState(false)
  //feature 
  const [showChartModalSpace, setShowChartModalSpace] = useState(false)
  //feature 
  const [filterVideo, setFilterVideo] = useState(false)
  const [filterAudio, setFilterAudio] = useState(false)
  const [filterDocument, setFilterDocument] = useState(false)
  const [filterImage, setFilterImage] = useState(false)
  const [hoveredFile, setHoveredFile] = useState(null)
  const [starred, setStarred] = useState(null)



  useEffect(() => {
    setMyFiles(data)
  }, [])

  var barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Files Breakdown',
      },
    },
  };

  return (
    <>
      {showChartModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <p style={{ fontWeight: "bold" }}>Files Breakdown</p>
              <button style={styles.closeButton} onClick={() => setShowChartModal(false)}>close</button>
            </div>
            <div style={styles.modalBody}>
              <Pie
                data={{
                  labels: ['Video', 'Audio', 'Document', 'Image'],
                  datasets: [
                    {
                      label: 'Files Breakdown',
                      data: [myFiles.filter(file => file.type === 'video').length, myFiles.filter(file => file.type === 'audio').length, myFiles.filter(file => file.type === 'document').length, myFiles.filter(file => file.type === 'image').length],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
              <Bar
                data={{
                  labels: ['Video', 'Audio', 'Document', 'Image'],
                  datasets: [
                    {
                      label: 'Files Breakdown',
                      data: [myFiles.filter(file => file.type === 'video').length, myFiles.filter(file => file.type === 'audio').length, myFiles.filter(file => file.type === 'document').length, myFiles.filter(file => file.type === 'image').length],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={barChartOptions}
              />
            </div>
          </div>
        </div>
      )}

      {showChartModalSpace && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <p style={{ fontWeight: "bold" }}>Space Breakdown</p>
              <button style={styles.closeButton} onClick={() => setShowChartModalSpace(false)}>close</button>
            </div>
            <div style={styles.modalBody}>
              <p>Total space : <span style={{ fontWeight: "bold" }}>1 GB</span></p>
              <p>
                Space consumed:<span style={{ fontWeight: "bold" }}>{" "}
                  {((myFiles
                    .filter((file) => file.type === "video")
                    .reduce((totalSize, video) => totalSize + video.size, 0) +
                    myFiles
                      .filter((file) => file.type === "audio")
                      .reduce((totalSize, audio) => totalSize + audio.size, 0) +
                    myFiles
                      .filter((file) => file.type === "document")
                      .reduce((totalSize, document) => totalSize + document.size, 0) +
                    myFiles
                      .filter((file) => file.type === "image")
                      .reduce((totalSize, image) => totalSize + image.size, 0)) / 1000000).toFixed(2)}{" "}
                  GB</span>
              </p>
              <Pie
                data={{
                  labels: ['Video', 'Audio', 'Document', 'Image', 'Free'],
                  datasets: [
                    {
                      label: 'Space Breakdown (in KB)',
                      data: [
                        myFiles.filter(file => file.type === 'video').reduce((totalSize, video) => totalSize + video.size, 0),
                        myFiles.filter(file => file.type === 'audio').reduce((totalSize, audio) => totalSize + audio.size, 0),
                        myFiles.filter(file => file.type === 'document').reduce((totalSize, document) => totalSize + document.size, 0),
                        myFiles.filter(file => file.type === 'image').reduce((totalSize, image) => totalSize + image.size, 0),
                        1000000 - (myFiles.filter(file => file.type === 'video').reduce((totalSize, video) => totalSize + video.size, 0)
                          + myFiles.filter(file => file.type === 'audio').reduce((totalSize, audio) => totalSize + audio.size, 0)
                          + myFiles.filter(file => file.type === 'document').reduce((totalSize, document) => totalSize + document.size, 0),
                          + myFiles.filter(file => file.type === 'image').reduce((totalSize, image) => totalSize + image.size, 0))
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 163, 164, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 163, 164, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div >
      )
      }

      <div className="App">
        <Header />
        <div style={styles.container}>
          <div style={{ padding: 10, paddingBottom: 0, }}>
            <p style={{ fontWeight: "bold" }}>My Files</p>
            <p>{selectedFile ? selectedFile.path : filePath}</p>
          </div>

          <div style={styles.controlTools}>

            <button style={styles.controlButton}
              onClick={() => {
                if (selectedFile) {
                  const newFiles = myFiles.map(file => {
                    if (file.id === selectedFile.id) {
                      return {
                        ...file,
                        name: prompt("Enter new name")
                      }
                    }
                    return file
                  })
                  setMyFiles(newFiles)
                  setSelectedFile(null)
                }
              }}
            >Rename</button>

            <button style={styles.controlButton}
              onClick={() => {
                setShowChartModal(true)
              }}
            >Files Breakdown</button>

            <button style={styles.controlButton}
              onClick={() => {
                setShowChartModalSpace(true)
              }}
            >Space Breakdown</button>

            <button style={styles.controlButton}
              onClick={() => {
                if (selectedFile) {
                  window.open(selectedFile.path, "_blank")
                }
              }}
            >Download</button>

            <button style={styles.controlButton}
              onClick={() => {
                if (selectedFile) {
                  const newFiles = myFiles.filter(file => file.id !== selectedFile.id);
                  setMyFiles(newFiles);
                  setSelectedFile(null);
                }
              }}
            >Delete</button>

          </div>

          {/* feature 1 : Adding filters */}
          <div style={{ padding: 10, paddingBottom: 0, }}>
            <p>Filters</p>
          </div>

          <div style={styles.controlTools}>

            <button style={{ ...styles.filterButton, backgroundColor: filterVideo ? 'blue' : 'black', }}
              onClick={() => {
                let onlyVideo = [];
                let onlyAudio = [];
                let onlyDocument = [];
                let onlyImage = [];

                if (filterVideo) {
                  onlyVideo = [];
                  setFilterVideo(false)
                } else { onlyVideo = data.filter(file => file.type === "video"); setFilterVideo(true) }

                if (filterAudio) {
                  onlyAudio = data.filter(file => file.type === "audio");
                } else { onlyAudio = [] }

                if (filterDocument) {
                  onlyDocument = data.filter(file => file.type === "document");
                } else { onlyDocument = [] }

                if (filterImage) {
                  onlyImage = data.filter(file => file.type === "image");
                } else { onlyImage = [] }

                if (filterVideo) {
                  onlyVideo = [];
                  setFilterVideo(false)
                } else { onlyVideo = data.filter(file => file.type === "video"); setFilterVideo(true) }

                setSelectedFile(null)
                return setMyFiles([...onlyVideo, ...onlyAudio, ...onlyDocument, ...onlyImage]);


              }}
            >Video</button>

            <button style={{ ...styles.filterButton, backgroundColor: filterAudio ? 'blue' : 'black', }}
              onClick={() => {
                let onlyVideo = [];
                let onlyAudio = [];
                let onlyDocument = [];
                let onlyImage = [];

                if (filterVideo) {
                  onlyVideo = data.filter(file => file.type === "video");
                } else { onlyVideo = []; }

                if (filterAudio) {
                  onlyAudio = [];
                  setFilterAudio(false)
                } else { onlyAudio = data.filter(file => file.type === "audio"); setFilterAudio(true) }

                if (filterDocument) {
                  onlyDocument = data.filter(file => file.type === "document");
                } else { onlyDocument = [] }

                if (filterImage) {
                  onlyImage = data.filter(file => file.type === "image");
                } else { onlyImage = [] }

                setSelectedFile(null)
                return setMyFiles([...onlyVideo, ...onlyAudio, ...onlyDocument, ...onlyImage]);

              }}
            >Audio</button>

            <button style={{ ...styles.filterButton, backgroundColor: filterDocument ? 'blue' : 'black', }}
              onClick={() => {
                let onlyVideo = [];
                let onlyAudio = [];
                let onlyDocument = [];
                let onlyImage = [];

                if (filterVideo) {
                  onlyVideo = data.filter(file => file.type === "video");
                } else { onlyVideo = []; }

                if (filterAudio) {
                  onlyAudio = data.filter(file => file.type === "audio");
                } else { onlyAudio = []; }

                if (filterDocument) {
                  onlyDocument = [];
                  setFilterDocument(false)
                } else { onlyDocument = data.filter(file => file.type === "document"); setFilterDocument(true) }

                if (filterImage) {
                  onlyImage = data.filter(file => file.type === "image");
                } else { onlyImage = [] }

                setSelectedFile(null)
                return setMyFiles([...onlyVideo, ...onlyAudio, ...onlyDocument, ...onlyImage]);
              }}
            >Document</button>

            <button style={{ ...styles.filterButton, backgroundColor: filterImage ? 'blue' : 'black', }}
              onClick={() => {
                let onlyVideo = [];
                let onlyAudio = [];
                let onlyDocument = [];
                let onlyImage = [];

                if (filterVideo) {
                  onlyVideo = data.filter(file => file.type === "video");
                } else { onlyVideo = [] }

                if (filterAudio) {
                  onlyAudio = data.filter(file => file.type === "audio");
                } else { onlyAudio = [] }

                if (filterDocument) {
                  onlyDocument = data.filter(file => file.type === "document");
                } else { onlyDocument = [] }

                if (filterImage) {
                  onlyImage = [];
                  setFilterImage(false)
                } else { onlyImage = data.filter(file => file.type === "image"); setFilterImage(true) }

                setSelectedFile(null)
                return setMyFiles([...onlyVideo, ...onlyAudio, ...onlyDocument, ...onlyImage]);

              }}
            >Image</button>

            <button style={styles.filterButton}
              onClick={() => {
                setMyFiles(data)
                setFilterVideo(false)
                setFilterAudio(false)
                setFilterDocument(false)
                setFilterImage(false)
                setSelectedFile(null)
              }}
            >Reset</button>

          </div>


          {/* Files list */}

          <div style={styles.fileContainer}>
            <div style={{ width: "100%", padding: 10 }}>
              {myFiles.map((file) => {

                if (file.path.slice(0, filePath.length) === filePath) {

                  return (
                    <div style={{ ...styles.file, ...(hoveredFile && hoveredFile.id === file.id ? styles.fileHovered : {}), ...(selectedFile && selectedFile.id === file.id ? styles.fileSelected : {}) }}
                      className="files"
                      key={file.id}
                      onMouseEnter={() => setHoveredFile(file)} onMouseLeave={() => setHoveredFile(null)}
                      onClick={() => {
                        if (selectedFile && selectedFile.id === file.id) {
                          setSelectedFile(null)
                          return
                        }
                        setSelectedFile(file)
                      }}>
                      <p><i className="fas fa-star"></i> {file.name}</p>
                    </div>

                  )
                }

              })}

            </div>

            {selectedFile && (
              <div style={styles.fileViewer}>
                {selectedFile.type === 'video' && (
                  <VideoPlayer path={selectedFile.path} />
                )}
                {selectedFile.type === 'audio' && (
                  <AudioPlayer path={selectedFile.path} />
                )}
                {selectedFile.type === 'document' && (
                  <DocumentViewer path={selectedFile.path} />
                )}
                {selectedFile.type === 'image' && (
                  <ImageViewer path={selectedFile.path} />
                )}
                <p style={{ fontWeight: "bold", marginTop: 10 }}>{selectedFile.name}</p>
                <p>path: <span style={{ fontStyle: "italic" }}>{selectedFile.path}</span></p>
                <p>file type: <span style={{ fontStyle: "italic" }}>{selectedFile.type}</span></p>
                <p>file size: <span style={{ fontStyle: "italic" }}>{selectedFile.size} KB</span></p>
              </div>

            )}
          </div>
        </div>
      </div >
    </>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    color: '#000',
  },
  fileContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',

  },
  file: {
    backgroundColor: '#eee',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    width: '100%',
  },
  fileHovered: {
    backgroundColor: '#99A3A4',
  },
  fileSelected: {
    backgroundColor: '#99A3A4',
  },
  fileViewer: {
    padding: '10px',
    margin: '10px',
    width: '30vw',
    height: '100vh',
    cursor: 'pointer',
    borderLeft: '1px solid #000'
  },
  controlTools: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '10px',
  },
  controlButton: {
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  filterButton: {
    padding: '5px 25px',
    marging: 'auto',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'white',
    background: '#566573',
  },

  // modal
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    height: '50vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '10px',
    cursor: 'pointer',
  },
  modalBody: {
    width: '100%',
    height: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px',
  },
  modalHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  closeButton: {
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#eee',
  }
};
