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
import { nocturn_joggas, conduct_ldn, raw_denim_tartan_jeans } from '../data/photos';

// Placeholder for images until we have a real manifest/CMS
const getImages = (collectionId, subCollectionId) => {
  const basePath = `${import.meta.env.BASE_URL}images`;

  if (collectionId === 'NocturnLDN' && subCollectionId === 'Joggas') {
    return nocturn_joggas.map(name => ({
      src: `${basePath}/NocturnLDN/Joggas/${name}`,
      alt: name
    }));
  }

  if (collectionId === 'NocturnLDN' && subCollectionId === 'RawDenimTartanJeans') {
    return raw_denim_tartan_jeans.map(name => ({
      src: `${basePath}/NocturnLDN/RawDenimTartanJeans/${name}`,
      alt: name
    }));
  }

  if (collectionId === 'ConductLDN') {
    return conduct_ldn.map(name => ({
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
    style={{ paddingTop: '100px', textAlign: 'center' }}
  >
    <h2>Select a Collection</h2>
    <ul className="nav-links" style={{ justifyContent: 'center', marginTop: '2rem' }}>
      {collections.map((col) => (
        <li key={col.id}>
          <Link to={`/${col.id}`} style={{ textDecoration: 'none', color: '#000', fontSize: '1.5rem', fontWeight: 'bold' }}>
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
      style={{ paddingTop: '100px', textAlign: 'center' }}
    >
      <h2>{collection.title}</h2>
      <ul className="nav-links" style={{ justifyContent: 'center', marginTop: '2rem' }}>
        {collection.subCollections.map((sub) => (
          <li key={sub.id}>
            <Link to={`/${collectionId}/${sub.id}`} style={{ textDecoration: 'none', color: '#000', fontSize: '1.2rem' }}>
              {sub.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/" style={{ display: 'block', marginTop: '2rem', color: '#666', textDecoration: 'none' }}>← Back to Collections</Link>
    </motion.div>
  );
};

const ImageGrid = ({ collectionId, subCollectionId }) => {
  const images = getImages(collectionId, subCollectionId);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Only hijack vertical scroll
      if (e.deltaY === 0) return;

      e.preventDefault();

      // Direct mapping - no physics loop, no state, no smooth behavior conflict.
      // Just raw scroll.
      // 1.5 multiplier to make it slightly faster than 1:1 but still controllable
      el.scrollLeft += e.deltaY * 1.5;
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [images]);

  // Function to assign a predictable stagger class based on index
  const getStaggerClass = (index) => {
    const mod = index % 3;
    if (mod === 0) return 'stagger-center';
    if (mod === 1) return 'stagger-top';
    return 'stagger-bottom';
  };

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="gallery-container"
    >
      {images.length === 0 ? (
        <div style={{ padding: '2rem' }}>
          <p>No images found in this collection yet.</p>
        </div>
      ) : (
        <>
          {images.map((img, index) => (
            <motion.div
              key={index}
              className={`gallery-item ${getStaggerClass(index)}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );
};

const GalleryWrapper = () => {
  const location = useLocation();

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<SubCollectionList collectionId="NocturnLDN" />} />
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
