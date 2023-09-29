import React from 'react';

const ProfileList = ({ profiles, onSummaryClick }) => {
  return (
    <div className="profile-list">
      {profiles.map((profile) => (
        <div key={profile.id} className="profile-card">
          <img src={profile.photo} alt={profile.name} />
          <h3>{profile.name}</h3>
          <p>{profile.description}</p>
          <button onClick={() => onSummaryClick(profile)}>Summary</button>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;
