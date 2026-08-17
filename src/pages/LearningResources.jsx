import { useEffect, useState } from "react";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function LearningResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMonth, setSelectedMonth] =
    useState("all");

  const [selectedResource, setSelectedResource] =
    useState(null);

  /* =========================
     FETCH RESOURCES
  ========================= */

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API}/learning-resources`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load learning resources"
          );
        }

        const data = await response.json();

        setResources(data);
      } catch (error) {
        console.error(
          "Learning resources error:",
          error
        );

        setError(
          "Unable to load learning resources. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  /* =========================
     FILTER
  ========================= */

  const filteredResources =
    selectedMonth === "all"
      ? resources
      : resources.filter(
          (resource) =>
            String(resource.month) ===
            String(selectedMonth)
        );

  /* =========================
     YOUTUBE URL
  ========================= */

  const getEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const parsed = new URL(url);

      if (
        parsed.hostname.includes("youtube.com")
      ) {
        const videoId =
          parsed.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }

        if (
          parsed.pathname.startsWith("/embed/")
        ) {
          return url;
        }
      }

      if (parsed.hostname === "youtu.be") {
        const videoId =
          parsed.pathname.substring(1);

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      return url;
    } catch {
      return url;
    }
  };

  return (
    <div className="learning-resources-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-title">
        <div>
          <h1>🎥 Learning Resources</h1>

          <p>
            Watch class recordings and access
            additional learning materials.
          </p>
        </div>
      </div>

      {/* =========================
          FILTER
      ========================= */}

      <div className="learning-toolbar">

        <div>
          <label htmlFor="month-filter">
            Filter by Month
          </label>

          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(e.target.value)
            }
          >
            <option value="all">
              All Months
            </option>

            {Array.from(
              { length: 11 },
              (_, index) => index + 1
            ).map((month) => (
              <option
                key={month}
                value={month}
              >
                Month {month}
              </option>
            ))}
          </select>
        </div>

        <div className="resource-count">
          {filteredResources.length}{" "}
          {filteredResources.length === 1
            ? "resource"
            : "resources"}
        </div>
      </div>

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="card resource-status">
          <div className="resource-loading-icon">
            🎥
          </div>

          <h3>Loading resources...</h3>

          <p>
            Please wait while we load your
            learning materials.
          </p>
        </div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {!loading && error && (
        <div className="card resource-status error">
          <div className="resource-loading-icon">
            ⚠️
          </div>

          <h3>Unable to load resources</h3>

          <p>{error}</p>
        </div>
      )}

      {/* =========================
          EMPTY
      ========================= */}

      {!loading &&
        !error &&
        filteredResources.length === 0 && (
          <div className="card resource-status">
            <div className="resource-loading-icon">
              📚
            </div>

            <h3>No resources available</h3>

            <p>
              Class recordings and additional
              learning materials will appear here
              when they are added by the
              administration.
            </p>
          </div>
        )}

      {/* =========================
          RESOURCE CARDS
      ========================= */}

      {!loading &&
        !error &&
        filteredResources.length > 0 && (
          <div className="student-resource-grid">

            {filteredResources.map(
              (resource) => (
                <article
                  className="student-resource-card"
                  key={resource._id}
                >

                  <div className="student-resource-top">

                    <span className="student-video-badge">
                      🎥 Class Recording
                    </span>

                    <span className="student-month-badge">
                      Month {resource.month}
                    </span>

                  </div>

                  <div className="student-resource-icon">
                    ▶
                  </div>

                  <h2>{resource.title}</h2>

                  <div className="student-resource-course">
                    {resource.course}
                  </div>

                  <div className="student-resource-class">
                    {resource.className}
                  </div>

                  {resource.description && (
                    <p className="student-resource-description">
                      {resource.description}
                    </p>
                  )}

                  {resource.duration && (
                    <div className="student-resource-duration">
                      ⏱ {resource.duration}
                    </div>
                  )}

                  <div className="student-resource-actions">

                    <button
                      className="primary-btn"
                      onClick={() =>
                        setSelectedResource(
                          resource
                        )
                      }
                    >
                      ▶ Watch Video
                    </button>

                    {resource.resourceUrl && (
                      <a
                        href={
                          resource.resourceUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="outline-btn"
                      >
                        📄 Additional Resource
                      </a>
                    )}

                  </div>

                </article>
              )
            )}

          </div>
        )}

      {/* =========================
          VIDEO MODAL
      ========================= */}

      {selectedResource && (
        <div
          className="video-modal-overlay"
          onClick={() =>
            setSelectedResource(null)
          }
        >

          <div
            className="video-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="video-modal-header">

              <div>
                <span>
                  Month {selectedResource.month}
                  {" • "}
                  {selectedResource.className}
                </span>

                <h2>
                  {selectedResource.title}
                </h2>
              </div>

              <button
                className="video-modal-close"
                onClick={() =>
                  setSelectedResource(null)
                }
                aria-label="Close video"
              >
                ×
              </button>

            </div>

            <div className="video-container">

              <iframe
                src={getEmbedUrl(
                  selectedResource.videoUrl
                )}
                title={
                  selectedResource.title
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            </div>

            {selectedResource.description && (
              <div className="video-modal-description">

                <h3>About this class</h3>

                <p>
                  {
                    selectedResource.description
                  }
                </p>

              </div>
            )}

            {selectedResource.resourceUrl && (
              <div className="video-modal-resource">

                <a
                  href={
                    selectedResource.resourceUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-btn"
                >
                  📄 Open Additional Resource
                </a>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default LearningResources;
