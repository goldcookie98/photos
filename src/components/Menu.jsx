import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Menu = () => {
    return (
        <motion.div
            className="menu-container"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
        >
            <motion.h1 variants={itemVariants} className="menu-title">
                Portfolio
            </motion.h1>
            <ul className="menu-list">
                <motion.li variants={itemVariants} whileHover={{ scale: 1.1 }}>
                    <Link to="/gallery" className="menu-link">Gallery</Link>
                </motion.li>
                <motion.li variants={itemVariants} whileHover={{ scale: 1.1 }}>
                    <Link to="/about" className="menu-link">About</Link>
                </motion.li>
                <motion.li variants={itemVariants} whileHover={{ scale: 1.1 }}>
                    <Link to="/contact" className="menu-link">Contact</Link>
                </motion.li>
            </ul>
        </motion.div>
    );
};

export default Menu;
