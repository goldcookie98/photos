import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '2rem', textAlign: 'center', color: 'white' }}
        >
            <h1>About</h1>
            <p>This is the placeholder for the About page.</p>
        </motion.div>
    );
};

export default About;
