import { useEffect, useRef, useState } from "react";
import "./ImageMagnifier.css";
import PropTypes from "prop-types";
const ImageMagnifier = ({
  src,
  width = "auto",
  height = "100%",
  alt = "Image",
  magnifierHeight = 250,
  magnifierWidth = 250,
  initialZoomLevel = 1.5,
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);
  const [zoomLevel, setZoomLevel] = useState(initialZoomLevel);
  const ref = useRef();
  const mouseEnter = (e) => {
    const el = e.currentTarget;

    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseLeave = (e) => {
    e.preventDefault();
    setShowMagnifier(false);
  };

  const mouseMove = (e) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();

    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setXY([x, y]);
  };

  const handleScroll = (e) => {
    e.preventDefault();
    setZoomLevel((prevZoom) => Math.max(1, prevZoom + e.deltaY * -0.01));
  };

  useEffect(() => {
    const magnifierContainer = ref.current;
    magnifierContainer.addEventListener("wheel", handleScroll);

    return () => {
      magnifierContainer.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="img-magnifier-container" ref={ref}>
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        onMouseEnter={(e) => mouseEnter(e)}
        onMouseLeave={(e) => mouseLeave(e)}
        onMouseMove={(e) => mouseMove(e)}
      />
      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          border: "1px solid lightgrey",
          backgroundColor: "white",
          borderRadius: "50%",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          backgroundSize: `${zoomLevel * imgWidth}px ${
            zoomLevel * imgHeight
          }px`,
          backgroundPositionX: `${1 * (magnifierWidth / 2 - x * zoomLevel)}px`,
          backgroundPositionY: `${1 * (magnifierHeight / 2 - y * zoomLevel)}px`,
        }}
      ></div>
    </div>
  );
};

ImageMagnifier.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string,
  magnifierHeight: PropTypes.number,
  magnifierWidth: PropTypes.number,
  zoomLevel: PropTypes.number,
};

export default ImageMagnifier;
