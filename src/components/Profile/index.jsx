import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiSave, FiX } from 'react-icons/fi';
import styles from './index.module.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fashion Street, Style City, SC 12345'
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    console.log('Profile updated:', editData);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            <FiUser />
          </div>
          <h1 className={styles.profileName}>
            {profileData.firstName} {profileData.lastName}
          </h1>
          <p className={styles.profileEmail}>{profileData.email}</p>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Personal Information</h2>
              {!isEditing ? (
                <button onClick={handleEdit} className={styles.editButton}>
                  <FiEdit />
                  Edit Profile
                </button>
              ) : (
                <div className={styles.editActions}>
                  <button onClick={handleSave} className={styles.saveButton}>
                    <FiSave />
                    Save
                  </button>
                  <button onClick={handleCancel} className={styles.cancelButton}>
                    <FiX />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                    className={styles.editInput}
                  />
                ) : (
                  <p className={styles.infoValue}>{profileData.firstName}</p>
                )}
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                    className={styles.editInput}
                  />
                ) : (
                  <p className={styles.infoValue}>{profileData.lastName}</p>
                )}
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <FiMail />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className={styles.editInput}
                  />
                ) : (
                  <p className={styles.infoValue}>{profileData.email}</p>
                )}
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <FiPhone />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    className={styles.editInput}
                  />
                ) : (
                  <p className={styles.infoValue}>{profileData.phone}</p>
                )}
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <FiMapPin />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleChange}
                    className={styles.editTextarea}
                    rows="3"
                  />
                ) : (
                  <p className={styles.infoValue}>{profileData.address}</p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Order History</h2>
            <div className={styles.orderHistory}>
              <div className={styles.orderItem}>
                <div className={styles.orderInfo}>
                  <h3 className={styles.orderNumber}>Order #12345</h3>
                  <p className={styles.orderDate}>March 15, 2024</p>
                </div>
                <div className={styles.orderStatus}>
                  <span className={styles.statusDelivered}>Delivered</span>
                  <p className={styles.orderTotal}>$149.99</p>
                </div>
              </div>

              <div className={styles.orderItem}>
                <div className={styles.orderInfo}>
                  <h3 className={styles.orderNumber}>Order #12344</h3>
                  <p className={styles.orderDate}>March 10, 2024</p>
                </div>
                <div className={styles.orderStatus}>
                  <span className={styles.statusShipped}>Shipped</span>
                  <p className={styles.orderTotal}>$89.99</p>
                </div>
              </div>

              <div className={styles.orderItem}>
                <div className={styles.orderInfo}>
                  <h3 className={styles.orderNumber}>Order #12343</h3>
                  <p className={styles.orderDate}>March 5, 2024</p>
                </div>
                <div className={styles.orderStatus}>
                  <span className={styles.statusProcessing}>Processing</span>
                  <p className={styles.orderTotal}>$199.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;