-- ============================================================
-- Inventory Management System - Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- ------------------------------------------------------------
-- Users Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'staff') NOT NULL DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Products Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INT NOT NULL DEFAULT 0,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  sku VARCHAR(100) UNIQUE,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Seed: Admin User (password: admin123)
-- bcrypt hash of 'admin123' with salt rounds 10
-- ------------------------------------------------------------
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@inventory.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- ------------------------------------------------------------
-- Seed: Sample Products
-- ------------------------------------------------------------
INSERT INTO products (name, category, description, quantity, price, sku, status) VALUES
('Wireless Keyboard', 'Electronics', 'Compact wireless keyboard with long battery life', 150, 799.00, 'ELEC-KB-001', 'active'),
('USB-C Hub 7-in-1', 'Electronics', 'Multiport USB-C hub with HDMI, USB 3.0, SD card reader', 85, 1290.00, 'ELEC-HUB-002', 'active'),
('Ergonomic Office Chair', 'Furniture', 'High-back mesh office chair with lumbar support', 30, 4500.00, 'FURN-CHAIR-001', 'active'),
('Standing Desk', 'Furniture', 'Electric height-adjustable standing desk 120cm', 15, 8900.00, 'FURN-DESK-001', 'active'),
('Mechanical Pencil Set', 'Stationery', 'Set of 3 mechanical pencils 0.5mm with extra leads', 300, 125.00, 'STAT-PEN-001', 'active'),
('A4 Copy Paper (500 sheets)', 'Stationery', '80gsm white A4 copy paper for laser/inkjet printers', 500, 180.00, 'STAT-PAP-001', 'active'),
('Hand Sanitizer 500ml', 'Health & Safety', 'Alcohol-based hand sanitizer 70% ethanol', 200, 95.00, 'HLTH-SAN-001', 'active'),
('Noise Cancelling Headphones', 'Electronics', 'Over-ear headphones with ANC and 30hr battery', 60, 3200.00, 'ELEC-HEAD-003', 'active'),
('Whiteboard 120x90cm', 'Office Supplies', 'Magnetic dry-erase whiteboard with aluminium frame', 20, 1850.00, 'OFFC-WB-001', 'active'),
('Coffee Mug 350ml', 'Kitchen', 'Ceramic coffee mug with logo print', 120, 199.00, 'KTCH-MUG-001', 'active'),
('Web Camera 1080p', 'Electronics', 'Full HD webcam with built-in microphone and privacy cover', 75, 990.00, 'ELEC-CAM-004', 'active'),
('Extension Cord 5m', 'Office Supplies', '4-socket extension cord with surge protection 5 meters', 90, 350.00, 'OFFC-EXT-001', 'active');
