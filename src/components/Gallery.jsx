import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Gallery Configuration
const collections = [
  {
    id: 'NocturnLDN',
    title: 'NocturnLDN',
    subCollections: [
      { id: 'Joggas', title: 'Joggas' },
      { id: 'RawDenimTartanJeans', title: 'Raw Denim Tartan Jeans' },
    ],
  },
  {
    id: 'ConductLDN',
    title: 'ConductLDN',
    // No sub-collections yet, treating as a direct folder
    images: [],
  },
  {
    id: 'VantaLDN',
    title: 'VantaLDN',
    images: [],
  },
];

// Placeholder for images until we have a real manifest/CMS
const getImages = (collectionId, subCollectionId) => {
  const basePath = `${import.meta.env.BASE_URL}images`;

  if (collectionId === 'NocturnLDN' && subCollectionId === 'Joggas') {
    return [
      { src: `${basePath}/NocturnLDN/Joggas/_DSC0155.JPG`, alt: 'Joggas 1' },
    ];
  }

  if (collectionId === 'ConductLDN') {
    const filenames = [
      '_DSC0067.JPG', '_DSC0068.JPG', '_DSC0071.JPG', '_DSC0080.JPG', '_DSC0090.JPG',
      '_DSC0091.JPG', '_DSC0093.JPG', '_DSC0103.JPG', '_DSC0106.JPG', '_DSC0123.JPG',
      '_DSC0138.JPG', '_DSC0148.JPG', '_DSC0153.JPG', '_DSC0155.JPG', '_DSC0156.JPG',
      '_DSC0158.JPG', '_DSC0161.JPG', '_DSC0168.JPG', '_DSC0169.JPG', '_DSC0183.JPG',
      '_DSC0194.JPG', '_DSC0256.JPG', '_DSC0295.JPG', '_DSC0296.JPG', '_DSC0301.JPG',
      '_DSC0332.JPG', '_DSC0352.JPG', '_DSC0372.JPG', '_DSC0420.JPG', '_DSC0461.JPG',
      '_DSC0466.JPG', '_DSC0481.JPG', '_DSC0837.JPG', '_DSC0840.JPG', '_DSC0844.JPG',
      '_DSC0864.JPG', '_DSC0867.JPG', '_DSC0882.JPG', '_DSC0883.JPG', '_DSC0898.JPG',
      '_DSC0962.JPG', '_DSC0965.JPG', '_DSC0971.JPG', '_DSC0991.JPG', '_DSC0996.JPG'
    ];
    return filenames.map(name => ({
      src: `${basePath}/ConductLDN/${name}`,
      alt: name
    }));
  }
  // Add more logic here as photos are added
  return [];
};

const CollectionList = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="collection-list"
  >
    <h2>Collections</h2>
    <ul>
      {collections.map((col) => (
        <li key={col.id}>
          <Link to={`/gallery/${col.id}`} className="collection-link">
            {col.title}
          </Link>
        </li>
      ))}
    </ul>
  </motion.div>
);

const SubCollectionList = ({ collectionId }) => {
  const collection = collections.find((c) => c.id === collectionId);

  if (!collection) return <div>Collection not found</div>;

  // If no subcollections, show images directly (handling for ConductLDN/VantaLDN if they become direct galleries)
  if (!collection.subCollections) {
    return <ImageGrid collectionId={collectionId} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="sub-collection-list"
    >
      <h2>{collection.title}</h2>
      <ul>
        {collection.subCollections.map((sub) => (
          <li key={sub.id}>
            <Link to={`/gallery/${collectionId}/${sub.id}`} className="collection-link">
              {sub.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/gallery" className="back-link">← Back to Collections</Link>
    </motion.div>
  );
};

const ImageGrid = ({ collectionId, subCollectionId }) => {
  const images = getImages(collectionId, subCollectionId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>{subCollectionId ? subCollectionId : collectionId}</h2>

      {images.length === 0 ? (
        <p>No images found in this collection yet.</p>
      ) : (
        <div className="gallery-grid">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="gallery-item"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </motion.div>
          ))}
        </div>
      )}
      <Link to={subCollectionId ? `/gallery/${collectionId}` : "/gallery"} className="back-link">
        ← Back
      </Link>
    </motion.div>
  );
};

const GalleryWrapper = () => {
  const location = useLocation();

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<CollectionList />} />
          <Route path=":collectionId" element={<CollectionRouteWrapper />} />
          <Route path=":collectionId/:subCollectionId" element={<SubCollectionRouteWrapper />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

// Wrapper components to extract params for passing to components
import { useParams } from 'react-router-dom';

const CollectionRouteWrapper = () => {
  const { collectionId } = useParams();
  return <SubCollectionList collectionId={collectionId} />;
};

const SubCollectionRouteWrapper = () => {
  const { collectionId, subCollectionId } = useParams();
  return <ImageGrid collectionId={collectionId} subCollectionId={subCollectionId} />;
};

export default GalleryWrapper;
